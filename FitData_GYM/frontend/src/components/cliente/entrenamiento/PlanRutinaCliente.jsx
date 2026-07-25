import { CalendarDays, Dumbbell } from 'lucide-react';
import TarjetaEjercicioCliente from './TarjetaEjercicioCliente';

function PlanRutinaCliente({ diasConEjercicios, diaActivo, diaActivoDatos, establecerDiaActivo, pasos }) {
  if (diasConEjercicios.length === 0 && pasos.length === 0) return null;
  if (diasConEjercicios.length === 0) return <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"><EncabezadoPlan icono={Dumbbell} texto="Ejercicios" cantidad={pasos.length} /><div className="p-4 md:p-5 space-y-3">{pasos.map((paso, indice) => <TarjetaEjercicioCliente key={paso.id || `${indice}-${paso.titulo || 'paso'}`} ejercicio={paso} indice={indice} />)}</div></div>;

  return <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"><div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 overflow-x-auto"><CalendarDays size={16} className="text-blue-400 shrink-0" /><div className="flex gap-1.5">{diasConEjercicios.map((dia) => <button key={dia.name} type="button" onClick={() => establecerDiaActivo(dia.name)} className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${diaActivo === dia.name ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'}`}>{dia.name}<span className={`ml-1.5 text-[10px] ${diaActivo === dia.name ? 'text-blue-200' : 'text-slate-500'}`}>{dia.exercises.length}</span></button>)}</div></div><div className="p-4 md:p-5 space-y-3">{diaActivoDatos?.exercises.map((ejercicio, indice) => <TarjetaEjercicioCliente key={ejercicio.id || `${indice}-${ejercicio.titulo || 'ejercicio'}`} ejercicio={ejercicio} indice={indice} />)}</div></div>;
}

function EncabezadoPlan({ icono: Icono, texto, cantidad }) {
  return <div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800"><Icono size={18} className="text-blue-400" /><span className="font-bold text-white text-base">{texto}</span><span className="ml-auto text-xs text-slate-500 bg-slate-800 rounded-full px-2.5 py-0.5">{cantidad} {cantidad === 1 ? 'ejercicio' : 'ejercicios'}</span></div>;
}

export default PlanRutinaCliente;
