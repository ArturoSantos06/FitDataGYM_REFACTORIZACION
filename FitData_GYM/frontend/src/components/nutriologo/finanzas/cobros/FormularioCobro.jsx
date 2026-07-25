import { CreditCard } from 'lucide-react';
import MensajeCobro from './MensajeCobro';
import { formatearMoneda } from '../../utils/utilidadesCobros';

export default function FormularioCobro({
  monto,
  alCambiarMonto,
  metodoPago,
  alCambiarMetodoPago,
  alCobrar,
  guardando,
  deshabilitado,
  mensaje,
}) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        Monto a cobrar
      </label>
      <input
        type="number"
        min="1"
        step="0.01"
        value={monto}
        onChange={(evento) => alCambiarMonto(evento.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 outline-none focus:border-cyan-500"
      />

      <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
        Método de pago
      </label>
      <select
        value={metodoPago}
        onChange={(evento) => alCambiarMetodoPago(evento.target.value)}
        className="w-full rounded-xl border border-slate-700 bg-slate-950 p-3 text-sm text-slate-100 outline-none focus:border-cyan-500"
      >
        <option value="EFECTIVO">Efectivo</option>
        <option value="TARJETA">Tarjeta</option>
        <option value="TRANSFERENCIA">Transferencia</option>
      </select>

      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-100">
        Total: <span className="font-bold">{formatearMoneda(monto)}</span>
      </div>

      <button
        type="button"
        onClick={alCobrar}
        disabled={guardando || deshabilitado}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-emerald-600 to-cyan-600 px-4 py-3 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        <CreditCard size={16} />
        {guardando ? 'Registrando cobro...' : 'Cobrar ahora'}
      </button>

      {mensaje.texto && <MensajeCobro mensaje={mensaje} />}
    </div>
  );
}
