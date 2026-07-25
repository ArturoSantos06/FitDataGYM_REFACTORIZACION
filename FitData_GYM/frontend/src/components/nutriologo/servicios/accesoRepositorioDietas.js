import {
  createUser,
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  onAuthChanged,
} from '../../../firebase';
import {
  esErrorPermisos,
  normalizarRol,
  tieneRolPrivilegiado,
} from '../utils/repositorioDietas';

export const esperar = (milisegundos) =>
  new Promise((resolver) => setTimeout(resolver, milisegundos));

export async function prepararTokenFirebase(usuario) {
  if (!usuario?.uid) return null;
  try {
    await usuario.getIdToken();
  } catch {
    await usuario.getIdToken(true);
  }
  return usuario;
}

export function esperarUsuarioFirebase() {
  const usuarioActual = getCurrentUser();
  if (usuarioActual?.uid && usuarioActual?.email) {
    return prepararTokenFirebase(usuarioActual);
  }

  return new Promise((resolver) => {
    let finalizado = false;
    let temporizador;
    let cancelarObservador = () => {};

    const finalizar = (usuario) => {
      if (finalizado) return;
      finalizado = true;
      clearTimeout(temporizador);
      cancelarObservador();
      resolver(usuario || null);
    };

    const observador = onAuthChanged((usuario) => {
      if (!usuario?.uid || !usuario?.email) return;
      prepararTokenFirebase(usuario)
        .then(finalizar)
        .catch(() => finalizar(usuario));
    });
    cancelarObservador = observador;
    if (finalizado) cancelarObservador();

    temporizador = setTimeout(() => finalizar(getCurrentUser()), 4000);
  });
}

const resolverUsuarioOrigen = async (usuarioActual) => {
  const correo = String(usuarioActual.email || '').trim();
  const correoNormalizado = correo.toLowerCase();
  const [porUid, porCorreo] = await Promise.all([
    getUserByAuthUid(usuarioActual.uid),
    getUserByEmail(correo),
  ]);

  if (porUid.success && tieneRolPrivilegiado(porUid.data)) return porUid.data;
  if (porCorreo.success && tieneRolPrivilegiado(porCorreo.data)) return porCorreo.data;

  if (correoNormalizado !== correo) {
    const porCorreoNormalizado = await getUserByEmail(correoNormalizado);
    if (
      porCorreoNormalizado.success
      && tieneRolPrivilegiado(porCorreoNormalizado.data)
    ) {
      return porCorreoNormalizado.data;
    }
  }
  return null;
};

const crearEspejoStaff = (usuarioActual, usuarioOrigen, rol) => {
  const correo = String(usuarioActual.email || '').trim();
  const nombre = usuarioOrigen.displayName
    || usuarioOrigen.username
    || usuarioActual.displayName
    || correo.split('@')[0];

  return createUser(usuarioActual.uid, {
    email: correo,
    displayName: nombre,
    username: usuarioOrigen.username || nombre,
    role: rol,
    authUid: usuarioActual.uid,
  });
};

export async function asegurarAccesoRepositorioDietas() {
  const usuarioActual = await esperarUsuarioFirebase();
  if (!usuarioActual?.uid || !usuarioActual?.email) {
    throw new Error(
      'Tu sesión de Firebase no está lista. Cierra sesión y vuelve a entrar.',
    );
  }

  const usuarioDirecto = await getUser(usuarioActual.uid);
  if (usuarioDirecto.success && tieneRolPrivilegiado(usuarioDirecto.data)) {
    return {
      rol: normalizarRol(usuarioDirecto.data.role),
      usuario: usuarioActual,
    };
  }

  const usuarioOrigen = await resolverUsuarioOrigen(usuarioActual);
  if (!usuarioOrigen) {
    throw new Error(
      'Tu cuenta no tiene rol de personal autorizado para gestionar dietas.',
    );
  }

  const rol = normalizarRol(usuarioOrigen.role) || 'nutriologo';
  let resultado = await crearEspejoStaff(usuarioActual, usuarioOrigen, rol);

  if (!resultado.success && esErrorPermisos(resultado.error)) {
    await prepararTokenFirebase(usuarioActual);
    await esperar(350);
    resultado = await crearEspejoStaff(usuarioActual, usuarioOrigen, rol);
  }
  if (!resultado.success) {
    throw new Error(
      resultado.error || 'No se pudo habilitar el acceso para esta sesión.',
    );
  }

  await prepararTokenFirebase(usuarioActual);
  return { rol, usuario: usuarioActual };
}
