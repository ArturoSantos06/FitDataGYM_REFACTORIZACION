import useFormularioReporte from '../hooks/useFormularioReporte';
import FormularioReporteVista from './partes/FormularioReporteVista';

function FormularioReporteEnChat({ maquinas = [], onCancel, onSuccess }) {
  const { maquinaId, setMaquinaId, descripcion, setDescripcion, setArchivo, enviando, error, handleSubmit } =
    useFormularioReporte(maquinas, onSuccess);

  return (
    <FormularioReporteVista
      maquinas={maquinas}
      maquinaId={maquinaId}
      onCambioMaquina={(e) => setMaquinaId(e.target.value)}
      descripcion={descripcion}
      onCambioDescripcion={(e) => setDescripcion(e.target.value)}
      onCambioArchivo={(e) => setArchivo(e.target.files?.[0] || null)}
      error={error}
      enviando={enviando}
      onCancel={onCancel}
      onSubmit={handleSubmit}
    />
  );
}

export default FormularioReporteEnChat;
