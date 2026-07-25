import ModalConfirmacion from '../../../modales/ModalConfirmacion';
import ModalExito from '../../../modales/ModalExito';

function ModalesNutriologosCliente(estado) {
  const nombre = estado.nutriologoPendiente?.displayName || estado.nutriologoPendiente?.nombre || 'este nutriólogo';
  return <><ModalExito isOpen={estado.modalExito.isOpen} onClose={estado.cerrarExito} title={estado.modalExito.title} message={estado.modalExito.message} subMessage={estado.modalExito.subMessage} overlayClassName="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in" /><ModalConfirmacion isOpen={estado.mostrarSeleccion} onClose={estado.cerrarSeleccion} onConfirm={estado.confirmarSeleccion} title="Confirmar selección" message={`¿Estás seguro de seleccionar a ${nombre} como tu nutriólogo?\n\nEsto iniciará tu plan de nutrición personalizado.`} confirmLabel={estado.asignando ? 'Asignando...' : 'Aceptar'} variant="info" overlayClassName="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in" /><ModalConfirmacion isOpen={estado.mostrarCalificacion} onClose={estado.cerrarCalificacion} onConfirm={estado.confirmarCalificacion} title="Confirmar calificación" message={`¿Calificar a este nutriólogo con ${estado.calificacionPendiente?.calificacion || 0} estrella(s)?`} confirmLabel={estado.enviandoCalificacion ? 'Enviando...' : 'Aceptar'} variant="info" overlayClassName="fixed inset-0 bg-transparent backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in" /></>;
}

export default ModalesNutriologosCliente;
