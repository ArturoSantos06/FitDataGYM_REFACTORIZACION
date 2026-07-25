import { ArrowLeft } from 'lucide-react';
import FormularioSalud from './FormularioSalud';

export default function SeccionSalud({ onBack }) {
  return <section className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-300"><div className="bg-slate-900 border border-slate-800 rounded-t-2xl p-4 flex items-center gap-4"><button type="button" onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white font-medium px-2 py-1"><ArrowLeft size={20} />Volver al Perfil</button><span className="text-slate-500">|</span><span className="text-slate-300 font-medium">Actualización de Ficha</span></div><div className="bg-slate-950 border-x border-b border-slate-800 rounded-b-2xl overflow-hidden"><FormularioSalud /></div></section>;
}
