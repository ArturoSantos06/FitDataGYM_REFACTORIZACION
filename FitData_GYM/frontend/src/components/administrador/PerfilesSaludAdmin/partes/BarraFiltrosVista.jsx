import { memo } from 'react';
import { Search, Filter } from 'lucide-react';
import SelectSiNo from './SelectSiNo';

function BarraFiltrosVista({
  searchTerm,
  onCambioSearchTerm,
  showFilters,
  onToggleFilters,
  filters,
  onCambioFiltros,
  onResetFilters,
  activeFiltersCount,
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-4 mb-6">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Buscar por nombre, ID, usuario o correo..."
              value={searchTerm}
              onChange={onCambioSearchTerm}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all"
            />
          </div>
        </div>

        <div className="col-span-12">
          <button
            onClick={onToggleFilters}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-white font-medium text-sm transition-all"
          >
            <Filter className="w-4 h-4" />
            Filtros avanzados
            {activeFiltersCount > 0 && (
              <span className="ml-2 px-2 py-0.5 bg-blue-600 rounded-full text-xs font-bold">{activeFiltersCount}</span>
            )}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-6">
              <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase">Edad</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="Mín"
                  value={filters.ageMin}
                  onChange={(e) => onCambioFiltros({ ...filters, ageMin: e.target.value })}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Máx"
                  value={filters.ageMax}
                  onChange={(e) => onCambioFiltros({ ...filters, ageMax: e.target.value })}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <SelectSiNo
              etiqueta="Condición del Corazón"
              value={filters.heart_condition}
              onChange={(v) => onCambioFiltros({ ...filters, heart_condition: v })}
            />
            <SelectSiNo
              etiqueta="Presión Alta"
              value={filters.high_blood_pressure}
              onChange={(v) => onCambioFiltros({ ...filters, high_blood_pressure: v })}
            />
            <SelectSiNo
              etiqueta="Lesiones Recientes"
              value={filters.recent_injuries}
              onChange={(v) => onCambioFiltros({ ...filters, recent_injuries: v })}
            />
            <SelectSiNo
              etiqueta="Medicamentos"
              value={filters.medications}
              onChange={(v) => onCambioFiltros({ ...filters, medications: v })}
            />

            <div className="col-span-12 flex gap-2">
              <button
                onClick={onResetFilters}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-white font-medium text-sm transition-all"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(BarraFiltrosVista);
