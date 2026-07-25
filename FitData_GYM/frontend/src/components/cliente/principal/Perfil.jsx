import { useEffect, useState } from 'react';
import ModalExito from '../../modales/ModalExito';
import { getCurrentUser, updateClientEmail, updateMemberByUserId, updateSelfProfile, updateUser } from '../../../firebase';
import EncabezadoPerfil from './perfil/EncabezadoPerfil';
import DatosPersonales from './perfil/DatosPersonales';
import SeccionSalud from './perfil/SeccionSalud';
import CambiarContraseña from './perfil/CambiarContraseña';
import { createProfileViewModel, normalizeEmail, resolveMemberByCandidates, resolveUserFromAuth } from './perfil/serviciosPerfil';

const INITIAL_VIEW = 'menu';

export default function Perfil() {
  const [currentView, setCurrentView] = useState(INITIAL_VIEW);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    let active = true;
    const loadProfile = async () => {
      try {
        const authUser = getCurrentUser();
        if (!authUser) throw new Error('No hay sesión activa');
        const userResult = await resolveUserFromAuth(authUser);
        if (!userResult.success) throw new Error(userResult.error);
        const memberResult = await resolveMemberByCandidates([authUser.uid, userResult.data.id]);
        const member = memberResult.success ? memberResult.data : null;
        if (active) setUser(createProfileViewModel(userResult.data, authUser, member));
      } catch (loadError) {
        if (active) setError(loadError.message || 'No se pudieron cargar los datos del usuario');
      } finally {
        if (active) setLoading(false);
      }
    };
    loadProfile();
    return () => { active = false; };
  }, []);

  const handleUpdateUser = async (updatedData) => {
    const authUser = getCurrentUser();
    const userDocId = String(updatedData.id || user?.id || authUser?.uid || '').trim();
    const email = normalizeEmail(updatedData.email);
    const username = String(updatedData.username || '').trim();
    const phone = String(updatedData.telefono || '').replace(/\D/g, '').slice(0, 10);
    if (!userDocId) throw new Error('No se pudo identificar el usuario a actualizar');
    if (!username) throw new Error('El nombre de usuario no puede estar vacío');
    if (!/^\d{10}$/.test(phone)) throw new Error('El teléfono debe contener exactamente 10 dígitos');

    if (email !== normalizeEmail(authUser?.email)) {
      const emailResult = await updateClientEmail(email, userDocId);
      if (!emailResult.success) throw new Error(emailResult.error || 'No se pudo actualizar el correo');
    }

    const payload = { email, username, phone, telefono: phone };
    const result = await updateUser(userDocId, payload);
    if (!result.success) {
      const fallback = await updateSelfProfile({ userId: userDocId, ...payload });
      if (!fallback.success) throw new Error(fallback.error || result.error || 'No se pudo actualizar el perfil');
    }

    const targets = [...new Set([userDocId, authUser?.uid].filter(Boolean))];
    const syncResults = await Promise.allSettled(targets.map((targetId) => updateMemberByUserId(targetId, { email, telefono: phone })));
    if (!syncResults.some(({ status, value }) => status === 'fulfilled' && value?.success)) console.warn('No se pudo sincronizar el miembro.');

    setUser((current) => ({ ...current, ...updatedData, email, username, telefono: phone }));
    setSuccessMessage('¡Datos actualizados correctamente!');
    setCurrentView(INITIAL_VIEW);
  };

  if (loading) return <StatusMessage text="Cargando perfil..." />;
  if (error) return <div className="w-full flex justify-center items-center min-h-[400px]"><div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center max-w-md"><p className="text-red-400 mb-4">{error}</p><a href="/cliente/login" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">Iniciar sesión como cliente</a></div></div>;
  if (!user) return null;

  return <div className="w-full flex justify-center"><ModalExito isOpen={Boolean(successMessage)} onClose={() => setSuccessMessage('')} title="Éxito" message={successMessage} />{currentView === 'menu' && <EncabezadoPerfil user={user} onNavigate={setCurrentView} />}{currentView === 'edit-personal' && <DatosPersonales user={user} onSave={handleUpdateUser} onBack={() => setCurrentView(INITIAL_VIEW)} />}{currentView === 'health-form' && <SeccionSalud onBack={() => setCurrentView(INITIAL_VIEW)} />}{currentView === 'change-password' && <CambiarContraseña onBack={() => setCurrentView(INITIAL_VIEW)} />}</div>;
}

function StatusMessage({ text }) { return <div className="w-full flex justify-center items-center min-h-[400px]" role="status" aria-live="polite"><div className="text-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" /><p className="text-slate-400">{text}</p></div></div>; }
