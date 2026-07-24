import React from 'react';
import { Download, FileText, Loader } from 'lucide-react';
import { getSaleDate, getSaleDescriptionParts, getSaleTotal } from './facturacionUtils';

function VentaFacturaCard({ venta, isGenerating, onGenerate, onDownload }) {
  const date = getSaleDate(venta).toLocaleDateString('es-MX');
  const descriptionParts = getSaleDescriptionParts(venta);
  const hasInvoice = venta.factura_estado === 'generada' && venta.factura_url;

  return (
    <div className="bg-blue-900/40 border border-blue-800 rounded-3xl p-5 hover:bg-blue-900/60 transition-colors">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2 min-w-0">
          <p className="text-xs text-slate-400">Factura</p>
          <p className="text-white font-semibold wrap-break-word">{venta.factura_numero || 'Pendiente'}</p>
        </div>

        <div className="space-y-2 min-w-0">
          <p className="text-xs text-slate-400">Fecha</p>
          <p className="text-white font-semibold wrap-break-word">{date}</p>
        </div>

        <div className="space-y-2 min-w-0 sm:col-span-2">
          <p className="text-xs text-slate-400">Descripción</p>
          <div className="text-white font-semibold wrap-break-word space-y-1">
            {descriptionParts.map(({ key, text }) => <div key={key}>{text}</div>)}
          </div>
        </div>

        <div className="space-y-2 min-w-0">
          <p className="text-xs text-slate-400">Monto</p>
          <p className="text-cyan-400 font-bold text-lg wrap-break-word">${getSaleTotal(venta)}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-blue-700 flex justify-start">
        {hasInvoice ? (
          <button
            type="button"
            onClick={() => onDownload(venta.factura_url)}
            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap"
          >
            <Download size={16} />
            Descargar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => onGenerate(venta.id)}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-4 py-2 rounded-xl font-semibold transition-all whitespace-nowrap"
          >
            {isGenerating ? <><Loader className="animate-spin" size={16} />Generando...</> : <><FileText size={16} />Generar</>}
          </button>
        )}
      </div>
    </div>
  );
}

export default VentaFacturaCard;
