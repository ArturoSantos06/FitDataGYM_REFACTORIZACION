import React from 'react';
import { BarraMensual } from '../ui/BarraMensual';
import { MensajeVacio } from '../ui/MensajeVacio';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(Number(value || 0));
};

export default function GraficaMensual({ monthlyData = [] }) {
  if (!monthlyData.length) {
    return (
      <MensajeVacio 
        titulo="Ingresos por Mes"
        descripcion="Aún no hay suficientes movimientos para graficar ingresos mensuales."
      />
    );
  }

  const maxTotal = Math.max(...monthlyData.map((row) => row.total), 1);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
        Ingresos por Mes
      </h3>

      <div className="space-y-3">
        {monthlyData.map((row) => {
          const widthPct = Math.max((row.total / maxTotal) * 100, 4);

          return (
            <BarraMensual
              key={row.month}
              etiqueta={row.label}
              total={row.total}
              planes={row.planes}
              widthPct={widthPct}
              formatCurrency={formatCurrency}
            />
          );
        })}
      </div>
    </section>
  );
}