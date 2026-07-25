import { useState } from 'react';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from 'firebase/auth';

import { auth } from '../../../../firebase/config';

import {
  FORMULARIO_INICIAL,
  obtenerMensajeError,
  validarContrasenas,
} from './cambioContrasenaUtils';

function useCambioContrasena() {
  const [formulario, setFormulario] = useState({
    ...FORMULARIO_INICIAL,
  });

  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const actualizarCampo = (campo, valor) => {
    setFormulario((formularioActual) => ({
      ...formularioActual,
      [campo]: valor,
    }));
  };

  const limpiarFormulario = () => {
    setFormulario({
      ...FORMULARIO_INICIAL,
    });
  };

  const cambiarContrasena = async (evento) => {
    evento.preventDefault();

    setError('');
    setExito('');

    const mensajeValidacion =
      validarContrasenas(formulario);

    if (mensajeValidacion) {
      setError(mensajeValidacion);
      return;
    }

    try {
      setCargando(true);

      const usuario = auth.currentUser;

      if (!usuario?.email) {
        throw new Error(
          'No se pudo identificar la sesión actual.',
        );
      }

      const credencial =
        EmailAuthProvider.credential(
          usuario.email,
          formulario.passwordActual,
        );

      await reauthenticateWithCredential(
        usuario,
        credencial,
      );

      await updatePassword(
        usuario,
        formulario.passwordNueva,
      );

      limpiarFormulario();

      setExito(
        'Contraseña actualizada correctamente.',
      );
    } catch (errorCambio) {
      console.error(
        'Error al cambiar la contraseña:',
        errorCambio,
      );

      setError(
        obtenerMensajeError(errorCambio),
      );
    } finally {
      setCargando(false);
    }
  };

  return {
    formulario,
    cargando,
    error,
    exito,
    actualizarCampo,
    cambiarContrasena,
  };
}

export default useCambioContrasena;