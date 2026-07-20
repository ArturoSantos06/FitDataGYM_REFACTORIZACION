import ModalConfirmacion from '../../modales/ModalConfirmacion';
import ErrorModal from '../../modales/ErrorModal';
import ModalExito from '../../modales/ModalExito';
import ModalEntradaPago from './ModalEntradaPago';

const ESTADO_MODAL_INICIAL = { isOpen: false, title: '', message: '', subMessage: '' };

function ModalesGestionEntrenadores({ gestion }) {
  const cerrarAccion = () => {
    if (!gestion.idEntrenadorDesactivando && !gestion.idEntrenadorReactivando) {
      gestion.setAccionPendiente(null);
    }
  };

  return (
    <>
      <ModalConfirmacion
        isOpen={Boolean(gestion.accionPendiente)}
        onClose={cerrarAccion}
        onConfirm={gestion.manejarConfirmarAccionPendiente}
        title={gestion.accionPendiente?.tipo === 'desactivar' ? 'Confirmar descontratación' : 'Confirmar recontratación'}
        message={gestion.accionPendiente?.entrenador
          ? `${gestion.accionPendiente.tipo === 'desactivar' ? 'Se desactivará' : 'Se reactivará'} a ${gestion.accionPendiente.entrenador.name}.`
          : ''}
        confirmLabel={gestion.accionPendiente?.tipo === 'desactivar' ? 'Sí, Descontratar' : 'Sí, Recontratar'}
      />

      <ModalConfirmacion
        isOpen={Boolean(gestion.servicioPendienteDesvincular)}
        onClose={() => !gestion.idClienteDesvinculando && gestion.setServicioPendienteDesvincular(null)}
        onConfirm={() => gestion.ejecutarDesvincularCliente(gestion.servicioPendienteDesvincular)}
        title="Confirmar desvinculación"
        message={gestion.servicioPendienteDesvincular
          ? `Se desvinculará a ${gestion.servicioPendienteDesvincular.clientName || 'este cliente'} de ${gestion.servicioPendienteDesvincular.trainerName || 'su entrenador'}.`
          : ''}
        confirmLabel={gestion.idClienteDesvinculando ? 'Desvinculando...' : 'Sí, Desvincular'}
      />

      <ErrorModal
        isOpen={gestion.modalError.isOpen}
        onClose={() => gestion.setModalError({ isOpen: false, title: '', message: '' })}
        title={gestion.modalError.title}
        message={gestion.modalError.message}
      />

      <ModalExito
        isOpen={gestion.modalExito.isOpen}
        onClose={() => gestion.setModalExito(ESTADO_MODAL_INICIAL)}
        title={gestion.modalExito.title}
        message={gestion.modalExito.message}
        subMessage={gestion.modalExito.subMessage}
      />

      <ModalEntradaPago
        isOpen={gestion.modalPago.isOpen}
        title="Registrar pago a entrenador"
        subtitle={`${gestion.modalPago.trainerName || 'Entrenador'} (${gestion.modalPago.mes ? new Date(2000, gestion.modalPago.mes - 1).toLocaleDateString('es-MX', { month: 'long' }) : ''} ${gestion.modalPago.anio || ''})`}
        value={gestion.modalPago.amount}
        onChange={gestion.actualizarMontoPago}
        onClose={gestion.cerrarModalPago}
        onConfirm={gestion.manejarConfirmarPagoModal}
        confirmLabel="Registrar pago"
      />
    </>
  );
}

export default ModalesGestionEntrenadores;
