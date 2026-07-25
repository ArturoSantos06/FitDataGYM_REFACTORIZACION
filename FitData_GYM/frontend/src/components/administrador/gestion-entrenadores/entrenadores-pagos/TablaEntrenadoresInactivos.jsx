import { AlertCircle } from 'lucide-react';

function TablaEntrenadoresInactivos({ entrenadores, onReactivarEntrenador, idEntrenadorReactivando }) {
  return (
    <section className="bg-gray-800/40 rounded-xl border border-gray-700 shadow-xl overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-700"><h2 className="text-xl font-bold text-white flex items-center gap-2"><AlertCircle size={22} className="text-yellow-400" />Entrenadores Inactivos ({entrenadores.length})</h2></div>
      <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-900/80"><tr>{['Entrenador', 'Especialidad', 'Tipo de Contrato', 'Acción'].map((heading) => <th key={heading} className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">{heading}</th>)}</tr></thead><tbody className="divide-y divide-gray-700">
        {entrenadores.length === 0 ? <tr><td colSpan={4} className="text-center py-8 text-gray-400">No hay entrenadores inactivos.</td></tr> : entrenadores.map((trainer) => { const isReactivating = idEntrenadorReactivando === trainer.id; return <tr key={`inactive_${trainer.id}`} className="hover:bg-gray-700/20 transition-colors"><td className="py-4 px-6"><p className="text-white font-semibold">{trainer.name || 'Entrenador'}</p>{trainer.email && <p className="text-gray-400 text-xs">{trainer.email}</p>}</td><td className="py-4 px-6 text-purple-300 text-sm">{trainer.specialty || 'N/D'}</td><td className="py-4 px-6 text-yellow-300 text-sm font-medium">{trainer.contractType || 'N/D'}</td><td className="py-4 px-6"><button type="button" onClick={() => onReactivarEntrenador(trainer)} disabled={isReactivating} className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed">{isReactivating ? '⏳' : '✅ Recontratar'}</button></td></tr>; })}
      </tbody></table></div>
    </section>
  );
}

export default TablaEntrenadoresInactivos;
