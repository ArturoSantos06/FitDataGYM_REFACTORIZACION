import { useCallback, useState } from 'react';
import { createTrainerPayment } from '../../../../firebase';

const crearModalPagoInicial = () => ({
  isOpen: false,
  trainerId: '',
  trainerName: '',
  trainerEmail: '',
  contractType: '',
  paymentMethod: 'DEPOSITO A CUENTA',
  amount: '',
  mes: 0,
  anio: 0,
});

export function usePagosEntrenadores({
  pagosEntrenadores,
  setPagosEntrenadores,
  aMs,
  normalizarClaveBusqueda,
  obtenerNombreVisualizacion,
  setModalError,
  setModalExito,
}) {
  const [modalPago, setModalPago] = useState(crearModalPagoInicial);
  const [filtroMesPagos, setFiltroMesPagos] = useState(new Date().getMonth() + 1);
  const [filtroAnioPagos, setFiltroAnioPagos] = useState(new Date().getFullYear());
  const [filtroMesEntrenadores, setFiltroMesEntrenadores] = useState(new Date().getMonth() + 1);
  const [filtroAnioEntrenadores, setFiltroAnioEntrenadores] = useState(new Date().getFullYear());

  const obtenerIngresoMensualFiltrado = useCallback((trainer = null, mes = filtroMesPagos, anio = filtroAnioPagos) => {
    const clavesEntrenador = trainer
      ? [trainer.id, trainer.legacyId, trainer.authUid, trainer.email, trainer.username, trainer.displayName, trainer.nombre, trainer.trainerId, trainer.trainerEmail, trainer.trainerName, trainer.trainer_nombre]
        .map(normalizarClaveBusqueda)
        .filter(Boolean)
      : [];

    return pagosEntrenadores
      .filter((pago) => {
        const fecha = new Date(aMs(pago.createdAt || pago.fecha));
        if (fecha.getMonth() + 1 !== Number(mes) || fecha.getFullYear() !== Number(anio)) return false;
        if (!trainer) return true;

        const clavesPago = [pago.trainerId, pago.trainer_id, pago.trainerEmail, pago.trainer_email, pago.trainerName, pago.trainer_name, pago.trainer_nombre]
          .map(normalizarClaveBusqueda)
          .filter(Boolean);
        return clavesPago.some((clave) => clavesEntrenador.includes(clave));
      })
      .reduce((sum, pago) => sum + (Number(pago.total || pago.amount || pago.monto || pago.monto_recibido || 0) || 0), 0);
  }, [aMs, filtroAnioPagos, filtroMesPagos, normalizarClaveBusqueda, pagosEntrenadores]);

  const manejarPagoEntrenador = useCallback((entrenador) => {
    setModalPago({
      isOpen: true,
      trainerId: entrenador.id,
      trainerName: obtenerNombreVisualizacion(entrenador),
      trainerEmail: entrenador.email || '',
      contractType: entrenador.contractType || '',
      paymentMethod: 'DEPOSITO A CUENTA',
      amount: '',
      mes: new Date().getMonth() + 1,
      anio: new Date().getFullYear(),
    });
  }, [obtenerNombreVisualizacion]);

  const actualizarMontoPago = useCallback((amount) => {
    setModalPago((prev) => ({ ...prev, amount }));
  }, []);

  const cerrarModalPago = useCallback(() => setModalPago(crearModalPagoInicial()), []);

  const manejarConfirmarPagoModal = useCallback(async () => {
    const amount = Number(modalPago.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setModalError({ isOpen: true, title: 'Monto inválido', message: 'Ingresa un monto mayor que cero.' });
      return;
    }

    try {
      const result = await createTrainerPayment({ ...modalPago, amount });
      if (!result?.success) throw new Error(result?.error || 'No se pudo registrar el pago.');

      setPagosEntrenadores((prev) => [{
        id: result.folio,
        folio: result.folio,
        trainer_id: modalPago.trainerId,
        trainer_email: modalPago.trainerEmail,
        trainer_nombre: modalPago.trainerName,
        contract_type: modalPago.contractType,
        metodo_pago: modalPago.paymentMethod,
        total: amount,
        createdAt: new Date(),
      }, ...prev]);
      cerrarModalPago();
      setModalExito({ isOpen: true, title: 'Pago registrado', message: 'El pago fue registrado correctamente.', subMessage: `Folio: ${result.folio}` });
    } catch (error) {
      setModalError({ isOpen: true, title: 'Error', message: error.message || 'No se pudo registrar el pago.' });
    }
  }, [cerrarModalPago, modalPago, setModalError, setModalExito, setPagosEntrenadores]);

  return {
    modalPago,
    filtroMesPagos,
    setFiltroMesPagos,
    filtroAnioPagos,
    setFiltroAnioPagos,
    filtroMesEntrenadores,
    setFiltroMesEntrenadores,
    filtroAnioEntrenadores,
    setFiltroAnioEntrenadores,
    obtenerIngresoMensualFiltrado,
    manejarPagoEntrenador,
    actualizarMontoPago,
    cerrarModalPago,
    manejarConfirmarPagoModal,
  };
}
