/** Encapsula la lógica del catálogo de ejercicios para la rutina */
export function useCatalogoEjerciciosRutina(
  diaActivo,
  partesDeCuerpo,
  parteDelCuerpoCatalogo,
  estaCargandoCatalogo,
  ejerciciosCatalogo,
  alObtenerCatalogo,
  alAgregarEjercicio
) {
  const diaActivoLocal = diaActivo || 'día';
  const partesDelCuerpo = Array.isArray(partesDeCuerpo) ? partesDeCuerpo : [];
  const parteCuerpoSeleccionada = parteDelCuerpoCatalogo || '';
  const cargandoCatalogo = Boolean(estaCargandoCatalogo);
  const ejercicios = Array.isArray(ejerciciosCatalogo) ? ejerciciosCatalogo : [];
  const seleccionarParte = typeof alObtenerCatalogo === 'function' ? alObtenerCatalogo : () => {};
  const agregarEjercicio = typeof alAgregarEjercicio === 'function' ? alAgregarEjercicio : () => {};

  return { diaActivoLocal, partesDelCuerpo, parteCuerpoSeleccionada, cargandoCatalogo, ejercicios, seleccionarParte, agregarEjercicio };
}