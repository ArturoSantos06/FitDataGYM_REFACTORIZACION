import { useState, useCallback, useEffect } from 'react';
import { subirImagenMembresia } from '../../../../../backend/almacenamiento';

const CAMPOS_INICIALES = {
  nombre: '',
  precio: '',
  duracion: '',
};

export function useFormularioMembresia({ onGuardar, onCancelar, membresiaEditando }) {
  const [campos, setCampos] = useState(CAMPOS_INICIALES);
  const [imagen, setImagen] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const esEdicion = !!membresiaEditando?.id;

  const obtenerUrlImagen = useCallback((ruta) => {
    if (!ruta) return null;
    return ruta.startsWith('http') ? ruta : ruta;
  }, []);

  const manejarCambioCampo = useCallback((e) => {
    const { name, value } = e.target;
    setCampos(prev => ({ ...prev, [name]: value }));
  }, []);

  const manejarArchivo = useCallback((e) => {
    const archivo = e.target.files?.[0];
    if (archivo) {
      setImagen(archivo);
      setPreviewUrl(URL.createObjectURL(archivo));
    }
  }, []);

  const prepararDatos = useCallback(() => ({
    name: campos.nombre,
    price: parseFloat(campos.precio) || 0,
    duration_days: parseInt(campos.duracion, 10) || 0,
    image: null,
  }), [campos]);

  const enviar = useCallback(async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(null);

    try {
      const datos = prepararDatos();
      let idMembresia = esEdicion ? membresiaEditando.id : null;

      if (esEdicion) {
        if (imagen) {
          const subida = await subirImagenMembresia(imagen, membresiaEditando.id);
          if (subida.success) datos.image = subida.url;
        }
        const resultado = await onGuardar(idMembresia, datos);
        if (!resultado.success) throw new Error(resultado.error);
      } else {
        const resultado = await onGuardar(datos);
        if (!resultado.success) throw new Error(resultado.error);
        idMembresia = resultado.id;

        if (imagen && idMembresia) {
          const subida = await subirImagenMembresia(imagen, idMembresia);
          if (subida.success) {
            datos.image = subida.url;
            await onGuardar(idMembresia, datos);
          }
        }
      }

      onCancelar();
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  }, [prepararDatos, imagen, esEdicion, membresiaEditando, onGuardar, onCancelar]);

  const reiniciar = useCallback(() => {
    setCampos(CAMPOS_INICIALES);
    setImagen(null);
    setPreviewUrl(null);
    setError(null);
  }, []);

  useEffect(() => {
    if (membresiaEditando) {
      setCampos({
        nombre: membresiaEditando.name || '',
        precio: membresiaEditando.price?.toString() || '',
        duracion: membresiaEditando.duration_days?.toString() || '',
      });
      setPreviewUrl(obtenerUrlImagen(membresiaEditando.image));
    } else {
      reiniciar();
    }
  }, [membresiaEditando, obtenerUrlImagen, reiniciar]);

  return {
    campos,
    imagen,
    previewUrl,
    cargando,
    error,
    esEdicion,
    onCambio: manejarCambioCampo,
    onArchivo: manejarArchivo,
    onEnviar: enviar,
    onCancelar: reiniciar,
  };
}