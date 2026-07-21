import { useCallback } from 'react';
import { completeTrainerServicePayment, removeTrainerFromClient } from '../../../../firebase';

export function useAccionesServicios({
  accionPendiente,
  setAccionPendiente,
  servicioPendienteDesvincular,
  setServicioPendienteDesvincular,
  setIdClienteDesvinculando,
  setIdVentaServicioCompletando,
  setServiciosEntrenamiento,
  setVentasServiciosEntrenador,
  setModalError,
  setModalExito,
}) {
  const manejarDesvincularCliente = useCallback((servicio) => {
    setIdClienteDesvinculando(servicio.id);
    setServicioPendienteDesvincular(servicio);
  }, [setIdClienteDesvinculando, setServicioPendienteDesvincular]);

  const ejecutarDesvincularCliente = useCallback(async () => {
    if (!servicioPendienteDesvincular?.id) {
      setModalError({ isOpen: true, title: 'Error', message: 'No se especificó servicio' });
      return;
    }

    try {
      await removeTrainerFromClient(
        servicioPendienteDesvincular.clientId,
        servicioPendienteDesvincular.trainerId
      );
      setServiciosEntrenamiento((prev) => prev.filter((servicio) => servicio.id !== servicioPendienteDesvincular.id));
      setModalExito({
        isOpen: true,
        title: 'Éxito',
        message: 'Cliente desvinculado del entrenador',
        subMessage: 'La asignación ha sido removida.',
      });
    } catch (error) {
      setModalError({ isOpen: true, title: 'Error', message: error.message || 'No se pudo desvincular' });
    } finally {
      setIdClienteDesvinculando('');
      setServicioPendienteDesvincular(null);
    }
  }, [servicioPendienteDesvincular, setIdClienteDesvinculando, setModalError, setModalExito, setServiciosEntrenamiento, setServicioPendienteDesvincular]);

  const manejarCompletarVentaServicio = useCallback((venta) => {
    setAccionPendiente({ tipo: 'completarVenta', venta });
  }, [setAccionPendiente]);

  const ejecutarCompletarVentaServicio = useCallback(async () => {
    const venta = accionPendiente?.venta;
    if (!venta?.id) {
      setModalError({ isOpen: true, title: 'Error', message: 'No se especificó venta' });
      return;
    }

    try {
      setIdVentaServicioCompletando(venta.id);
      const result = await completeTrainerServicePayment(venta.id);
      if (!result?.success) {
        throw new Error(result?.error || 'No se pudo completar');
      }
      setVentasServiciosEntrenador((prev) => prev.map((actual) => (
        actual.id === venta.id ? { ...actual, status: 'completed' } : actual
      )));
      setModalExito({
        isOpen: true,
        title: 'Éxito',
        message: 'Venta completada',
        subMessage: 'El servicio ha sido marcado como completado.',
      });
    } catch (error) {
      setModalError({ isOpen: true, title: 'Error', message: error.message || 'No se pudo completar' });
    } finally {
      setIdVentaServicioCompletando('');
      setAccionPendiente(null);
    }
  }, [accionPendiente, setAccionPendiente, setIdVentaServicioCompletando, setModalError, setModalExito, setVentasServiciosEntrenador]);

  return {
    manejarDesvincularCliente,
    ejecutarDesvincularCliente,
    manejarCompletarVentaServicio,
    ejecutarCompletarVentaServicio,
  };
}
