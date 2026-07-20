import React from 'react';
import { BookOpen } from 'lucide-react';
import { useCatalogoEjerciciosRutina } from '../../../hooks/useCatalogoEjerciciosRutina';
import TarjetaCatalogoEjercicio from '../../TarjetaCatalogoEjercicio';

function CatalogoEjerciciosRutina(props) {
  /** pos esto funciona para el catalogo */
  const { diaActivo, partesCuerpo, parteCuerpoSeleccionada, cargandoCatalogo, ejercicios, seleccionarParte, agregarEjercicio } = useCatalogoEjerciciosRutina(props.activeDay, props.bodyParts, props.catalogBodyPart, props.isCatalogLoading, props.catalogExercises, props.onFetchCatalog, props.onAddExercise);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950 shrink-0">
        <BookOpen size={16} className="text-blue-400" />
        <span className="font-semibold text-white text-sm">Catálogo de ejercicios</span>
        <span className="ml-auto text-xs text-slate-500">Clic para agregar a <span className="text-blue-400 font-semibold">{diaActivo}</span></span>
      </div>

      <div className="flex flex-wrap gap-2 p-3 border-b border-slate-800 shrink-0">
        {partesCuerpo.map((parte) => (
          <button
            key={parte.key}
            type="button"
            onClick={() => seleccionarParte(parte.key)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              parteCuerpoSeleccionada === parte.key
                ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/40'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'
            }`}
          >
            {parte.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-4 max-h-120">
        {!parteCuerpoSeleccionada && !cargandoCatalogo && (
          <div className="text-center py-12 text-slate-600"><p className="text-3xl mb-3">💪</p><p className="text-sm">Selecciona un grupo muscular</p><p className="text-xs mt-1">para ver el catálogo de ejercicios</p></div>
        )}
        {cargandoCatalogo && (
          <div className="text-center py-12 text-slate-500 text-sm"><div className="text-3xl mb-3 animate-pulse">⏳</div>Cargando ejercicios…</div>
        )}
        {!cargandoCatalogo && parteCuerpoSeleccionada && ejercicios.length === 0 && (
          <div className="text-center py-12 text-slate-600 text-sm">Sin resultados para este grupo muscular.</div>
        )}

        {!cargandoCatalogo && ejercicios.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {ejercicios.map((ex) => (
              <TarjetaCatalogoEjercicio key={ex.id} ex={ex} agregarEjercicio={agregarEjercicio} diaActivo={diaActivo} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CatalogoEjerciciosRutina;
