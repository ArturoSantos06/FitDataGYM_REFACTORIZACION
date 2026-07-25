function EtiquetasEjercicioRutina({ ejercicio, traducciones, traducirEtiqueta }) {
  return <div className="flex flex-wrap gap-1 mt-1">
    {ejercicio.movementPattern && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-950 border border-blue-800 text-blue-300 capitalize">
      {traducirEtiqueta(traducciones, ejercicio.movementPattern)}
    </span>}
    {ejercicio.primaryMuscle && <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 capitalize">
      💪 {traducirEtiqueta(traducciones, ejercicio.primaryMuscle)}
    </span>}
    {ejercicio.tags?.[0] && <span className="text-xs px-2 py-0.5 rounded-full bg-amber-950 border border-amber-800 text-amber-300 capitalize">
      🏋️ {traducirEtiqueta(traducciones, ejercicio.tags[0])}
    </span>}
  </div>;
}

export default EtiquetasEjercicioRutina;
