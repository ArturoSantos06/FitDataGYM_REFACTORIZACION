import { memo } from 'react';
import { BarChart3 } from 'lucide-react';
import { COLUMNAS } from '../contenido';

const formatearMoneda = (valor) => `$${valor.toFixed(2)}`;

function TablaFacturasVista({ facturas }) {
  if (!facturas || facturas.length === 0) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
        <BarChart3 className="mx-auto text-slate-600 mb-3" size={48} />
        <p className="text-slate-400 text-lg">No hay datos para este período</p>
      </div>
    );
  }

  return (
    <div className="bg-blue-900/30 border border-blue-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-900/60 border-b border-blue-700">
              {COLUMNAS.map(({ label, alineacion }) => (
                <th key={label} className={`px-6 py-4 ${alineacion} text-sm font-semibold text-slate-300`}>
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-800">
            {facturas.map((factura) => (
              <tr key={factura.id} className="hover:bg-blue-900/40 transition-colors">
                <td className="px-6 py-4 text-white text-sm">{factura.fecha.toLocaleDateString('es-MX')}</td>
                <td className="px-6 py-4 text-cyan-400 text-sm font-semibold">{factura.factura_numero}</td>
                <td className="px-6 py-4 text-white text-sm">{factura.cliente_nombre || 'Sin nombre'}</td>
                <td className="px-6 py-4 text-slate-300 text-sm">{factura.membership_name || factura.producto || 'Producto'}</td>
                <td className="px-6 py-4 text-right text-white text-sm">{formatearMoneda(factura.subtotal || 0)}</td>
                <td className="px-6 py-4 text-right text-orange-400 text-sm">{formatearMoneda(factura.totalIVA || 0)}</td>
                <td className="px-6 py-4 text-right text-emerald-400 text-sm font-semibold">{formatearMoneda(factura.total || 0)}</td>
                <td className="px-6 py-4 text-sm">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-900/40 text-emerald-400 border border-emerald-700">
                    Generada
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(TablaFacturasVista);
