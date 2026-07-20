export function useSeccionListaEjercicios(activeDay, exercisesByDay) {
  const ejerciciosDiaActivo = exercisesByDay[activeDay] || [];
  return { ejerciciosDiaActivo };
}