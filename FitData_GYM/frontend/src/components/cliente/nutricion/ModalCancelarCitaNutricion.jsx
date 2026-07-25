import { AlertCircle } from 'lucide-react';

function ModalCancelarCitaNutricion({ abierto, alCerrar, alConfirmar }) {
  if (!abierto) return null;
  return <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in"><div className="bg-slate-800 rounded-2xl p-6 max-w-sm w-full border border-slate-700 shadow-2xl"><div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4"><AlertCircle size={32} className="text-red-500" /></div><h3 className="text-xl font-bold text-white text-center mb-2">¿Cancelar esta cita?</h3><p className="text-slate-400 text-center text-sm mb-6">Tu nutriólogo será notificado. Si cancelas, tendrás que solicitar un nuevo espacio sujeto a disponibilidad.</p><div className="flex gap-3"><button onClick={alCerrar} className="flex-1 px-4 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-colors">Volver</button><button onClick={alConfirmar} className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors shadow-lg shadow-red-900/20">Sí, Cancelar</button></div></div></div>;
}

export default ModalCancelarCitaNutricion;
