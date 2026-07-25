import { Users } from 'lucide-react';
import SelectorPeriodo from './SelectorPeriodo';
import { formatearMoneda } from './utilidadesEntrenadoresYPagos';

function TablaEntrenadoresActivos({
  entrenadores,
  filtroMes,
  setFiltroMes,
  filtroAnio,
  setFiltroAnio,
  anios,
  obtenerIngresoMensualFiltrado,
  onPagarEntrenador,
  onDesactivarEntrenador,
  idEntrenadorDesactivando,
}) {
  return (
    <section className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Users size={24} className="text-purple-400" />
          Entrenadores Contratados ({entrenadores.length})
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              {['Entrenador', 'Especialidad', 'Clientes Asignados', 'Contratos Activos', 'Tipo de Contrato'].map((heading) => <th key={heading} className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">{heading}</th>)}
              <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">
                <div className="flex flex-col gap-2"><span>Ingresos Mensuales</span><SelectorPeriodo mes={filtroMes} anio={filtroAnio} onMesChange={setFiltroMes} onAnioChange={setFiltroAnio} anios={anios} compact /></div>
              </th>
              <th className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {entrenadores.length === 0 ? <tr><td colSpan={7} className="text-center py-12 text-gray-400">No hay entrenadores registrados</td></tr> : entrenadores.map((trainer) => {
              const isDeactivating = idEntrenadorDesactivando === trainer.id;
              const activeContracts = Number(trainer.activeContracts) || 0;
              return (
                <tr key={trainer.id} className="hover:bg-gray-700/30 transition-colors">
                  <td className="py-4 px-6"><p className="text-white font-semibold">{trainer.name || 'Entrenador'}</p>{trainer.email && <p className="text-gray-400 text-xs">{trainer.email}</p>}</td>
                  <td className="py-4 px-6 text-purple-300 text-sm">{trainer.specialty || 'N/D'}</td>
                  <td className="py-4 px-6"><span className="text-2xl font-bold text-blue-400">{Number(trainer.clientsCount) || 0}</span></td>
                  <td className="py-4 px-6"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${activeContracts > 0 ? 'bg-green-900/50 text-green-300 border border-green-600' : 'bg-gray-700 text-gray-400'}`}>{activeContracts} activos</span></td>
                  <td className="py-4 px-6 text-yellow-300 text-sm font-medium">{trainer.contractType || 'N/D'}</td>
                  <td className="py-4 px-6 text-green-400 font-bold text-lg">{formatearMoneda(obtenerIngresoMensualFiltrado(trainer, filtroMes, filtroAnio))}</td>
                  <td className="py-4 px-6"><div className="flex gap-2"><button type="button" onClick={() => onPagarEntrenador(trainer)} className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-green-600 hover:bg-green-700 text-white">💵 Pagar</button><button type="button" onClick={() => onDesactivarEntrenador(trainer)} disabled={isDeactivating} className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed">{isDeactivating ? '⏳' : '⛔ Descontratar'}</button></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TablaEntrenadoresActivos;
