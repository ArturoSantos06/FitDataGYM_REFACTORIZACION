import { useCallback } from 'react';
import { deactivateTrainerByAdmin, reactivateTrainerByAdmin } from '../../../../firebase';

export function useAccionesEntrenadores({
  accionPendiente,
  setAccionPendiente,
  setIdEntrenadorDesactivando,
  setIdEntrenadorReactivando,
  setEntrenadores,
  setEntrenadoresInactivos,
  setModalError,
  setModalExito,
  obtenerNombreVisualizacion,
}) {
  const manejarDesactivarEntrenador = useCallback((entrenador) => {
    setIdEntrenadorDesactivando(entrenador.id);
    setAccionPendiente({ tipo: 'desactivar', entrenador });
  }, [setAccionPendiente, setIdEntrenadorDesactivando]);

  const ejecutarDesactivarEntrenador = useCallback(async () => {
    const entrenador = accionPendiente?.entrenador;
    if (!entrenador?.id) {
      setModalError({ isOpen: true, title: 'Error', message: 'No se especificó entrenador' });
      return;
    }

    try {
      await deactivateTrainerByAdmin(entrenador.id);
      setEntrenadores((prev) => prev.filter((actual) => actual.id !== entrenador.id));
      setEntrenadoresInactivos((prev) => [...prev, entrenador]);
      setModalExito({
        isOpen: true,
        title: 'Éxito',
        message: 'Entrenador desactivado',
        subMessage: `${obtenerNombreVisualizacion(entrenador)} ha sido desactivado.`,
      });
    } catch (error) {
      setModalError({ isOpen: true, title: 'Error', message: error.message || 'No se pudo desactivar' });
    } finally {
      setIdEntrenadorDesactivando('');
      setAccionPendiente(null);
    }
  }, [accionPendiente, obtenerNombreVisualizacion, setEntrenadores, setEntrenadoresInactivos, setModalError, setModalExito, setAccionPendiente, setIdEntrenadorDesactivando]);

  const manejarReactivarEntrenador = useCallback((entrenador) => {
    setIdEntrenadorReactivando(entrenador.id);
    setAccionPendiente({ tipo: 'reactivar', entrenador });
  }, [setAccionPendiente, setIdEntrenadorReactivando]);

  const ejecutarReactivarEntrenador = useCallback(async () => {
    const entrenador = accionPendiente?.entrenador;
    if (!entrenador?.id) {
      setModalError({ isOpen: true, title: 'Error', message: 'No se especificó entrenador' });
      return;
    }

    try {
      await reactivateTrainerByAdmin(entrenador.id);
      setEntrenadoresInactivos((prev) => prev.filter((actual) => actual.id !== entrenador.id));
      setEntrenadores((prev) => [...prev, entrenador]);
      setModalExito({
        isOpen: true,
        title: 'Éxito',
        message: 'Entrenador reactivado',
        subMessage: `${obtenerNombreVisualizacion(entrenador)} ha sido reactivado.`,
      });
    } catch (error) {
      setModalError({ isOpen: true, title: 'Error', message: error.message || 'No se pudo reactivar' });
    } finally {
      setIdEntrenadorReactivando('');
      setAccionPendiente(null);
    }
  }, [accionPendiente, obtenerNombreVisualizacion, setEntrenadores, setEntrenadoresInactivos, setModalError, setModalExito, setAccionPendiente, setIdEntrenadorReactivando]);

  return {
    manejarDesactivarEntrenador,
    ejecutarDesactivarEntrenador,
    manejarReactivarEntrenador,
    ejecutarReactivarEntrenador,
  };
}
