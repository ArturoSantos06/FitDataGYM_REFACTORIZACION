import { useState } from 'react';
import { asignarMembresia } from '../../../../backend/membresias';

export function useEnvioAsignacion({
  clienteSeleccionado,
  membresiaSeleccionada,
  metodoPago,
  montoRecibido,
  precioSeleccionado,
  cambio,
  onExito,
}) {
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [datosConflicto, setDatosConflicto] = useState(null);

  const [modalExitoAbierto, setModalExitoAbierto] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [subMensajeExito, setSubMensajeExito] = useState('');

  const enviarAsignacion = async (forzarRenovacion = false) => {
    setError('');

    if (!clienteSeleccionado || !membresiaSeleccionada) {
      setError('Selecciona cliente y membresía.');
      return;
    }

    if (metodoPago === 'EFECTIVO' && parseFloat(montoRecibido) < parseFloat(precioSeleccionado)) {
      setError('El monto recibido es insuficiente.');
      return;
    }

    setCargando(true);

    try {
      const resultado = await asignarMembresia({
        userId: clienteSeleccionado,
        membershipTypeId: membresiaSeleccionada,
        paymentMethod: metodoPago,
        montoRecibido: metodoPago === 'EFECTIVO' ? parseFloat(montoRecibido) : precioSeleccionado,
        forceRenew: forzarRenovacion,
      });

      if (!resultado.success) {
        if (resultado.conflict) {
          setDatosConflicto(resultado);
          setCargando(false);
          return;
        }
        throw new Error(resultado.error);
      }

      setMensajeExito(resultado.message || 'Membresía Actualizada');
      setSubMensajeExito(
        metodoPago === 'EFECTIVO'
          ? `💰 Cambio: $${cambio.toFixed(2)}\n📧 Ticket enviado.`
          : '📧 Ticket enviado al correo.'
      );
      setModalExitoAbierto(true);
      setDatosConflicto(null);

      onExito?.();
    } catch (error) {
      setError(error.message);
      setDatosConflicto(null);
    } finally {
      setCargando(false);
    }
  };

  return {
    error,
    cargando,
    datosConflicto,
    cerrarConflicto: () => setDatosConflicto(null),
    modalExitoAbierto,
    cerrarModalExito: () => setModalExitoAbierto(false),
    mensajeExito,
    subMensajeExito,
    enviarAsignacion,
  };
}
