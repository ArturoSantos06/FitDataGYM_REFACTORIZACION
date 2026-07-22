import { useState, useEffect, useCallback } from 'react';
import { listarTiposMembresia, crearTipoMembresia, actualizarTipoMembresia, eliminarTipoMembresia } from '../../../../../backend/membresias';
import { subirImagenMembresia } from '../../../../../backend/almacenamiento';

export function useListaMembresias() {
  const [membresias, setMembresias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  const obtenerUrlImagen = (ruta) => {
    if (!ruta) return null;
    if (typeof ruta === 'string' && ruta.startsWith('http')) return ruta;
    return ruta;
  };

  const cargar = useCallback(async () => {
    try {
      setCargando(true);
      setError(null);
      const resultado = await listarTiposMembresia();
      if (resultado.success) {
        setMembresias(resultado.data || []);
      } else {
        setError(resultado.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar, tick]);

  const recargar = useCallback(() => setTick(t => t + 1), []);

  const crear = async (datos, archivo) => {
    try {
      const resultadoCrear = await crearTipoMembresia(datos);
      if (!resultadoCrear.success) throw new Error(resultadoCrear.error);

      let urlImagen = null;
      if (archivo) {
        const subida = await subirImagenMembresia(archivo, resultadoCrear.id);
        if (subida.success) {
          urlImagen = subida.url;
          await actualizarTipoMembresia(resultadoCrear.id, { image: urlImagen });
        }
      }

      recargar();
      return { success: true, id: resultadoCrear.id, image: urlImagen };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const actualizar = async (id, datos, archivo) => {
    try {
      let urlImagen = null;
      if (archivo) {
        const subida = await subirImagenMembresia(archivo, id);
        if (subida.success) urlImagen = subida.url;
      }

      const datosFinales = urlImagen ? { ...datos, image: urlImagen } : datos;
      const resultado = await actualizarTipoMembresia(id, datosFinales);
      if (!resultado.success) throw new Error(resultado.error);

      recargar();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const eliminar = async (id) => {
    try {
      const resultado = await eliminarTipoMembresia(id);
      if (!resultado.success) throw new Error(resultado.error);
      recargar();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return {
    membresias,
    cargando,
    error,
    obtenerUrlImagen,
    crear,
    actualizar,
    eliminar,
    recargar,
  };
}