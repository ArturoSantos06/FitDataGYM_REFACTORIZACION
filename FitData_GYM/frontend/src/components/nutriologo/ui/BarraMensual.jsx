import { formatearMoneda, obtenerClaseAncho } from '../utils/finanzas';

export function BarraMensual({ etiqueta, total, planes, porcentajeAncho }) {
  const claseAncho = obtenerClaseAncho(porcentajeAncho);

  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs text-slate-300">
        <span className="uppercase tracking-wide">{etiqueta}</span>
        <span className="font-semibold text-slate-200">{formatearMoneda(total, 0)}</span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
        <div className={`h-full rounded-full bg-linear-to-r from-cyan-500 via-emerald-400 to-indigo-500 transition-all ${claseAncho}`} />
      </div>

      <div className="mt-1 text-[11px] text-slate-400">
        <span>Cobros de planes: {formatearMoneda(planes, 0)}</span>
      </div>
    </div>
  );
}
