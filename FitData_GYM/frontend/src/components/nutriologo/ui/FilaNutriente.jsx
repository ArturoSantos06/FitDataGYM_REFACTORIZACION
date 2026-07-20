import React from 'react';

export function FilaNutriente({ etiqueta, gramos, porcentaje, claseColor }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-950/70 p-4">
      <p className="text-xs uppercase tracking-wider text-slate-400">{etiqueta}</p>
      <p className={`mt-1 text-2xl font-black ${claseColor}`}>{gramos} g</p>
      <p className="text-xs text-slate-500">{porcentaje}% del total calórico</p>
    </div>
  );
}