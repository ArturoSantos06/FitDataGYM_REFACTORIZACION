import React from 'react';
import { usePestanaDiasRutina } from '../hooks/usePestanaDiasRutina';

/** Pestaña individual de día en la rutina */
export default function PestanaDiaUnico({ dia, diaActivo, alCambiarDia, ejerciciosPorDia }) {
  const { cantidad, tieneEjercicios } = usePestanaDiasRutina(ejerciciosPorDia, dia);

  return (
    <button
      type="button"
      onClick={() => alCambiarDia(dia)}
      className={`shrink-0 px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${
        diaActivo === dia
          ? 'border-blue-500 text-white bg-slate-900'
          : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
      }`}
    >
      {dia}
      {tieneEjercicios && (
        <span className="ml-1.5 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">
          {cantidad}
        </span>
      )}
    </button>
  );
}