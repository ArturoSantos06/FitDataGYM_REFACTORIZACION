import { useCallback, useEffect, useState } from 'react';
import {
  actualizarPerfilNutriologo,
  cargarPerfilNutriologo,
} from '../servicios/perfilNutriologo';

export default function usePerfilNutriologo() {
  const [vistaActual, setVistaActual] = useState('menu');
  const [usuario, setUsuario] = useState(null);
  const [codigoNutriologo, setCodigoNutriologo] = useState('---');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');

  useEffect(() => {
    let activo = true;
    cargarPerfilNutriologo()
      .then(({ perfil, codigo }) => {
        if (!activo) return;
        setUsuario(perfil);
        setCodigoNutriologo(codigo);
      })
      .catch((errorCarga) => {
        if (activo) {
          setError(errorCarga.message || 'No se pudo cargar el perfil');
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  const navegar = useCallback((vista) => setVistaActual(vista), []);
  const cerrarExito = useCallback(() => setMensajeExito(''), []);

  const manejarActualizacionUsuario = useCallback(async (datos) => {
    const perfilActualizado = await actualizarPerfilNutriologo(datos);
    setUsuario(perfilActualizado);
    setMensajeExito('¡Datos actualizados correctamente!');
    setVistaActual('menu');
  }, []);

  return {
    vistaActual,
    navegar,
    usuario,
    codigoNutriologo,
    cargando,
    error,
    mensajeExito,
    cerrarExito,
    manejarActualizacionUsuario,
  };
}
