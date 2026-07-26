import { useState } from 'react';
import { crearMaquinaCatalogo, subirFotoMaquina } from '../../../../backend/mantenimiento';

export default function useCatalogoMaquinas() {
  const [nombreMaquina, setNombreMaquina] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  const guardarMaquina = async (event) => {
    event.preventDefault();
    setError('');
    setOk('');

    if (!String(nombreMaquina || '').trim()) {
      setError('Escribe el nombre de la maquina.');
      return;
    }

    if (!archivo) {
      setError('Sube una foto para agregarla al catalogo.');
      return;
    }

    setGuardando(true);
    try {
      const upload = await subirFotoMaquina(archivo);
      if (!upload.success) {
        throw new Error(upload.error || 'No se pudo subir la foto de la maquina.');
      }

      await crearMaquinaCatalogo({ nombre: nombreMaquina, fotoUrl: upload.url });

      setNombreMaquina('');
      setArchivo(null);
      setOk('Maquina agregada al catalogo correctamente.');
    } catch (saveError) {
      setError(String(saveError?.message || 'No se pudo guardar la maquina.'));
    } finally {
      setGuardando(false);
    }
  };

  return { nombreMaquina, setNombreMaquina, setArchivo, guardando, error, ok, guardarMaquina };
}
