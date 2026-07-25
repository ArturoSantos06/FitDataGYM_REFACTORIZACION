import { useMemo, useState } from 'react';
import { crearReporteMantenimiento, subirFotoReporte } from '../../../backend/mantenimiento';

export default function useFormularioReporte(maquinas, onSuccess) {
  const [maquinaId, setMaquinaId] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const maquinaSeleccionada = useMemo(() => maquinas.find((item) => item.id === maquinaId) || null, [maquinaId, maquinas]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!maquinaSeleccionada) {
      setError('Selecciona una maquina del catalogo.');
      return;
    }

    if (!String(descripcion || '').trim()) {
      setError('Describe el problema para enviar el reporte.');
      return;
    }

    setEnviando(true);
    try {
      let fotoUsuarioUrl = '';
      if (archivo) {
        const subida = await subirFotoReporte(archivo);
        if (!subida.success) {
          throw new Error(subida.error || 'No se pudo subir la foto del reporte.');
        }
        fotoUsuarioUrl = subida.url;
      }

      await crearReporteMantenimiento({
        maquinaId: maquinaSeleccionada.id,
        maquinaNombre: maquinaSeleccionada.nombre,
        maquinaFotoUrl: maquinaSeleccionada.fotoUrl,
        descripcion,
        fotoUsuarioUrl,
      });

      onSuccess?.({ maquinaNombre: maquinaSeleccionada.nombre, descripcion });

      setMaquinaId('');
      setDescripcion('');
      setArchivo(null);
    } catch (submitError) {
      setError(String(submitError?.message || 'No se pudo crear el reporte.'));
    } finally {
      setEnviando(false);
    }
  };

  return {
    maquinaId,
    setMaquinaId,
    maquinaSeleccionada,
    descripcion,
    setDescripcion,
    setArchivo,
    enviando,
    error,
    handleSubmit,
  };
}
