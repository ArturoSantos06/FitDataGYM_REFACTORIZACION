import { useState } from 'react';

export default function useCambioContrasena(alCompletar) {
  const [contrasenaActual, setContrasenaActual] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setExito('');

    if (!contrasenaActual || !nuevaContrasena) {
      setError('Completa los campos requeridos');
      return;
    }
    if (nuevaContrasena.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (nuevaContrasena !== confirmar) {
      setError('La confirmación no coincide');
      return;
    }

    try {
      setCargando(true);
      const { updatePassword, reauthenticateWithCredential, EmailAuthProvider } = await import('firebase/auth');
      const { auth } = await import('../../../firebase/config');
      const firebaseUser = auth.currentUser;

      if (!firebaseUser?.email) {
        throw new Error('No se pudo identificar la sesión actual');
      }

      const credential = EmailAuthProvider.credential(firebaseUser.email, contrasenaActual);
      await reauthenticateWithCredential(firebaseUser, credential);
      await updatePassword(firebaseUser, nuevaContrasena);

      setExito('Contraseña actualizada correctamente');
      setContrasenaActual('');
      setNuevaContrasena('');
      setConfirmar('');
      if (alCompletar) alCompletar();
    } catch (err) {
      setError(err.message || 'Error al cambiar contraseña');
    } finally {
      setCargando(false);
    }
  };

  return {
    contrasenaActual, setContrasenaActual,
    nuevaContrasena, setNuevaContrasena,
    confirmar, setConfirmar,
    cargando, error, exito,
    manejarEnvio
  };
}