import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ensureUserClaim as asegurarReclamoUsuario,
  getAllMembers as obtenerTodosAlumnos,
  logoutUser as cerrarSesionFirebase,
} from '../firebase';

const limpiarSesionEntrenador = () => {
  localStorage.removeItem('trainer_token');
  localStorage.removeItem('trainer_username');
};

function usarVistaEntrenador() {
  const navegar = useNavigate();
  const [textoBusqueda, establecerTextoBusqueda] = useState('');
  const [alumnos, establecerAlumnos] = useState([]);
  const [cargando, establecerCargando] = useState(true);
  const [error, establecerError] = useState('');

  useEffect(() => {
    let desmontado = false;
    const cargarAlumnos = async () => {
      try {
        establecerCargando(true);
        establecerError('');
        await asegurarReclamoUsuario();
        const resultado = await obtenerTodosAlumnos();
        if (!resultado.success) throw new Error(resultado.error || 'No se pudo cargar la lista de alumnos asignados');
        if (!desmontado) establecerAlumnos(Array.isArray(resultado.data) ? resultado.data : []);
      } catch (errorCarga) {
        if (!desmontado) establecerError(errorCarga.message || 'Error al cargar alumnos');
      } finally {
        if (!desmontado) establecerCargando(false);
      }
    };
    cargarAlumnos();
    return () => { desmontado = true; };
  }, []);

  const alumnosFiltrados = useMemo(() => {
    const busqueda = textoBusqueda.trim().toLowerCase();
    return alumnos.filter((alumno) => {
      const matricula = String(alumno.matricula || alumno.id || '').toLowerCase();
      const nombreCompleto = `${alumno.nombre || ''} ${alumno.apellido || ''}`.trim().toLowerCase();
      return !busqueda || matricula.includes(busqueda) || nombreCompleto.includes(busqueda);
    });
  }, [alumnos, textoBusqueda]);

  const volverInicio = useCallback(() => navegar('/'), [navegar]);
  const abrirCitas = useCallback(() => navegar('/entrenador/citas'), [navegar]);
  const abrirBitacora = useCallback(() => navegar('/entrenador/bitacora'), [navegar]);
  const abrirRutina = useCallback((alumno) => navegar(`/entrenador/rutina/${alumno.id}`, { state: { member: alumno } }), [navegar]);
  const cerrarSesion = useCallback(async () => {
    try {
      await cerrarSesionFirebase();
    } finally {
      limpiarSesionEntrenador();
      navegar('/entrenador/login');
    }
  }, [navegar]);

  return {
    textoBusqueda, establecerTextoBusqueda, alumnosFiltrados, cargando, error,
    volverInicio, abrirCitas, abrirBitacora, abrirRutina, cerrarSesion,
  };
}

export default usarVistaEntrenador;
