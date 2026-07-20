import React from 'react';
import { Plus } from 'lucide-react';

/** Elemento de resultado del buscador de ejercicios */
export default function ElementoResultadoBuscador({ ejercicio, alAgregar, convertirEtiqueta, traduccionesEtiquetas }) {
  return (
    <button
      type="button"
      onClick={() => alAgregar(ejercicio)}
      className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 transition-colors text-left border-b border-slate-800 last:border-0"
    >
      {ejercicio.gifUrl ? (
        <img src={ejercicio.gifUrl} alt={ejercicio.nombre} className="w-10 h-10 rounded-lg object-cover bg-slate-800 shrink-0" loading="lazy" />
      ) : (
        <div className="w-10 h-10 rounded-lg bg-slate-800 shrink-0 flex items-center justify-center text-lg">🏋️</div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium capitalize truncate">{ejercicio.nombre}</p>
        <div className="flex gap-1 mt-0.5">
          {ejercicio.patronMovimiento && (
            <span className="text-xs text-blue-400 capitalize">{convertirEtiqueta(traduccionesEtiquetas, ejercicio.patronMovimiento)}</span>
          )}
          {ejercicio.musculoPrincipal && (
            <span className="text-xs text-slate-500">· {convertirEtiqueta(traduccionesEtiquetas, ejercicio.musculoPrincipal)}</span>
          )}
        </div>
      </div>
      <Plus size={14} className="text-blue-400 shrink-0" />
    </button>
  );
}