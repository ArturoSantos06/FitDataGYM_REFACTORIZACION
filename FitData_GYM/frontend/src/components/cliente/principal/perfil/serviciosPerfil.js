import {
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  getMemberByUserId,
} from '../../../../firebase';

export const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

export const resolveUserFromAuth = async (firebaseUser) => {
  if (!firebaseUser) return { success: false, error: 'No hay sesión activa' };

  const candidates = [
    () => getUserByAuthUid(firebaseUser.uid),
    () => getUser(firebaseUser.uid),
    () => getUserByEmail(normalizeEmail(firebaseUser.email)),
  ];

  for (const load of candidates) {
    const result = await load();
    if (result?.success && result.data) return { success: true, data: result.data };
  }

  return { success: false, error: 'No se pudieron cargar los datos del usuario' };
};

export const resolveMemberByCandidates = async (candidateIds = []) => {
  for (const id of candidateIds.filter(Boolean)) {
    const result = await getMemberByUserId(id);
    if (result?.success && result.data) return result;
  }
  return { success: false, data: null };
};

export const getDisplayName = (userData = {}, firebaseUser = {}) =>
  [userData.firstName, userData.lastName].filter(Boolean).join(' ') ||
  userData.username ||
  firebaseUser.displayName ||
  normalizeEmail(firebaseUser.email) ||
  'Usuario';

export const createProfileViewModel = (userData, firebaseUser, member) => ({
  id: userData.id || firebaseUser.uid,
  nombre: getDisplayName(userData, firebaseUser),
  email: normalizeEmail(userData.email || firebaseUser.email),
  telefono: member?.telefono || userData.phone || userData.telefono || '',
  username: userData.username || normalizeEmail(firebaseUser.email).split('@')[0] || 'usuario',
  gymPoints: Number(userData.gymPoints || 0),
});
