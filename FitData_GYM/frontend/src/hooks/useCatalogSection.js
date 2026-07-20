/** Encapsula la lógica del catálogo de ejercicios */
export function useCatalogoSeccion(parteDelCuerpo, estaCargandoCatalogo, ejerciciosDelCatalogo, alObtenerCatalogo, alAgregarEjercicio) {
  const parteCuerpoSeleccionada = parteDelCuerpo || '';
  const cargandoCatalogo = Boolean(estaCargandoCatalogo);
  const ejercicios = Array.isArray(ejerciciosDelCatalogo) ? ejerciciosDelCatalogo : [];
  const seleccionarParte = typeof alObtenerCatalogo === 'function' ? alObtenerCatalogo : () => {};
  const agregarEjercicio = typeof alAgregarEjercicio === 'function' ? alAgregarEjercicio : () => {};

  return { parteCuerpoSeleccionada, cargandoCatalogo, ejercicios, seleccionarParte, agregarEjercicio };
}