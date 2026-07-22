import { memo } from 'react';
import { Loader } from 'lucide-react';

const MESES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const ANIOS = [2024, 2025, 2026, 2027];

function FiltrosReporteVista({ filterMes, onCambioMes, filterAnio, onCambioAnio, loading, onCargar }) {
  return (
    <div className="bg-blue-900/30 border border-blue-800 rounded-xl p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Mes</label>
          <select
            value={filterMes}
            onChange={onCambioMes}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            {MESES.map((m) => (
              <option key={m} value={m}>
                {new Date(2000, m - 1).toLocaleDateString('es-MX', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Año</label>
          <select
            value={filterAnio}
            onChange={onCambioAnio}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            {ANIOS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end">
          <button
            onClick={onCargar}
            disabled={loading}
            className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-4 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="animate-spin" size={20} />
                Cargando...
              </>
            ) : (
              'Cargar Reporte'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(FiltrosReporteVista);
