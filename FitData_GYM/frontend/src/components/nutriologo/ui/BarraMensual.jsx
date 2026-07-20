import React from 'react';

export function BarraMensual({ etiqueta, total, planes, widthPct, formatCurrency }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
        <span className="uppercase tracking-wide">{etiqueta}</span>
        <span className="font-semibold text-slate-200">{formatCurrency(total)}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-linear-to-r from-cyan-500 via-emerald-400 to-indigo-500 transition-all"
          style={{ width: `${widthPct}%` }}
        />
      </div>

      <div className="mt-1 text-[11px] text-slate-400">
        <span>Cobros de planes: {formatCurrency(planes)}</span>
      </div>
    </div>
  );
}