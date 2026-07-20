/** Obtiene la cantidad de ejercicios de una pestaña de día */
export function usePestanaDiasRutina(ejerciciosPorDia, dia) {
  const cantidad = ejerciciosPorDia[dia]?.length || 0;
  const tieneEjercicios = cantidad > 0;
  return { cantidad, tieneEjercicios };
}