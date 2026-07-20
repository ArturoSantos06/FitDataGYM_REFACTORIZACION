import React from 'react';
import { Plus, Search, X } from 'lucide-react';
import ElementoResultadoBuscador from '../../ElementoResultadoBuscador';

function BuscadorEjerciciosRapido({
  terminoBusqueda,
  resultados,
  buscando,
  onBuscar,
  onLimpiar,
  onAgregar,
  traduccionesEtiquetas,
  convertirEtiqueta,
}) {
  return (
    <div className="p-4 border-t border-slate-800 shrink-0">
      <div className="relative">
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 focus-within:border-blue-500 transition-colors">
          <Search size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            value={terminoBusqueda}
            onChange={(e) => onBuscar(e.target.value)}
            placeholder="Buscar ejercicio (squat, curl, press…)"
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
          />
          {buscando && <span className="text-xs text-slate-500 shrink-0">Buscando…</span>}
          {terminoBusqueda && !buscando && (
            <button type="button" onClick={onLimpiar} className="shrink-0">
              <X size={14} className="text-slate-500 hover:text-slate-300" />
            </button>
          )}
        </div>

        {resultados.length > 0 && (
          <div className="absolute z-50 bottom-full mb-1 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto">
            {resultados.map((ejercicio) => (
              <ElementoResultadoBuscador key={ejercicio.id} ejercicio={ejercicio} alAgregar={onAgregar} convertirEtiqueta={convertirEtiqueta} traduccionesEtiquetas={traduccionesEtiquetas} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuscadorEjerciciosRapido;
