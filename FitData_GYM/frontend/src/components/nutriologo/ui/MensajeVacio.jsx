import React from 'react';

export function MensajeVacio({ titulo, descripcion }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6">
      <h3 className="text-lg font-bold text-white">{titulo}</h3>
      <p className="mt-2 text-sm text-slate-400">
        {descripcion}
      </p>
    </div>
  );
}