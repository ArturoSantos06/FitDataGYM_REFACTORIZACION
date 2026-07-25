import { traducirEtiqueta } from '../../../../backend/utilidadesRutinaEntrenador';

function TarjetaEjercicioSeccionCatalogo({ ejercicio, traduccionesEtiquetas, alAgregar }) {
  return <button type="button" onClick={() => alAgregar(ejercicio)}
    className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/20 transition-all text-left group">
    {ejercicio.gifUrl ? <img src={ejercicio.gifUrl} alt={ejercicio.name}
      className="w-full h-28 object-cover bg-slate-900 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      : <div className="w-full h-28 bg-slate-800 flex items-center justify-center text-4xl">🏋️</div>}
    <div className="p-2.5 flex flex-col space-y-1.5">
      <p className="text-xs font-semibold text-white capitalize truncate group-hover:text-blue-400 transition-colors">{ejercicio.name}</p>
      <div className="flex flex-col gap-0.5">
        {ejercicio.primaryMuscle && <span className="text-xs text-emerald-400 capitalize">💪 {traducirEtiqueta(traduccionesEtiquetas, ejercicio.primaryMuscle)}</span>}
        {ejercicio.tags?.[0] && <span className="text-xs text-amber-400 capitalize">{traducirEtiqueta(traduccionesEtiquetas, ejercicio.tags[0])}</span>}
      </div>
    </div>
  </button>;
}

export default TarjetaEjercicioSeccionCatalogo;
