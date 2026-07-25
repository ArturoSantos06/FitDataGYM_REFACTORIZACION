import { useCallback, useState } from 'react';
import {
  descargarArchivoDieta,
  eliminarArchivoDieta,
  guardarArchivoDieta,
} from '../servicios/repositorioDietas';
import {
  LIMITE_NOTAS_DIETA,
  LIMITE_TITULO_DIETA,
  validarArchivoDieta,
} from '../utils/repositorioDietas';

const MODAL_EXITO_INICIAL = { abierto: false, titulo: '', mensaje: '' };
const MODAL_ERROR_INICIAL = { abierto: false, mensaje: '' };

export default function useOperacionesArchivosDieta({
  idPacienteSeleccionado,
  pacientes,
  setArchivos,
}) {
  const [titulo, setTitulo] = useState('');
  const [notas, setNotas] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [modalExito, setModalExito] = useState(MODAL_EXITO_INICIAL);
  const [modalError, setModalError] = useState(MODAL_ERROR_INICIAL);
  const [archivoPendienteEliminar, setArchivoPendienteEliminar] = useState(null);

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
    if (!paciente || errorArchivo) {
      mostrarError(
        !paciente
          ? 'Selecciona un paciente antes de subir el archivo.'
          : errorArchivo,
      );
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
    setArchivos,
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
      setArchivos((actuales) =>
        actuales.filter((item) => item.id !== archivo.id));
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
  }, [
    archivoPendienteEliminar,
    guardando,
    mostrarError,
    setArchivos,
  ]);

  const cancelarEliminacion = useCallback(() => {
    setArchivoPendienteEliminar(null);
  }, []);

  return {
    archivoPendienteEliminar,
    archivoSeleccionado,
    cancelarEliminacion,
    cambiarArchivo,
    cerrarModalError,
    cerrarModalExito,
    confirmarEliminacion,
    descargarArchivo,
    enviarArchivo,
    guardando,
    modalError,
    modalExito,
    mostrarError,
    notas,
    setArchivoPendienteEliminar,
    setNotas,
    setTitulo,
    titulo,
  };
}
