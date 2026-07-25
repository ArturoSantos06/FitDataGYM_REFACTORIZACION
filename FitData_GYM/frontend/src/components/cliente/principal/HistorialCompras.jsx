import React from 'react';
import { parseProductDetails, toDate } from './tiendaUtils';

function HistorialCompras({ sales }) {
  return (
    <div className="space-y-4">
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <h3 className="text-lg font-bold text-emerald-400">Historial de Compras</h3>
        <span className="text-slate-500 text-sm">{sales.length} ventas</span>
      </div>

      <div className="max-h-[520px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-700 divide-y divide-slate-800">
        {sales.length === 0 && (
          <div className="py-6 text-slate-400">Sin compras registradas.</div>
        )}

        {sales.flatMap((sale) => {
          const items = parseProductDetails(sale.detalle_productos);
          const date = toDate(sale.createdAt);
          const dateLabel = date.toLocaleDateString('es-MX');
          const timeLabel = date.toLocaleTimeString('es-MX', {
            hour: '2-digit',
            minute: '2-digit',
          });

          return items.map((item, itemIndex) => (
            <div
              key={`${sale.id}-${item.id || item.nombre || itemIndex}`}
              className="py-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-mono bg-slate-800 text-cyan-400 px-2 py-0.5 rounded border border-slate-700">
                    {sale.folio || 'FOLIO'}
                  </span>
                  <span className="text-slate-200 font-medium">
                    {item.nombre || 'Producto'}
                  </span>
                </div>
                <span className="text-slate-500 text-[11px]">
                  {dateLabel} • {timeLabel}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 justify-end">
                <span className="text-xs bg-slate-700 text-white px-2 py-1 rounded">
                  x{item.cantidad || 1}
                </span>
                <span className="text-emerald-400 font-semibold">
                  ${((item.cantidad || 1) * (item.precio || 0)).toFixed(2)}
                </span>
              </div>
            </div>
          ));
        })}
      </div>
    </div>
  );
}

export default HistorialCompras;
