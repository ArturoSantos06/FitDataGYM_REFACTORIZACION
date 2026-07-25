const ROLES_PERMITIDOS = new Set([
  'nutritionist',
  'nutriologo',
  'nutriologa',
  'nutriologo/a',
  'nutricionista',
  'nutri',
]);

export const normalizarCorreo = (correo) =>
  String(correo || '').trim().toLowerCase();

export const esRolNutriologo = (rol) =>
  ROLES_PERMITIDOS.has(
    String(rol || '')
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, ''),
  );

export const obtenerMensajeAcceso = (error) => {
  const codigo = String(error?.code || '');
  const mensaje = String(error?.message || '');
  if (
    codigo.includes('invalid-email')
    || mensaje.includes('auth/invalid-email')
  ) {
    return 'Correo electrónico inválido';
  }
  if (
    codigo.includes('invalid-credential')
    || codigo.includes('wrong-password')
    || codigo.includes('user-not-found')
    || mensaje.includes('auth/invalid-credential')
  ) {
    return 'Correo o contraseña incorrectos';
  }
  if (mensaje.includes('Acceso denegado')) return mensaje;
  return mensaje && !mensaje.includes('auth/')
    ? mensaje
    : 'No se pudo iniciar sesión';
};
