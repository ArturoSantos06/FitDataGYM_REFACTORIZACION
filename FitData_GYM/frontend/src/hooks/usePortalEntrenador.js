import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../firebase/auth';

/** aqui maestro esta la logica del portal */
export function usePortalEntrenador() {
  const [pestañaActiva, setPestañaActiva] = useState('inicio');
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await logoutUser();
    } catch {
      /** pos esto funciona sin error */
    }
    localStorage.removeItem('trainer_token');
    localStorage.removeItem('trainer_username');
    navigate('/entrenador/login');
  };

  return { pestañaActiva, setPestañaActiva, cerrarSesion };
}
