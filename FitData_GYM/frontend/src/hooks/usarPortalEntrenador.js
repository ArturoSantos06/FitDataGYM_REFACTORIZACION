import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser as cerrarSesionFirebase } from '../firebase';

const limpiarSesionEntrenador = () => {
  localStorage.removeItem('trainer_token');
  localStorage.removeItem('trainer_username');
};

function usarPortalEntrenador() {
  const navegar = useNavigate();
  const [pestañaActiva, establecerPestañaActiva] = useState('inicio');

  const cambiarPestaña = useCallback((pestaña) => {
    establecerPestañaActiva(pestaña);
  }, []);

  const cerrarSesion = useCallback(async () => {
    try {
      await cerrarSesionFirebase();
    } finally {
      limpiarSesionEntrenador();
      navegar('/entrenador/login');
    }
  }, [navegar]);

  return { pestañaActiva, cambiarPestaña, cerrarSesion };
}

export default usarPortalEntrenador;
