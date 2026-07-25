export const FORMULARIO_INICIAL = {
  passwordActual: '',
  passwordNueva: '',
  confirmacion: '',
};

export function validarContrasenas({
  passwordActual,
  passwordNueva,
  confirmacion,
}) {
  if (
    !passwordActual ||
    !passwordNueva ||
    !confirmacion
  ) {
    return 'Completa todos los campos.';
  }

  if (passwordNueva.length < 6) {
    return 'La nueva contraseña debe tener al menos 6 caracteres.';
  }

  if (passwordActual === passwordNueva) {
    return 'La nueva contraseña debe ser diferente de la actual.';
  }

  if (passwordNueva !== confirmacion) {
    return 'La confirmación no coincide con la nueva contraseña.';
  }

  return '';
}

export function obtenerMensajeError(error) {
  const mensajesFirebase = {
    'auth/invalid-credential':
      'La contraseña actual es incorrecta.',

    'auth/wrong-password':
      'La contraseña actual es incorrecta.',

    'auth/weak-password':
      'La nueva contraseña es demasiado débil.',

    'auth/requires-recent-login':
      'Por seguridad, vuelve a iniciar sesión e inténtalo nuevamente.',

    'auth/too-many-requests':
      'Se realizaron demasiados intentos. Espera unos minutos.',

    'auth/network-request-failed':
      'No fue posible conectarse. Revisa tu conexión a internet.',

    'auth/user-token-expired':
      'Tu sesión expiró. Inicia sesión nuevamente.',
  };

  return (
    mensajesFirebase[error?.code] ||
    error?.message ||
    'No se pudo cambiar la contraseña.'
  );
}