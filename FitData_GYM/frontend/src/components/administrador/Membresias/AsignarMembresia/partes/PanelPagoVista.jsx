import { memo } from 'react';

function PanelPagoVista({ metodoPago, onMetodoPagoChange, precio, montoRecibido, onMontoRecibidoChange, cambio }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-300 mb-2">3. Pago</label>
      <div className="bg-slate-900 p-4 rounded-lg border border-slate-600">
        <div className="flex gap-2 mb-3">
          <select
            value={metodoPago}
            onChange={(e) => onMetodoPagoChange(e.target.value)}
            className="w-1/2 bg-slate-800 border border-slate-500 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="EFECTIVO">Efectivo</option>
            <option value="TARJETA">Tarjeta</option>
            <option value="TRANSFERENCIA">Transferencia</option>
          </select>
          <div className="w-1/2 text-right">
            <span className="block text-xs text-gray-400">Total a Cobrar</span>
            <span className="text-xl font-bold text-green-400">${precio}</span>
            <p className="text-[10px] text-slate-500">(IVA Incluido)</p>
          </div>
        </div>

        {metodoPago === 'EFECTIVO' && (
          <div className="animate-fade-in border-t border-slate-600 pt-2">
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm text-gray-300">Recibido:</label>
              <input
                type="number"
                value={montoRecibido}
                onChange={(e) => onMontoRecibidoChange(e.target.value)}
                className="flex-1 p-1 bg-slate-800 border border-slate-500 rounded text-white text-right focus:ring-1 focus:ring-green-500 outline-none"
                placeholder="0.00"
              />
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-bold text-gray-300">Cambio:</span>
              <span className={`font-bold ${cambio < 0 ? 'text-red-400' : 'text-yellow-400'}`}>
                ${cambio.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(PanelPagoVista);
