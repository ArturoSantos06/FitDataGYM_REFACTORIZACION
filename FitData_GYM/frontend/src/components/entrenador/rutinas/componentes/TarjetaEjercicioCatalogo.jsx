import { traducirEtiqueta, traducirTextoEjercicio } from '../../../../backend/utilidadesRutinaEntrenador';

function TarjetaEjercicioCatalogo({ ejercicio, diaActivo, alAgregar }) {
  const nombreEjercicio = traducirTextoEjercicio(ejercicio.name);

  return <button type="button" onClick={() => alAgregar(ejercicio)}
    className="flex flex-col bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-blue-600 hover:shadow-lg hover:shadow-blue-900/20 transition-all text-left group">
    {ejercicio.gifUrl ? <img src={ejercicio.gifUrl} alt={nombreEjercicio}
      className="w-full h-28 object-cover bg-slate-900 group-hover:scale-105 transition-transform duration-300" loading="lazy" />
      : <div className="w-full h-28 bg-slate-800 flex items-center justify-center text-3xl">🏋️</div>}
    <div className="p-2.5">
      <p className="text-white text-xs font-semibold capitalize leading-tight line-clamp-2 group-hover:text-blue-300 transition-colors">{nombreEjercicio}</p>
      <div className="flex flex-wrap gap-1 mt-1.5">
        {ejercicio.primaryMuscle && <span className="text-xs px-1.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 capitalize">{traducirEtiqueta(ejercicio.primaryMuscle)}</span>}
        {ejercicio.tags?.[0] && <span className="text-xs px-1.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 capitalize">{traducirEtiqueta(ejercicio.tags[0])}</span>}
      </div>
      <p className="text-blue-400 text-xs mt-1.5 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">+ Agregar a {diaActivo}</p>
    </div>
  </button>;
}

export default TarjetaEjercicioCatalogo;
