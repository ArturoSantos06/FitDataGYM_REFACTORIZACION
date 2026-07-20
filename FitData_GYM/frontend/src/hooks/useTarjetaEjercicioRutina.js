/** esto sirve para mover y eliminar el ejercicio de la rutina */
export function useTarjetaEjercicioRutina(diaActivo, ejercicio, onMover, onEliminar) {
  const moverEjercicio = (e) => {
    if (e.target.value) {
      onMover(diaActivo, ejercicio.id, e.target.value);
      e.target.value = '';
    }
  };

  const eliminarEjercicio = () => {
    onEliminar(diaActivo, ejercicio.id);
  };

  return { moverEjercicio, eliminarEjercicio };
}