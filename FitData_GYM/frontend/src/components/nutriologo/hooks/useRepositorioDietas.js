import { useCallback, useEffect, useState } from 'react';
import { consultarRepositorioDietas } from '../servicios/repositorioDietas';
import useDatosRepositorioDietas from './useDatosRepositorioDietas';
import useOperacionesArchivosDieta from './useOperacionesArchivosDieta';

export default function useRepositorioDietas() {
  const [miembros, setMiembros] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState('');
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [filtroArchivo, setFiltroArchivo] = useState('');
  const [cargando, setCargando] = useState(true);
  const [mostrarTodosRecientes, setMostrarTodosRecientes] = useState(false);
  const [rolSesion, setRolSesion] = useState('');

  const {
    archivosFiltrados,
    cantidadesArchivos,
    pacientes,
    pacientesFiltrados,
  } = useDatosRepositorioDietas({
    archivos,
    filtroArchivo,
    filtroPaciente,
    idPacienteSeleccionado,
    miembros,
    mostrarTodosRecientes,
  });
  const {
    mostrarError,
    ...operaciones
  } = useOperacionesArchivosDieta({
    idPacienteSeleccionado,
    pacientes,
    setArchivos,
  });

  useEffect(() => {
    let activo = true;
    consultarRepositorioDietas()
      .then((datos) => {
        if (!activo) return;
        setMiembros(datos.miembros);
        setArchivos(datos.archivos);
        setRolSesion(datos.rol);
      })
      .catch((fallo) => {
        if (activo) {
          mostrarError(
            fallo?.message || 'No se pudo cargar el repositorio.',
          );
        }
      })
      .finally(() => {
        if (activo) setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, [mostrarError]);

  const seleccionarPaciente = useCallback((idPaciente) => {
    const siguienteId = String(idPaciente || '');
    setIdPacienteSeleccionado((actual) =>
      String(actual) === siguienteId ? '' : siguienteId);
  }, []);

  const limpiarSeleccion = useCallback(() => {
    setIdPacienteSeleccionado('');
    setMostrarTodosRecientes(false);
    setFiltroArchivo('');
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
  }, []);

  useEffect(() => {
    const manejarTecla = (evento) => {
      if (evento.key === 'Escape') limpiarSeleccion();
    };
    window.addEventListener('keydown', manejarTecla);
    return () => window.removeEventListener('keydown', manejarTecla);
  }, [limpiarSeleccion]);

  return {
    archivos,
    archivosFiltrados,
    cantidadesArchivos,
    cargando,
    filtroArchivo,
    filtroPaciente,
    idPacienteSeleccionado,
    miembros,
    mostrarTodosRecientes,
    pacientesFiltrados,
    rolSesion,
    seleccionarPaciente,
    setFiltroArchivo,
    setFiltroPaciente,
    setMostrarTodosRecientes,
    ...operaciones,
  };
}
