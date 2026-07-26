import useRegistroNutriologo from './hooks/useRegistroNutriologo';
import ContenedorRegistro from './partes/ContenedorRegistro';
import FormularioNutriologoVista from './partes/FormularioNutriologoVista';
import ModalExito from '../../../modales/ModalExito';
import { SUBTITULOS_REGISTRO } from './contenido';

export default function RegistroNutriologo({ onUserRegistered, tipoRegistro, onCambioTipoRegistro }) {
  const { estado, formData, manejarCambio, manejarEnvio } = useRegistroNutriologo(onUserRegistered);

  return (
    <ContenedorRegistro
      estado={estado}
      subtitulo={SUBTITULOS_REGISTRO.nutriologo}
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
      <FormularioNutriologoVista formData={formData} onCambio={manejarCambio} cargando={estado.cargando} onEnviar={manejarEnvio} />
    </ContenedorRegistro>
  );
}
