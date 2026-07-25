import { Clock, IterationCcw, Layers } from 'lucide-react';
import { contieneTextoIngles, traducirMusculo, traducirTextoEjercicio } from '../../../backend/utilidadesRutinaCliente';

function InsigniaEjercicio({ icono: Icono, etiqueta, valor, color }) {
  const colores = { blue: 'bg-blue-500/15 border-blue-500/30 text-blue-300', violet: 'bg-violet-500/15 border-violet-500/30 text-violet-300', emerald: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' };
  return <div className={`inline-flex flex-col items-center gap-1 rounded-xl border px-4 py-2 min-w-20 ${colores[color] || colores.blue}`}><Icono size={14} /><span className="font-bold text-base leading-none">{valor || '—'}</span><span className="text-[10px] uppercase tracking-wide opacity-70">{etiqueta}</span></div>;
}

function TarjetaEjercicioCliente({ ejercicio, indice }) {
  const colores = ['from-blue-600 to-cyan-500', 'from-violet-600 to-purple-500', 'from-emerald-600 to-teal-500', 'from-orange-500 to-amber-400', 'from-pink-600 to-rose-500', 'from-sky-600 to-blue-400'];
  const musculo = traducirMusculo(ejercicio.primaryMuscle);
  const tituloTraducido = traducirTextoEjercicio(ejercicio.titulo || '');
  const descripcionTraducida = traducirTextoEjercicio(ejercicio.descripcion || '');
  const titulo = contieneTextoIngles(tituloTraducido) ? `Ejercicio de ${musculo || 'entrenamiento'}` : tituloTraducido || 'Ejercicio sin nombre';
  const descripcion = descripcionTraducida && !contieneTextoIngles(descripcionTraducida)
    ? descripcionTraducida : `${musculo ? `Enfoque principal: ${musculo}. ` : ''}Mantén una postura estable, ejecuta el movimiento de forma controlada y cuida la respiración durante cada repetición.`;

  return <div className="flex gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-4 hover:border-slate-700 transition-colors">
    {ejercicio.gifUrl ? <img src={ejercicio.gifUrl} alt={titulo} loading="lazy" className="shrink-0 w-16 h-16 rounded-xl object-cover bg-slate-800" />
      : <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br ${colores[indice % colores.length]} text-white font-bold text-sm shadow-lg`}>{indice + 1}</div>}
    <div className="flex-1 min-w-0 space-y-2"><div className="flex items-start justify-between gap-2"><h3 className="font-bold text-white text-sm leading-tight">{titulo}</h3>{musculo && <span className="shrink-0 text-[10px] bg-blue-500/15 text-blue-300 border border-blue-500/30 rounded-full px-2 py-0.5">{musculo}</span>}</div>
      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{descripcion}</p><div className="flex flex-wrap gap-1.5 pt-0.5">
        {ejercicio.series && <InsigniaEjercicio icono={Layers} etiqueta="Series" valor={ejercicio.series} color="blue" />}
        {ejercicio.repeticiones && <InsigniaEjercicio icono={IterationCcw} etiqueta="Repeticiones" valor={ejercicio.repeticiones} color="violet" />}
        {ejercicio.descanso && <InsigniaEjercicio icono={Clock} etiqueta="Descanso" valor={ejercicio.descanso} color="emerald" />}
      </div></div>
  </div>;
}

export default TarjetaEjercicioCliente;
