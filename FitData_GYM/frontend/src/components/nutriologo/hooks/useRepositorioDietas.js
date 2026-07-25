import { useCallback, useEffect, useState } from 'react';
import {
  LIMITE_NOTAS_DIETA,
  LIMITE_TITULO_DIETA,
  validarArchivoDieta,
} from '../utils/repositorioDietas';
import {
  consultarRepositorioDietas,
  descargarArchivoDieta,
  eliminarArchivoDieta,
  guardarArchivoDieta,
} from '../servicios/repositorioDietas';
import useDatosRepositorioDietas from './useDatosRepositorioDietas';

const MODAL_EXITO_INICIAL = { abierto: false, titulo: '', mensaje: '' };
const MODAL_ERROR_INICIAL = { abierto: false, mensaje: '' };

export default function useRepositorioDietas() {
  const [miembros, setMiembros] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState('');
  const [titulo, setTitulo] = useState('');
  const [notas, setNotas] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [filtroArchivo, setFiltroArchivo] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarTodosRecientes, setMostrarTodosRecientes] = useState(false);
  const [rolSesion, setRolSesion] = useState('');
  const [modalExito, setModalExito] = useState(MODAL_EXITO_INICIAL);
  const [modalError, setModalError] = useState(MODAL_ERROR_INICIAL);
  const [archivoPendienteEliminar, setArchivoPendienteEliminar] = useState(null);

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
        if (!activo) return;
        setModalError({
          abierto: true,
          mensaje: fallo?.message || 'No se pudo cargar el repositorio.',
        });
      })
      .finally(() => {
        if (activo) setCargando(false);
      });

    return () => {
      activo = false;
    };
  }, []);

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

  const mostrarError = useCallback((mensaje) => {
    setModalError({ abierto: true, mensaje });
  }, []);

  const cerrarModalError = useCallback(() => {
    setModalError(MODAL_ERROR_INICIAL);
  }, []);
  const cerrarModalExito = useCallback(() => {
    setModalExito(MODAL_EXITO_INICIAL);
  }, []);

  const cambiarArchivo = useCallback((evento) => {
    const archivo = evento.target.files?.[0] || null;
    const errorArchivo = validarArchivoDieta(archivo);
    if (errorArchivo) {
      evento.target.value = '';
      setArchivoSeleccionado(null);
      mostrarError(errorArchivo);
      return;
    }
    setArchivoSeleccionado(archivo);
  }, [mostrarError]);

  const enviarArchivo = useCallback(async (evento) => {
    evento.preventDefault();
    if (guardando) return;

    const paciente = pacientes.find(
      (item) => String(item.id) === String(idPacienteSeleccionado),
    );
    const errorArchivo = validarArchivoDieta(archivoSeleccionado);
    if (!paciente) {
      mostrarError('Selecciona un paciente antes de subir el archivo.');
      return;
    }
    if (errorArchivo) {
      mostrarError(errorArchivo);
      return;
    }

    setGuardando(true);
    try {
      const nuevoArchivo = await guardarArchivoDieta({
        archivo: archivoSeleccionado,
        paciente,
        titulo: (
          titulo.trim() || archivoSeleccionado.name || 'archivo'
        ).slice(0, LIMITE_TITULO_DIETA),
        notas: notas.trim().slice(0, LIMITE_NOTAS_DIETA),
      });
      setArchivos((actuales) => [nuevoArchivo, ...actuales]);
      setTitulo('');
      setNotas('');
      setArchivoSeleccionado(null);
      setModalExito({
        abierto: true,
        titulo: 'Archivo guardado',
        mensaje: 'Archivo agregado correctamente al expediente del paciente.',
      });
    } catch (fallo) {
      mostrarError(fallo?.message || 'No se pudo guardar el archivo.');
    } finally {
      setGuardando(false);
    }
  }, [
    archivoSeleccionado,
    guardando,
    idPacienteSeleccionado,
    mostrarError,
    notas,
    pacientes,
    titulo,
  ]);

  const descargarArchivo = useCallback(async (archivo) => {
    try {
      const resultado = await descargarArchivoDieta(archivo);
      if (!resultado.success) {
        throw new Error(
          resultado.error || 'No se pudo descargar el archivo automáticamente.',
        );
      }
    } catch (fallo) {
      mostrarError(fallo?.message || 'No se pudo descargar el archivo.');
    }
  }, [mostrarError]);

  const confirmarEliminacion = useCallback(async () => {
    if (!archivoPendienteEliminar || guardando) return;
    const archivo = archivoPendienteEliminar;
    setGuardando(true);

    try {
      const resultado = await eliminarArchivoDieta(archivo);
      setArchivos((actuales) => actuales.filter((item) => item.id !== archivo.id));
      setArchivoPendienteEliminar(null);
      setModalExito({
        abierto: true,
        titulo: 'Archivo eliminado',
        mensaje: `Archivo eliminado correctamente.${resultado.advertencia}`,
      });
    } catch (fallo) {
      mostrarError(fallo?.message || 'No se pudo eliminar el archivo.');
    } finally {
      setGuardando(false);
    }
  }, [archivoPendienteEliminar, guardando, mostrarError]);

  const cancelarEliminacion = useCallback(() => {
    setArchivoPendienteEliminar(null);
  }, []);

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
    archivoPendienteEliminar,
    archivoSeleccionado,
    cantidadesArchivos,
    cancelarEliminacion,
    cargando,
    cerrarModalError,
    cerrarModalExito,
    confirmarEliminacion,
    descargarArchivo,
    enviarArchivo,
    filtroArchivo,
    filtroPaciente,
    guardando,
    idPacienteSeleccionado,
    miembros,
    modalError,
    modalExito,
    mostrarTodosRecientes,
    notas,
    pacientesFiltrados,
    rolSesion,
    seleccionarPaciente,
    setArchivoPendienteEliminar,
    setFiltroArchivo,
    setFiltroPaciente,
    setMostrarTodosRecientes,
    setNotas,
    setTitulo,
    titulo,
    cambiarArchivo,
  };
}
