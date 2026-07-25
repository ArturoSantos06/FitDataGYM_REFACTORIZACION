import { AlertTriangle } from 'lucide-react';

function ModalCancelacionNutricion({ abierto, alCerrar, alConfirmar }) {
  if (!abierto) return null;
  return <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm"><div className="bg-gray-800 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-2xl animate-fade-in"><div className="flex items-center gap-3 text-red-400 mb-4"><AlertTriangle size={28} /><h3 className="text-xl font-bold">¿Detener Servicio?</h3></div><p className="text-gray-300 text-sm mb-6 leading-relaxed">Al confirmar, perderás el acceso a tus planes de nutrición personalizados y se cortará la comunicación con tu nutriólogo.<br /><br /><span className="text-slate-400 italic">Esta acción no puede deshacerse desde esta pantalla.</span></p><div className="flex flex-col-reverse sm:flex-row justify-end gap-3"><button onClick={alCerrar} className="px-6 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white font-semibold transition-all w-full sm:w-auto">No, regresar</button><button onClick={alConfirmar} className="px-6 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold transition-all shadow-lg shadow-red-900/50 w-full sm:w-auto">Sí, detener servicio</button></div></div></div>;
}

export default ModalCancelacionNutricion;
