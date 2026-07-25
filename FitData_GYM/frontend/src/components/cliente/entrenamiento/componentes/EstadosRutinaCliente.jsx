import { ClipboardList, RefreshCw, User } from 'lucide-react';

function EstadosRutinaCliente({ tipo }) {
  if (tipo === 'cargando') return <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-400"><RefreshCw size={28} className="animate-spin" /><p className="text-sm">Cargando tu plan de entrenamiento…</p></div>;
  if (tipo === 'sinMiembro') return <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-200 rounded-2xl p-6 max-w-2xl mx-auto text-center space-y-2"><User size={32} className="mx-auto opacity-60" /><p className="font-semibold text-lg">Perfil no encontrado</p><p className="text-slate-300 text-sm">Inicia sesión nuevamente o solicita apoyo en recepción.</p></div>;
  return <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-4"><div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto"><ClipboardList size={28} className="text-slate-500" /></div><div><p className="font-semibold text-white text-lg">Sin rutina asignada</p><p className="text-slate-400 text-sm mt-1">Tu entrenador aún no ha configurado tu plan de entrenamiento.<br />Pronto aparecerá aquí.</p></div></div>;
}

export default EstadosRutinaCliente;
