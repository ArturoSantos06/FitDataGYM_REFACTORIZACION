import {
  useEffect,
  useState,
} from 'react';

import {
  crearFormularioInicial,
  obtenerValorCampo,
  prepararDatosParaGuardar,
  validarFormularioPerfil,
} from './formularioDatosPerfilUtils';

function useFormularioDatosPerfilEntrenador({
  usuario = {},
  onGuardar,
}) {
  const [form, setForm] = useState(() =>
    crearFormularioInicial(usuario),
  );

  const [guardando, setGuardando] =
    useState(false);

  const [mensajeError, setMensajeError] =
    useState('');

  const [mensajeExito, setMensajeExito] =
    useState('');

  useEffect(() => {
    setForm(
      crearFormularioInicial(usuario),
    );

    setMensajeError('');
    setMensajeExito('');
  }, [usuario]);

  const limpiarMensajes = () => {
    setMensajeError('');
    setMensajeExito('');
  };

  const cambiarCampo = (evento) => {
    const nombreCampo =
      evento.target.name;

    const valorCampo =
      obtenerValorCampo(evento);

    setForm((formularioActual) => ({
      ...formularioActual,
      [nombreCampo]: valorCampo,
    }));

    limpiarMensajes();
  };

  const guardarFormulario = async (
    evento,
  ) => {
    evento.preventDefault();

    if (guardando) {
      return;
    }

    limpiarMensajes();

    const errorValidacion =
      validarFormularioPerfil(form);

    if (errorValidacion) {
      setMensajeError(errorValidacion);
      return;
    }

    if (typeof onGuardar !== 'function') {
      setMensajeError(
        'No se configuró la función para guardar el perfil.',
      );

      return;
    }

    try {
      setGuardando(true);

      const datosPreparados =
        prepararDatosParaGuardar(form);

      await onGuardar(datosPreparados);

      setForm(datosPreparados);

      setMensajeExito(
        'Datos actualizados correctamente.',
      );
    } catch (error) {
      console.error(
        'Error al actualizar el perfil:',
        error,
      );

      setMensajeError(
        error?.message ||
          'No se pudo actualizar el perfil.',
      );
    } finally {
      setGuardando(false);
    }
  };

  return {
    form,
    guardando,
    mensajeError,
    mensajeExito,
    cambiarCampo,
    guardarFormulario,
  };
}

export default useFormularioDatosPerfilEntrenador;