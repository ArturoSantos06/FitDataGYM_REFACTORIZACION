import { memo } from 'react';
import FilaAsistenciaVista from './FilaAsistenciaVista';

function PanelAsistenciasVista({
  asistencias,
  searchTerm,
  onCambioSearchTerm,
  dateFilter,
  onCambioDateFilter,
  onLimpiarFiltros,
}) {
  return (
    <div className="lg:col-span-2 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 shadow-xl shadow-blue-500/10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span className="text-2xl">📋</span> Asistencias Recientes
          <span className="bg-blue-600 px-3 py-1 rounded-full text-sm">{asistencias.length}</span>
        </h2>

        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre..."
            value={searchTerm}
            onChange={onCambioSearchTerm}
            className="bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-blue-400 focus:outline-none text-sm min-w-[200px]"
          />

          <input
            type="date"
            value={dateFilter}
            onChange={onCambioDateFilter}
            className="bg-slate-700/50 text-white px-3 py-2 rounded-lg border border-slate-600 focus:border-blue-400 focus:outline-none text-sm"
          />

          {(searchTerm || dateFilter) && (
            <button
              onClick={onLimpiarFiltros}
              className="bg-red-600/80 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
        {asistencias.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-3">📭</div>
            <p className="text-slate-400">
              {searchTerm || dateFilter
                ? 'No se encontraron asistencias con estos filtros'
                : 'No hay asistencias registradas'}
            </p>
          </div>
        ) : (
          asistencias.map((asistencia) => <FilaAsistenciaVista key={asistencia.id} asistencia={asistencia} />)
        )}
      </div>
    </div>
  );
}

export default memo(PanelAsistenciasVista);
