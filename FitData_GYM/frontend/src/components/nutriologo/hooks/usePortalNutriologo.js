import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../../firebase';

export default function usePortalNutriologo() {
  const [pestanaActiva, setPestanaActiva] = useState('inicio');
  const [cerrandoSesion, setCerrandoSesion] = useState(false);
  const navegar = useNavigate();

  const cambiarPestana = useCallback((nuevaPestana) => {
    setPestanaActiva(nuevaPestana);
  }, []);

  const cerrarSesion = useCallback(async () => {
    if (cerrandoSesion) return;

    setCerrandoSesion(true);
    try {
      await logoutUser();
    } catch {
      // La sesión local se limpia incluso si Firebase ya no responde.
    } finally {
      localStorage.removeItem('nutritionist_token');
      localStorage.removeItem('nutritionist_username');
      navegar('/nutriologo/login');
    }
  }, [cerrandoSesion, navegar]);

  return {
    pestanaActiva,
    cambiarPestana,
    cerrarSesion,
    cerrandoSesion,
  };
}
