import { useState } from 'react';
import useFormularioReporte from '../hooks/useFormularioReporte';
import FormularioReporteUsuarioVista from './partes/FormularioReporteUsuarioVista';

function VistaUsuarioMantenimiento({ maquinas = [] }) {
  const [ok, setOk] = useState('');

  const { maquinaId, setMaquinaId, maquinaSeleccionada, descripcion, setDescripcion, setArchivo, enviando, error, handleSubmit } =
    useFormularioReporte(maquinas, () => setOk('Reporte enviado correctamente. Gracias por avisar.'));

  const onSubmit = (event) => {
    setOk('');
    handleSubmit(event);
  };

  return (
    <FormularioReporteUsuarioVista
      maquinas={maquinas}
      maquinaId={maquinaId}
      onCambioMaquina={(e) => setMaquinaId(e.target.value)}
      maquinaSeleccionada={maquinaSeleccionada}
      descripcion={descripcion}
      onCambioDescripcion={(e) => setDescripcion(e.target.value)}
      onCambioArchivo={(e) => setArchivo(e.target.files?.[0] || null)}
      error={error}
      ok={ok}
      enviando={enviando}
      onSubmit={onSubmit}
    />
  );
}

export default VistaUsuarioMantenimiento;
