import { useState, useEffect } from 'react';
import {
  getCurrentUser,
  getUsers,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  updateSelfProfile,
  updateUser,
} from '../../../firebase';

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const getDateValue = (value) => {
  if (!value) return 0;
  if (typeof value?.toDate === 'function') return value.toDate().getTime();
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const splitName = (user = {}) => {
  const firstName = String(user?.firstName || '').trim();
  const lastName = String(user?.lastName || '').trim();
  if (firstName || lastName) return { firstName, lastName };
  const fullName = String(user?.displayName || user?.nombre || '').trim();
  if (!fullName) return { firstName: '', lastName: '' };
  const parts = fullName.split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: '' };
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
};

const resolveNutritionistFromAuth = async (firebaseUser) => {
  if (!firebaseUser) return { success: false, error: 'No hay sesión activa' };
  const byAuthUid = await getUserByAuthUid(firebaseUser.uid);
  const byDocId = await getUser(firebaseUser.uid);
  const email = normalizeEmail(firebaseUser.email);
  let byEmail = null;
  if (email) byEmail = await getUserByEmail(email, firebaseUser.uid);

  const candidates = [
    byAuthUid?.success ? byAuthUid.data : null,
    byDocId?.success ? byDocId.data : null,
    byEmail?.success ? byEmail.data : null,
  ].filter(Boolean);

  if (candidates.length > 0) return { success: true, data: { ...candidates[0] } };
  return { success: false, error: 'No se pudo cargar el perfil del nutriólogo' };
};
// =================================================================

export default function usePerfilNutriologo() {
  const [vistaActual, setVistaActual] = useState('menu');
  const [usuario, setUsuario] = useState(null);
  const [codigoNutriologo, setCodigoNutriologo] = useState('---');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setCargando(true);
        setError('');
        const currentUser = getCurrentUser();
        if (!currentUser) throw new Error('No hay sesión activa');

        const userResult = await resolveNutritionistFromAuth(currentUser);
        if (!userResult.success || !userResult.data) {
          throw new Error(userResult.error || 'No se pudieron cargar tus datos');
        }

        const userData = userResult.data;
        const nameParts = splitName(userData);
        const usersResult = await getUsers();
        
        const nutritionistUsers = usersResult.success ? (usersResult.data || []).filter((item) => {
          const role = String(item.role || item.user_type || '').toLowerCase();
          return ['nutritionist', 'nutriologo', 'nutriologa', 'nutriologo/a', 'nutricionista', 'nutri'].includes(role);
        }) : [];

        const normalizedCurrentKey = normalizeEmail(userData.email) || String(userData.authUid || userData.id || currentUser.uid || '').trim().toLowerCase();
        const uniqueNutritionists = [];
        const seenKeys = new Set();

        nutritionistUsers
          .slice()
          .sort((a, b) => {
            const aDate = getDateValue(a.createdAt || a.updatedAt);
            const bDate = getDateValue(b.createdAt || b.updatedAt);
            if (aDate !== bDate) return aDate - bDate;
            const aLabel = String(a.displayName || a.username || a.email || '').toLowerCase();
            const bLabel = String(b.displayName || b.username || b.email || '').toLowerCase();
            return aLabel.localeCompare(bLabel);
          })
          .forEach((item) => {
            const key = normalizeEmail(item.email) || String(item.authUid || item.id || '').trim().toLowerCase();
            if (!key || seenKeys.has(key)) return;
            seenKeys.add(key);
            uniqueNutritionists.push(item);
          });

        const nutritionistIndex = uniqueNutritionists.findIndex((item) => {
          const itemKey = normalizeEmail(item.email) || String(item.authUid || item.id || '').trim().toLowerCase();
          return itemKey === normalizedCurrentKey;
        });

        setUsuario({
          ...userData,
          id: userData.id || currentUser.uid,
          firstName: userData.firstName || nameParts.firstName,
          lastName: userData.lastName || nameParts.lastName,
          username: userData.username || '',
          email: userData.email || currentUser.email || '',
          telefono: userData.telefono || userData.phone || '',
        });

        setCodigoNutriologo(nutritionistIndex >= 0 ? String(nutritionistIndex + 1).padStart(3, '0') : '---');
      } catch (err) {
        setError(err.message || 'No se pudo cargar el perfil');
      } finally {
        setCargando(false);
      }
    };

    fetchUserData();
  }, []);

  const manejarActualizacionUsuario = async (datosActualizados) => {
    const currentUser = getCurrentUser();
    const userDocId = String(datosActualizados.id || usuario?.id || currentUser?.uid || '').trim();
    if (!userDocId) throw new Error('No se pudo identificar el usuario a actualizar');

    const normalizedPhone = String(datosActualizados.telefono || '').replace(/\D/g, '').slice(0, 10);
    const normalizedEmail = String(datosActualizados.email || '').trim().toLowerCase();
    const normalizedUsername = String(datosActualizados.username || '').trim();
    const normalizedFirstName = String(datosActualizados.firstName || '').trim();
    const normalizedLastName = String(datosActualizados.lastName || '').trim();
    const normalizedDisplayName = [normalizedFirstName, normalizedLastName].filter(Boolean).join(' ').trim() || normalizedUsername;

    if (!normalizedUsername) throw new Error('El nombre de usuario no puede estar vacío');

    const payload = {
      email: normalizedEmail,
      username: normalizedUsername,
      displayName: normalizedDisplayName,
      nombre: normalizedDisplayName,
      firstName: normalizedFirstName,
      lastName: normalizedLastName,
      phone: normalizedPhone,
      telefono: normalizedPhone,
    };

    const result = await updateUser(userDocId, payload);
    if (!result.success) {
      const fallback = await updateSelfProfile({ userId: userDocId, ...payload });
      if (!fallback.success) {
        throw new Error(fallback.error || result.error || 'No se pudo actualizar el perfil');
      }
    }

    localStorage.setItem('nutritionist_username', normalizedUsername || normalizedDisplayName);
    setUsuario((prev) => ({ ...prev, ...payload }));
    setMensajeExito('¡Datos actualizados correctamente!');
    setMostrarModalExito(true);
    setVistaActual('menu');
  };

  return {
    vistaActual,
    setVistaActual,
    usuario,
    codigoNutriologo,
    cargando,
    error,
    mostrarModalExito,
    setMostrarModalExito,
    mensajeExito,
    manejarActualizacionUsuario
  };
}