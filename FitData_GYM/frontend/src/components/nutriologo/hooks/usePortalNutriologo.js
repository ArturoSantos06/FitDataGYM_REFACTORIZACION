import { useCallback, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cerrarSesionNutriologo } from '../servicios/sesionNutriologo';

export default function usePortalNutriologo() {
  const [pestanaActiva, setPestanaActiva] = useState('inicio');
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const cierreEnCurso = useRef(false);
  const navegar = useNavigate();

  const cambiarPestana = useCallback((nuevaPestana) => {
    setPestanaActiva(nuevaPestana);
  }, []);

  const cerrarSesion = useCallback(async () => {
    if (cierreEnCurso.current) return;

    cierreEnCurso.current = true;
    setCerrandoSesion(true);
    try {
      await cerrarSesionNutriologo();
    } finally {
      navegar('/nutriologo/login');
    }
  }, [navegar]);

  return {
    pestanaActiva,
    cambiarPestana,
    cerrarSesion,
    cerrandoSesion,
  };
}
