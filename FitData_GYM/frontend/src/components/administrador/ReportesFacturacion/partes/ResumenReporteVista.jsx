import { memo } from 'react';

const formatearMoneda = (valor) => `$${valor.toFixed(2)}`;

const TARJETAS = [
  { key: 'totalFacturas', label: 'Total Facturas', gradiente: 'from-blue-900 to-blue-800', borde: 'border-blue-700', color: 'text-cyan-400', esMoneda: false },
  { key: 'totalIngresos', label: 'Total Ingresos', gradiente: 'from-emerald-900 to-emerald-800', borde: 'border-emerald-700', color: 'text-emerald-400', esMoneda: true },
  { key: 'subtotal', label: 'Subtotal', gradiente: 'from-purple-900 to-purple-800', borde: 'border-purple-700', color: 'text-purple-400', esMoneda: true },
  { key: 'totalIVA', label: 'IVA Cobrado', gradiente: 'from-orange-900 to-orange-800', borde: 'border-orange-700', color: 'text-orange-400', esMoneda: true },
];

function ResumenReporteVista({ reportData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {TARJETAS.map(({ key, label, gradiente, borde, color, esMoneda }) => {
        const valor = reportData[key] || 0;
        return (
          <div key={key} className={`bg-linear-to-br ${gradiente} border ${borde} rounded-lg p-6`}>
            <p className="text-slate-300 text-sm font-medium">{label}</p>
            <p className={`text-3xl font-bold ${color} mt-2`}>{esMoneda ? formatearMoneda(valor) : valor}</p>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ResumenReporteVista);
