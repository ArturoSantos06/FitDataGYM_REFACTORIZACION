import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../../../firebase/config';

function useModalDetalleEntrenador({
  entreno,
  onClose,
}) {
  const [estaEditando, setEstaEditando] =
    useState(false);

  const [contenidoRutina, setContenidoRutina] =
    useState(entreno?.rutina ?? '');

  const [guardando, setGuardando] =
    useState(false);

  const [eliminando, setEliminando] =
    useState(false);

  const [
    configuracionDialogo,
    setConfiguracionDialogo,
  ] = useState(null);

  const formularioBloqueado =
    guardando || eliminando;

  const cerrarDialogo = useCallback(() => {
    setConfiguracionDialogo(null);
  }, []);

  const cerrarModal = useCallback(() => {
    if (!formularioBloqueado) {
      onClose?.();
    }
  }, [formularioBloqueado, onClose]);

  useEffect(() => {
    setContenidoRutina(entreno?.rutina ?? '');
    setEstaEditando(false);
    setConfiguracionDialogo(null);
  }, [entreno?.id, entreno?.rutina]);

  useEffect(() => {
    const cerrarConEscape = (evento) => {
      if (evento.key !== 'Escape') {
        return;
      }

      if (configuracionDialogo) {
        cerrarDialogo();
        return;
      }

      cerrarModal();
    };

    document.addEventListener(
      'keydown',
      cerrarConEscape,
    );

    return () => {
      document.removeEventListener(
        'keydown',
        cerrarConEscape,
      );
    };
  }, [
    cerrarDialogo,
    cerrarModal,
    configuracionDialogo,
  ]);

  const comenzarEdicion = () => {
    setEstaEditando(true);
  };

  const cancelarEdicion = () => {
    setContenidoRutina(entreno?.rutina ?? '');
    setEstaEditando(false);
  };

  const actualizarRutina = async () => {
    if (
      !entreno?.id ||
      formularioBloqueado
    ) {
      return;
    }

    try {
      setGuardando(true);

      const referenciaEntrenamiento = doc(
        db,
        'entrenamientos',
        entreno.id,
      );

      await updateDoc(referenciaEntrenamiento, {
        rutina: contenidoRutina.trim(),
      });

      setEstaEditando(false);
    } catch (error) {
      console.error(
        'Error al actualizar la rutina:',
        error,
      );

      setConfiguracionDialogo({
        type: 'danger',
        title: 'Error',
        message:
          'No se pudo actualizar la rutina.',
        onConfirm: cerrarDialogo,
      });
    } finally {
      setGuardando(false);
    }
  };

  const eliminarEntrenamiento = async () => {
    if (
      !entreno?.id ||
      formularioBloqueado
    ) {
      return;
    }

    try {
      setEliminando(true);

      await deleteDoc(
        doc(
          db,
          'entrenamientos',
          entreno.id,
        ),
      );

      cerrarDialogo();
      onClose?.();
    } catch (error) {
      console.error(
        'Error al eliminar el entrenamiento:',
        error,
      );

      setConfiguracionDialogo({
        type: 'danger',
        title: 'Error',
        message:
          'No se pudo eliminar la sesión.',
        onConfirm: cerrarDialogo,
      });
    } finally {
      setEliminando(false);
    }
  };

  const solicitarEliminacion = () => {
    setConfiguracionDialogo({
      type: 'danger',
      title: 'Eliminar sesión',
      message:
        '¿Deseas borrar este entrenamiento? Esta acción es irreversible.',
      onConfirm: eliminarEntrenamiento,
      onCancel: cerrarDialogo,
    });
  };

  const cerrarDesdeFondo = (evento) => {
    if (evento.target === evento.currentTarget) {
      cerrarModal();
    }
  };

  return {
    estaEditando,
    contenidoRutina,
    guardando,
    eliminando,
    formularioBloqueado,
    configuracionDialogo,
    setContenidoRutina,
    comenzarEdicion,
    cancelarEdicion,
    actualizarRutina,
    solicitarEliminacion,
    cerrarDesdeFondo,
    cerrarModal,
  };
}

export default useModalDetalleEntrenador;