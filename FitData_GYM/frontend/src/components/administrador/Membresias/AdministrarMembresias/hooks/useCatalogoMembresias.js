import { useState, useEffect, useCallback } from 'react';
import { listarTiposMembresia } from '../../../backend/membresias';

export function useCatalogoMembresias() {
  const [tiposMembresia, setTiposMembresia] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [tick, setTick] = useState(0);

  const onActualizar = useCallback(() => setTick(t => t + 1), []);

  useEffect(() => {
    let activo = true;
    (async () => {
      setCargando(true);
      const resultado = await listarTiposMembresia();
      if (activo && resultado.success) {
        setTiposMembresia(resultado.data);
      }
      if (activo) setCargando(false);
    })();
    return () => { activo = false; };
  }, [tick]);

  return { tiposMembresia, cargando, recargar: onActualizar };
}