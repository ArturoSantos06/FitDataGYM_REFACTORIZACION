import ControlesEjercicioRutina from './ControlesEjercicioRutina';
import EtiquetasEjercicioRutina from './EtiquetasEjercicioRutina';

function TarjetaEjercicioRutina({
  ejercicio,
  diaActivo,
  diasActivos,
  inputSm: claseEntrada,
  traduccionesEtiquetas: traducciones,
  convertirEtiqueta: traducirEtiqueta,
  onEliminar: alEliminar,
  onActualizar: alActualizar,
  onMover: alMover,
}) {
  return (
    <div className="flex gap-3 bg-slate-950 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors">
      {ejercicio.gifUrl ? (
        <img src={ejercicio.gifUrl} alt={ejercicio.titulo} className="w-16 h-16 rounded-lg object-cover bg-slate-900 shrink-0" loading="lazy" />
      ) : (
        <div className="w-16 h-16 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-2xl select-none">🏋️</div>
      )}

      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-white text-sm capitalize truncate">{ejercicio.titulo}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              <EtiquetasEjercicioRutina ejercicio={ejercicio} traducciones={traducciones} traducirEtiqueta={traducirEtiqueta} />
            </div>
          </div>

            <ControlesEjercicioRutina ejercicio={ejercicio} diaActivo={diaActivo} diasActivos={diasActivos}
              alMover={alMover} alEliminar={alEliminar} />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <input type="number" min="1" step="1" inputMode="numeric" placeholder="Series" value={ejercicio.series} onChange={(evento) => alActualizar(diaActivo, ejercicio.id, 'series', evento.target.value)} className={claseEntrada} />
          <input type="number" min="1" step="1" inputMode="numeric" placeholder="Reps" value={ejercicio.repeticiones} onChange={(evento) => alActualizar(diaActivo, ejercicio.id, 'repeticiones', evento.target.value)} className={claseEntrada} />
          <input type="number" min="1" step="1" inputMode="numeric" placeholder="Descanso" value={ejercicio.descanso} onChange={(evento) => alActualizar(diaActivo, ejercicio.id, 'descanso', evento.target.value)} className={claseEntrada} />
        </div>
      </div>
    </div>
  );
}

export default TarjetaEjercicioRutina;
