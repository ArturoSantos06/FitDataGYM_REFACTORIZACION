import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import usarGuardadoRutinaExistente from '../backend/useGuardadoRutina';
import usarCargaRutinaExistente from '../backend/useRutinaCargaYEdicion';
import { DIAS_SEMANA, PARTES_CUERPO, TRADUCCIONES_ETIQUETAS } from '../backend/utilidadesRutinaEntrenador';

function usarRutinaEntrenador() {
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const { memberId: idAlumno } = useParams();
  const alumno = ubicacion.state?.member || null;
  const nombreAlumno = useMemo(() => {
    if (!alumno) return `Alumno #${idAlumno}`;
    return `${alumno.nombre || ''} ${alumno.apellido || ''}`.trim() || `Alumno #${idAlumno}`;
  }, [alumno, idAlumno]);

  const datosRutina = usarCargaRutinaExistente(idAlumno);
  const {
    routineName: nombreRutina, setRoutineName: establecerNombreRutina,
    activeDays: diasActivos, setActiveDays: establecerDiasActivos,
    exercisesByDay: ejerciciosPorDia, setExercisesByDay: establecerEjerciciosPorDia,
    activeDay: diaActivo, setActiveDay: establecerDiaActivo,
    searchQuery: consultaBusqueda, searchResults: resultadosBusqueda, isSearching: buscando,
    catalogBodyPart: parteCuerpoCatalogo, catalogExercises: ejerciciosCatalogo,
    isCatalogLoading: cargandoCatalogo, files: archivos, setFiles: establecerArchivos,
    isLoadingRoutine: cargandoRutina, formErrors: erroresFormulario,
    setFormErrors: establecerErroresFormulario, formSuccessMessage: mensajeExito,
    setFormSuccessMessage: establecerMensajeExito, formWarningMessage: mensajeAdvertencia,
    setFormWarningMessage: establecerMensajeAdvertencia, clearMessages: limpiarMensajes,
    toggleDay: alternarDia, handleSearch: buscarEjercicios, clearSearch: limpiarBusqueda,
    addExercise: agregarEjercicio, removeExercise: eliminarEjercicio,
    updateExercise: actualizarEjercicio, moveExercise: moverEjercicio,
    fetchCatalog: cargarCatalogo, handleFileChange: cambiarArchivos,
  } = datosRutina;

  const accionesGuardado = usarGuardadoRutinaExistente({
    member: alumno, memberId: idAlumno, memberName: nombreAlumno, routineName: nombreRutina,
    activeDays: diasActivos, exercisesByDay: ejerciciosPorDia, files: archivos,
    setFiles: establecerArchivos, setRoutineName: establecerNombreRutina,
    setActiveDays: establecerDiasActivos, setExercisesByDay: establecerEjerciciosPorDia,
    setActiveDay: establecerDiaActivo, clearSearch: limpiarBusqueda,
    isLoadingRoutine: cargandoRutina, setFormErrors: establecerErroresFormulario,
    clearMessages: limpiarMensajes, setFormSuccessMessage: establecerMensajeExito,
    setFormWarningMessage: establecerMensajeAdvertencia,
  });

  const cambiarNombreRutina = (evento) => {
    establecerNombreRutina(evento.target.value);
    establecerErroresFormulario((anteriores) => ({ ...anteriores, routineName: '', save: '' }));
    establecerMensajeExito('');
  };
  const quitarArchivo = (indice) => establecerArchivos((anteriores) => anteriores.filter((_, posicion) => posicion !== indice));

  return {
    nombreAlumno, nombreRutina, archivos, erroresFormulario, mensajeExito, mensajeAdvertencia,
    cargandoRutina, diasSemana: DIAS_SEMANA, diasActivos, alternarDia, diaActivo, establecerDiaActivo,
    ejerciciosPorDia, consultaBusqueda, resultadosBusqueda, buscando, eliminarEjercicio,
    actualizarEjercicio, moverEjercicio, buscarEjercicios, limpiarBusqueda, agregarEjercicio,
    traduccionesEtiquetas: TRADUCCIONES_ETIQUETAS, partesCuerpo: PARTES_CUERPO,
    parteCuerpoCatalogo, ejerciciosCatalogo, cargandoCatalogo, cargarCatalogo, cambiarArchivos,
    cambiarNombreRutina, quitarArchivo, guardando: accionesGuardado.isSaving,
    eliminando: accionesGuardado.isDeleting, guardarRutina: accionesGuardado.handleSubmit,
    eliminarRutina: accionesGuardado.handleDeleteRoutine, volverAlPortal: () => navegar('/entrenador'),
  };
}

export default usarRutinaEntrenador;
