import useRegistroEntrenador from './hooks/useRegistroEntrenador';
import ContenedorRegistro from './partes/ContenedorRegistro';
import FormularioEntrenadorVista from './partes/FormularioEntrenadorVista';
import ModalExito from '../../../modales/ModalExito';
import { SUBTITULOS_REGISTRO } from './contenido';

export default function RegistroEntrenador({ onUserRegistered, tipoRegistro, onCambioTipoRegistro }) {
  const { estado, formData, manejarCambio, manejarEnvio } = useRegistroEntrenador(onUserRegistered);

  return (
    <ContenedorRegistro
      estado={estado}
      subtitulo={SUBTITULOS_REGISTRO.entrenador}
      tipoRegistro={tipoRegistro}
      onCambioTipoRegistro={onCambioTipoRegistro}
    >
      <ModalExito
        isOpen={estado.mostrarModalExito}
        onClose={estado.cerrarExito}
        title="¡Registro Exitoso!"
        message={estado.mensajeExito}
        subMessage={estado.mensajeSubExito}
      />
      <FormularioEntrenadorVista formData={formData} onCambio={manejarCambio} cargando={estado.cargando} onEnviar={manejarEnvio} />
    </ContenedorRegistro>
  );
}
