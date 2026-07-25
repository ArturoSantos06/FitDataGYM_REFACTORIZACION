import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { iniciarSesionNutriologo } from '../servicios/sesionNutriologo';

export const useNutriSesion = (alIniciarSesion) => {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const navegar = useNavigate();

  const manejarCorreo = useCallback((evento) => {
    setCorreo(evento.target.value);
    setError('');
  }, []);
  const manejarContrasena = useCallback((evento) => {
    setContrasena(evento.target.value);
    setError('');
  }, []);
  const alternarContrasena = useCallback(() => {
    setMostrarContrasena((valor) => !valor);
  }, []);

  const manejarInicioSesion = useCallback(async (evento) => {
    evento.preventDefault();
    if (cargando) return;
    setError('');
    setCargando(true);
    try {
      await iniciarSesionNutriologo(correo, contrasena);
      if (typeof alIniciarSesion === 'function') alIniciarSesion();
      else navegar('/nutriologo', { replace: true });
    } catch (errorSesion) {
      setError(errorSesion.message || 'No se pudo iniciar sesión');
    } finally {
      setCargando(false);
    }
  }, [alIniciarSesion, cargando, contrasena, correo, navegar]);

  return {
    correo,
    contrasena,
    error,
    cargando,
    mostrarContrasena,
    manejarCorreo,
    manejarContrasena,
    alternarContrasena,
    manejarInicioSesion,
  };
};
