import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';
import {
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  getUsers,
  updateSelfProfile,
  updateUser,
} from '../../../firebase';
import { auth } from '../../../firebase/config';
import {
  calcularCodigoNutriologo,
  crearActualizacionPerfil,
  normalizarPerfilNutriologo,
} from '../utils/perfilNutriologo';

export async function cargarPerfilNutriologo() {
  const sesion = getCurrentUser();
  if (!sesion) throw new Error('No hay sesión activa');

  const [porUid, porId, porCorreo, resultadoUsuarios] = await Promise.all([
    getUserByAuthUid(sesion.uid),
    getUser(sesion.uid),
    sesion.email
      ? getUserByEmail(sesion.email, sesion.uid)
      : Promise.resolve({ success: false }),
    getUsers(),
  ]);
  const resultadoPerfil = [porUid, porId, porCorreo]
    .find((resultado) => resultado?.success && resultado?.data);
  if (!resultadoPerfil) {
    throw new Error('No se pudo cargar el perfil del nutriólogo');
  }

  const perfil = normalizarPerfilNutriologo(resultadoPerfil.data, sesion);
  const usuarios = resultadoUsuarios?.success ? resultadoUsuarios.data || [] : [];
  return {
    perfil,
    codigo: calcularCodigoNutriologo(usuarios, perfil),
  };
}

export async function actualizarPerfilNutriologo(perfil) {
  const sesion = getCurrentUser();
  const idUsuario = String(perfil.id || sesion?.uid || '').trim();
  if (!idUsuario) throw new Error('No se pudo identificar el usuario');

  const actualizacion = crearActualizacionPerfil(perfil);
  const resultado = await updateUser(idUsuario, actualizacion.datosFirebase);
  if (!resultado.success) {
    const respaldo = await updateSelfProfile({
      userId: idUsuario,
      ...actualizacion.datosFirebase,
    });
    if (!respaldo.success) {
      throw new Error(
        respaldo.error || resultado.error || 'No se pudo actualizar el perfil',
      );
    }
  }

  localStorage.setItem(
    'nutritionist_username',
    actualizacion.perfil.nombreUsuario,
  );
  return actualizacion.perfil;
}

export async function cambiarContrasenaNutriologo(actual, nueva) {
  const usuario = auth.currentUser;
  if (!usuario?.email) throw new Error('No se pudo identificar la sesión actual');

  try {
    const credencial = EmailAuthProvider.credential(usuario.email, actual);
    await reauthenticateWithCredential(usuario, credencial);
    await updatePassword(usuario, nueva);
  } catch (error) {
    const mensajes = {
      'auth/invalid-credential': 'La contraseña actual es incorrecta',
      'auth/wrong-password': 'La contraseña actual es incorrecta',
      'auth/weak-password': 'La nueva contraseña no es suficientemente segura',
      'auth/too-many-requests': 'Demasiados intentos. Inténtalo más tarde',
    };
    throw new Error(
      mensajes[error.code] || 'No se pudo actualizar la contraseña',
    );
  }
}
