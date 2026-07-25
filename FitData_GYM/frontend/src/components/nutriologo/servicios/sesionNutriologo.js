import {
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  loginUser,
  logoutUser,
} from '../../../firebase';
import {
  esRolNutriologo,
  normalizarCorreo,
  obtenerMensajeAcceso,
} from '../utils/sesionNutriologo';

const CLAVES_SESION = [
  'nutritionist_token',
  'nutritionist_username',
  'firebaseUser',
];

const limpiarAlmacenamientoSesion = () => {
  CLAVES_SESION.forEach((clave) => localStorage.removeItem(clave));
};

const invalidarSesion = async () => {
  try {
    await logoutUser();
  } catch {
    // La limpieza local debe completarse aunque Firebase no responda.
  } finally {
    limpiarAlmacenamientoSesion();
  }
};

export async function iniciarSesionNutriologo(correo, contrasena) {
  const correoNormalizado = normalizarCorreo(correo);
  if (!correoNormalizado || !contrasena) {
    throw new Error('Completa el correo y la contraseña');
  }

  try {
    const resultado = await loginUser(correoNormalizado, contrasena);
    if (!resultado.success || !resultado.user) {
      const error = new Error(resultado.error || 'Credenciales incorrectas');
      error.code = resultado.code;
      throw error;
    }

    const usuario = resultado.user;
    const [porUid, porId, porCorreo] = await Promise.all([
      getUserByAuthUid(usuario.uid),
      getUser(usuario.uid),
      getUserByEmail(usuario.email || correoNormalizado, usuario.uid),
    ]);
    const rol = [porUid, porId, porCorreo]
      .filter((consulta) => consulta?.success && consulta?.data)
      .map(({ data }) => data.role || data.user_type)
      .find(Boolean);

    if (!esRolNutriologo(rol)) {
      await invalidarSesion();
      throw new Error('Acceso denegado: solo nutriólogos pueden acceder aquí');
    }

    let token;
    try {
      token = await usuario.getIdToken(true);
    } catch {
      await invalidarSesion();
      throw new Error('No se pudo validar la sesión. Inténtalo nuevamente');
    }

    localStorage.setItem('nutritionist_token', token);
    localStorage.setItem(
      'nutritionist_username',
      usuario.email || correoNormalizado,
    );
    localStorage.setItem(
      'firebaseUser',
      JSON.stringify({ uid: usuario.uid, email: usuario.email }),
    );
    return usuario;
  } catch (error) {
    throw new Error(obtenerMensajeAcceso(error));
  }
}

export async function cerrarSesionNutriologo() {
  await invalidarSesion();
}
