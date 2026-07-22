import { memo } from 'react';

function TablaMembresiasVista({ items, busqueda, orden, onActualizar }) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl mt-6 border-t-4 border-teal-500 text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-green-400">
          Estado de Membresías
        </h2>

        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto items-center">
          <select
            value={orden.valor}
            onChange={orden.onChange}
            className="w-full md:w-auto bg-slate-900 border border-slate-600 text-white rounded-lg py-2 px-4 focus:outline-none focus:border-teal-500 cursor-pointer text-sm"
          >
            <option value="recent">📅 Más Recientes</option>
            <option value="name">🔤 Alfabético (A-Z)</option>
            <option value="expiration">⚠️ Próximos a Vencer</option>
          </select>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Buscar..."
              value={busqueda.valor}
              onChange={busqueda.onChange}
              className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-teal-500 transition-colors placeholder-slate-500 text-sm"
            />
            <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
          </div>

          <button
            onClick={onActualizar}
            title="Actualizar lista"
            className="text-teal-400 hover:text-teal-300 hover:bg-slate-700 p-2 rounded-lg transition-colors border border-slate-600"
          >
            🔄
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 text-left text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 border-b border-gray-600">ID</th>
              <th className="py-3 px-6 border-b border-gray-600">Usuario</th>
              <th className="py-3 px-6 border-b border-gray-600">Email</th>
              <th className="py-3 px-6 border-b border-gray-600">Membresía</th>
              <th className="py-3 px-6 border-b border-gray-600">Inicio</th>
              <th className="py-3 px-6 border-b border-gray-600">Vencimiento</th>
              <th className="py-3 px-6 text-center border-b border-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {items.map((item) => (
              <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                <td className="py-3 px-6">
                  <span className="font-mono text-teal-400 font-semibold">{item.id}</span>
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex flex-col">
                    <span className="font-bold text-white text-sm">{item.displayUsername}</span>
                    {item.displayFullName && (
                      <span className="text-xs text-gray-400 uppercase tracking-wide">{item.displayFullName}</span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-6">
                  <span className="text-gray-300 text-sm">{item.displayEmail}</span>
                </td>
                <td className="py-3 px-6">{item.membershipTypeName || item.membershipName || 'N/A'}</td>
                <td className="py-3 px-6">{new Date(item.startDate).toLocaleDateString()}</td>
                <td className="py-3 px-6 font-mono text-slate-300">{new Date(item.endDate).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-center">
                  <span className={`py-1 px-3 rounded-full text-xs font-bold ${
                    item.activo
                      ? 'bg-green-700 text-green-100 border border-green-500'
                      : 'bg-red-700 text-red-100 border border-red-500'
                  }`}>
                    {item.activo ? 'ACTIVO' : 'VENCIDO'}
                  </span>
                </td>
              </tr>
            ))}

            {items.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500 italic">
                  {busqueda.valor ? 'No se encontraron resultados.' : 'No hay membresías asignadas.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(TablaMembresiasVista);
