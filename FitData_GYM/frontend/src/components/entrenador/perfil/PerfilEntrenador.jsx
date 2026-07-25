import ModalExito from '../../modales/ModalExito';
import { usePerfilEntrenador } from '../../../backend/usePerfilEntrenador';

import EstadoCargaPerfil from './perfil-entrenador/EstadoCargaPerfil';
import EstadoErrorPerfil from './perfil-entrenador/EstadoErrorPerfil';
import VistaPerfilEntrenador from './perfil-entrenador/VistaPerfilEntrenador';

function PerfilEntrenador() {
  const {
    usuario,
    codigoEntrenador,
    vistaActual,
    cargando,
    error,
    showSuccessModal,
    successMessage,
    setVistaActual,
    setShowSuccessModal,
    guardar,
  } = usePerfilEntrenador();

  if (cargando) {
    return <EstadoCargaPerfil />;
  }

  if (error) {
    return (
      <EstadoErrorPerfil error={error} />
    );
  }

  if (!usuario) {
    return null;
  }

  const cerrarModalExito = () => {
    setShowSuccessModal(false);
  };

  return (
    <main className="flex w-full justify-center">
      <ModalExito
        isOpen={showSuccessModal}
        onClose={cerrarModalExito}
        title="Éxito"
        message={successMessage}
      />

      <VistaPerfilEntrenador
        vistaActual={vistaActual}
        usuario={usuario}
        codigoEntrenador={codigoEntrenador}
        onGuardar={guardar}
        onCambiarVista={setVistaActual}
      />
    </main>
  );
}

export default PerfilEntrenador;