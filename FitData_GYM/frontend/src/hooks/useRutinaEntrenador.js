import { useMemo } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useGuardadoRutina from '../backend/useGuardadoRutina';
import useRutinaCargaYEdicion from '../backend/useRutinaCargaYEdicion';

/** Extrae la lógica y estado de la rutina del entrenador */
export function useRutinaEntrenador() {
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const { memberId } = useParams();

  const miembro = ubicacion.state?.member || null;
  const nombreMiembro = useMemo(() => {
    if (!miembro) return `Alumno #${memberId}`;
    return `${miembro.nombre || ''} ${miembro.apellido || ''}`.trim() || `Alumno #${memberId}`;
  }, [miembro, memberId]);

  const rutinaCarga = useRutinaCargaYEdicion(memberId);
  const guardado = useGuardadoRutina({
    miembro, memberId, nombreMiembro,
    nombreRutina: rutinaCarga.routineName,
    diasActivos: rutinaCarga.activeDays,
    ejerciciosPorDia: rutinaCarga.exercisesByDay,
    archivos: rutinaCarga.files,
    establecerArchivos: rutinaCarga.setFiles,
    establecerNombreRutina: rutinaCarga.setRoutineName,
    establecerDiasActivos: rutinaCarga.setActiveDays,
    establecerEjerciciosPorDia: rutinaCarga.setExercisesByDay,
    establecerDiaActivo: rutinaCarga.setActiveDay,
    limpiarBusqueda: rutinaCarga.clearSearch,
    cargandoRutina: rutinaCarga.isLoadingRoutine,
    establecerErroresFormulario: rutinaCarga.setFormErrors,
    limpiarMensajes: rutinaCarga.clearMessages,
    establecerMensajeExito: rutinaCarga.setFormSuccessMessage,
    establecerMensajeAdvertencia: rutinaCarga.setFormWarningMessage,
  });

  return { navegar, nombreMiembro, rutinaCarga, guardado };
}