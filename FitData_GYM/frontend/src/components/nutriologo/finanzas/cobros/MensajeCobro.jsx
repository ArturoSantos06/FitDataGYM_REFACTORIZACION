import { CheckCircle2, XCircle } from 'lucide-react';

export default function MensajeCobro({ mensaje }) {
  const esExito = mensaje.tipo === 'exito';

  return (
    <div
      className={`flex items-start gap-2 rounded-xl border p-3 text-xs ${
        esExito
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-100'
          : 'border-red-500/40 bg-red-500/10 text-red-100'
      }`}
      role="status"
    >
      {esExito ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
      <span>{mensaje.texto}</span>
    </div>
  );
}
