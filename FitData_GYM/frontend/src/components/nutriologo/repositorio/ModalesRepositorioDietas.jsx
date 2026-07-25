import ErrorModal from '../../modales/ErrorModal';
import ModalConfirmacion from '../../modales/ModalConfirmacion';
import ModalExito from '../../modales/ModalExito';

const obtenerNombreArchivo = (archivo) =>
  archivo?.title || archivo?.originalFileName || 'archivo';

export default function ModalesRepositorioDietas({
  modalExito,
  alCerrarExito,
  modalError,
  alCerrarError,
  archivoPendiente,
  alCancelarEliminacion,
  alConfirmarEliminacion,
}) {
  const nombreArchivo = obtenerNombreArchivo(archivoPendiente);
  const nombreCorto = `${nombreArchivo.slice(0, 35)}${
    nombreArchivo.length > 35 ? '...' : ''
  }`;

  return (
    <>
      {modalExito.abierto && (
        <ModalExito
          isOpen={modalExito.abierto}
          title={modalExito.titulo}
          message={modalExito.mensaje}
          onClose={alCerrarExito}
        />
      )}
      {modalError.abierto && (
        <ErrorModal
          isOpen={modalError.abierto}
          title="No se pudo completar la acción"
          message={modalError.mensaje}
          onClose={alCerrarError}
        />
      )}
      {archivoPendiente && (
        <ModalConfirmacion
          isOpen={Boolean(archivoPendiente)}
          title="Confirmar eliminación"
          message={`¿Eliminar "${nombreCorto}" del expediente?`}
          onClose={alCancelarEliminacion}
          onConfirm={alConfirmarEliminacion}
        />
      )}
    </>
  );
}
