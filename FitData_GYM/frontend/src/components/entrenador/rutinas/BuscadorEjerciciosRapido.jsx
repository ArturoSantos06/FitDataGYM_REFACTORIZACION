import { Search, X } from 'lucide-react';
import ResultadoEjercicioRapido from './componentes/ResultadoEjercicioRapido';

function BuscadorEjerciciosRapido({
  terminoBusqueda: textoBusqueda,
  resultados: resultadosProp,
  buscando,
  onBuscar: alBuscar,
  onLimpiar: alLimpiar,
  onAgregar: alAgregar,
  traduccionesEtiquetas,
  convertirEtiqueta,
}) {
  const resultados = Array.isArray(resultadosProp) ? resultadosProp : [];

  return (
    <div className="p-4 border-t border-slate-800 shrink-0">
      <div className="relative">
        <div className="flex items-center gap-2 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 focus-within:border-blue-500 transition-colors">
          <Search size={16} className="text-slate-500 shrink-0" />
          <input
            type="text"
            value={textoBusqueda}
            onChange={(evento) => alBuscar(evento.target.value)}
            placeholder="Buscar ejercicio (squat, curl, press…)"
            className="flex-1 bg-transparent text-white text-sm placeholder-slate-500 outline-none"
          />
          {buscando && <span className="text-xs text-slate-500 shrink-0">Buscando…</span>}
          {textoBusqueda && !buscando && (
            <button type="button" onClick={alLimpiar} className="shrink-0">
              <X size={14} className="text-slate-500 hover:text-slate-300" />
            </button>
          )}
        </div>

        {resultados.length > 0 && (
          <div className="absolute z-50 bottom-full mb-1 left-0 right-0 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-2xl max-h-64 overflow-y-auto">
            {resultados.map((ejercicio) => <ResultadoEjercicioRapido key={ejercicio.id}
              ejercicio={ejercicio} alAgregar={alAgregar} traduccionesEtiquetas={traduccionesEtiquetas}
              convertirEtiqueta={convertirEtiqueta} />)}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuscadorEjerciciosRapido;
