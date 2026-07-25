import { memo } from 'react';

function BarraBusquedaVentas({ filtro, onCambioFiltro }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-cyan-400">Historial de Ventas</h2>

      <div className="relative w-full md:w-1/3">
        <input
          type="text"
          placeholder="Buscar por folio, nombre o producto..."
          className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg py-2 px-4 pl-10 focus:outline-none focus:border-cyan-500 transition-colors"
          value={filtro}
          onChange={onCambioFiltro}
        />
        <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
      </div>
    </div>
  );
}

export default memo(BarraBusquedaVentas);
