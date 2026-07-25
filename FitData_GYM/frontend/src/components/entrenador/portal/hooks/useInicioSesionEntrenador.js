import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getUser as obtenerUsuario,
  getUserByEmail as obtenerUsuarioPorCorreo,
  loginUser as iniciarSesionFirebase,
  logoutUser as cerrarSesionFirebase,
} from '../../../../firebase';

const CLAVES_SESION = ['trainer_token', 'trainer_username'];

const limpiarSesionEntrenador = () => {
  CLAVES_SESION.forEach((clave) => localStorage.removeItem(clave));
};

const obtenerMensajeError = (error) => {
  const mensaje = String(error?.message || '');
  const credencialesInvalidas = [
    'auth/invalid-credential',
    'auth/invalid-login-credentials',
    'auth/user-not-found',
    'auth/wrong-password',
  ].some((codigo) => mensaje.includes(codigo));

  if (credencialesInvalidas) return 'Correo o contraseña incorrecta';
  if (mensaje.includes('auth/invalid-email')) return 'Correo electrónico inválido';
  return mensaje || 'No se pudo iniciar sesión';
};

const obtenerRolEntrenador = async (usuario) => {
  const usuarioPorUid = await obtenerUsuario(usuario.uid);
  const rolPorUid = usuarioPorUid.success ? usuarioPorUid.data?.role : null;
  if (rolPorUid) return rolPorUid;

  const usuarioPorCorreo = await obtenerUsuarioPorCorreo(usuario.email || '');
  return usuarioPorCorreo.success ? usuarioPorCorreo.data?.role : null;
};

function useInicioSesionEntrenador() {
  const navegar = useNavigate();
  const [correo, establecerCorreo] = useState('');
  const [contrasena, establecerContrasena] = useState('');
  const [mostrarContrasena, establecerMostrarContrasena] = useState(false);
  const [error, establecerError] = useState('');
  const [cargando, establecerCargando] = useState(false);

  useEffect(() => limpiarSesionEntrenador(), []);

  const iniciarSesion = useCallback(async (evento) => {
    evento.preventDefault();
    establecerError('');
    establecerCargando(true);

    try {
      const resultado = await iniciarSesionFirebase(correo, contrasena);
      if (!resultado.success) throw new Error(resultado.error || 'Credenciales inválidas');

      const rol = String(await obtenerRolEntrenador(resultado.user) || '').toLowerCase();
      if (!['trainer', 'entrenador'].includes(rol)) {
        await cerrarSesionFirebase();
        throw new Error('Tu cuenta no tiene permisos de entrenador');
      }

      const token = await resultado.user.getIdToken();
      localStorage.setItem('trainer_token', token);
      localStorage.setItem('trainer_username', resultado.user.email || correo);
      navegar('/entrenador');
    } catch (errorInicioSesion) {
      limpiarSesionEntrenador();
      establecerError(obtenerMensajeError(errorInicioSesion));
    } finally {
      establecerCargando(false);
    }
  }, [contrasena, correo, navegar]);

  return {
    correo, establecerCorreo, contrasena, establecerContrasena,
    mostrarContrasena, establecerMostrarContrasena, error, cargando, iniciarSesion,
  };
}

export default useInicioSesionEntrenador;
