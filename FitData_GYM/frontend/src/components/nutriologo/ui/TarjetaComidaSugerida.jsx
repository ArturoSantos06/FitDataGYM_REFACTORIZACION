import React from 'react';

export default function TarjetaComidaSugerida({ tipo, titulo, minutos, porciones }) {
  return (
    <div className="block rounded-lg border border-slate-700 bg-slate-800 p-3 hover:border-cyan-500/50 transition-colors group cursor-default">
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-wider block mb-1">
            {tipo}
          </span>
          <h5 className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-2">
            {titulo}
          </h5>
          <div className="mt-2 flex gap-3 text-xs text-slate-400">
            <span>⏱ {minutos} min</span>
            <span>🍽 {porciones} porc.</span>
          </div>
        </div>
      </div>
    </div>
  );
}