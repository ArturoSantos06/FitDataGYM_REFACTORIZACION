export const SOLO_LETRAS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+$/;
export const LETRAS_CON_ESPACIOS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
export const EMAIL_VALIDO_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function mapearErrorFirebase(mensaje) {
  const normalizado = String(mensaje || '').toLowerCase();

  if (
    normalizado.includes('email-already-in-use') ||
    normalizado.includes('auth/email-already-in-use') ||
    normalizado.includes('email address is already in use') ||
    normalizado.includes('already in use by another account')
  ) {
    return 'Este correo ya está registrado';
  }
  if (normalizado.includes('weak-password')) {
    return 'La contraseña debe tener al menos 6 caracteres';
  }
  if (normalizado.includes('invalid-email')) {
    return 'El correo electrónico no es válido';
  }
  return mensaje || 'Error al crear usuario';
}
