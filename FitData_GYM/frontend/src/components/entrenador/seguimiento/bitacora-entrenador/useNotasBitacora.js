import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  actualizarNotaBitacora,
  crearNotaBitacora,
  eliminarNotaBitacora,
  obtenerNotasPorMiembro,
} from './notasBitacoraService';

function useNotasBitacora({
  miembroSeleccionado,
  entrenadorActual,
  mostrarMensaje,
  onActualizarConteo,
}) {
  const [notas, setNotas] = useState([]);
  const [textoNota, setTextoNota] =
    useState('');
  const [notaEditando, setNotaEditando] =
    useState(null);
  const [cargando, setCargando] =
    useState(false);
  const [guardando, setGuardando] =
    useState(false);
  const [eliminando, setEliminando] =
    useState(false);

  const cargarNotas = useCallback(
    async (idMiembro) => {
      if (!idMiembro) {
        setNotas([]);
        return;
      }

      try {
        setCargando(true);

        const resultado =
          await obtenerNotasPorMiembro(
            idMiembro,
          );

        setNotas(resultado);
      } catch (error) {
        console.error(
          'Error al cargar notas:',
          error,
        );

        setNotas([]);

        mostrarMensaje(
          'error',
          error.message,
        );
      } finally {
        setCargando(false);
      }
    },
    [mostrarMensaje],
  );

  const refrescarDatos = useCallback(
    async () => {
      if (!miembroSeleccionado?.id) {
        return;
      }

      await Promise.all([
        cargarNotas(
          miembroSeleccionado.id,
        ),
        onActualizarConteo?.(),
      ]);
    },
    [
      miembroSeleccionado,
      cargarNotas,
      onActualizarConteo,
    ],
  );

  useEffect(() => {
    setTextoNota('');
    setNotaEditando(null);

    cargarNotas(
      miembroSeleccionado?.id,
    );
  }, [
    miembroSeleccionado?.id,
    cargarNotas,
  ]);

  const guardarNota = useCallback(
    async (evento) => {
      evento.preventDefault();

      const texto = textoNota.trim();

      if (
        guardando ||
        !miembroSeleccionado?.id
      ) {
        return;
      }

      if (!texto) {
        mostrarMensaje(
          'error',
          'La nota no puede estar vacía.',
        );
        return;
      }

      try {
        setGuardando(true);

        if (notaEditando?.id) {
          await actualizarNotaBitacora(
            notaEditando.id,
            texto,
          );
        } else {
          await crearNotaBitacora({
            miembro: miembroSeleccionado,
            entrenador: entrenadorActual,
            texto,
          });
        }

        mostrarMensaje(
          'success',
          notaEditando
            ? 'Nota actualizada correctamente.'
            : 'Nota guardada correctamente.',
        );

        setTextoNota('');
        setNotaEditando(null);

        await refrescarDatos();
      } catch (error) {
        console.error(
          'Error al guardar nota:',
          error,
        );

        mostrarMensaje(
          'error',
          error.message,
        );
      } finally {
        setGuardando(false);
      }
    },
    [
      textoNota,
      guardando,
      miembroSeleccionado,
      notaEditando,
      entrenadorActual,
      refrescarDatos,
      mostrarMensaje,
    ],
  );

  const editarNota = (nota) => {
    setNotaEditando(nota);
    setTextoNota(nota?.note ?? '');
  };

  const cancelarEdicion = () => {
    setNotaEditando(null);
    setTextoNota('');
  };

  const eliminarNota = useCallback(
    async (idNota) => {
      if (!idNota || eliminando) {
        return;
      }

      const confirmado = window.confirm(
        '¿Estás seguro de eliminar esta nota?',
      );

      if (!confirmado) {
        return;
      }

      try {
        setEliminando(true);

        await eliminarNotaBitacora(idNota);

        if (notaEditando?.id === idNota) {
          cancelarEdicion();
        }

        mostrarMensaje(
          'success',
          'Nota eliminada correctamente.',
        );

        await refrescarDatos();
      } catch (error) {
        console.error(
          'Error al eliminar nota:',
          error,
        );

        mostrarMensaje(
          'error',
          error.message,
        );
      } finally {
        setEliminando(false);
      }
    },
    [
      eliminando,
      notaEditando,
      refrescarDatos,
      mostrarMensaje,
    ],
  );

  return {
    notas,
    textoNota,
    notaEditando,
    cargando,
    guardando,
    eliminando,
    setTextoNota,
    guardarNota,
    editarNota,
    eliminarNota,
    cancelarEdicion,
  };
}

export default useNotasBitacora;