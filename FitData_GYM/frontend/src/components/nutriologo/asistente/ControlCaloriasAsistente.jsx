import { Loader2, Save } from 'lucide-react';

export default function ControlCaloriasAsistente({
  calorias,
  alCambiar,
  alGenerar,
  cargandoMenu,
  permiteGuardar,
  alGuardar,
  guardando,
  mensajeGuardado,
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 flex items-center justify-between text-xs text-slate-400">
        <span>Objetivo calórico (kcal)</span>
        {permiteGuardar && (
          <button
            type="button"
            onClick={alGuardar}
            disabled={guardando}
            className="flex items-center gap-1 text-[10px] text-cyan-400 transition-colors hover:text-cyan-300 disabled:opacity-50"
          >
            {guardando
              ? <Loader2 size={10} className="animate-spin" />
              : <Save size={10} />}
            {mensajeGuardado || 'Guardar en perfil'}
          </button>
        )}
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          min="1"
          value={calorias}
          onChange={(evento) => alCambiar(evento.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none"
        />
        <button
          type="button"
          onClick={alGenerar}
          disabled={cargandoMenu}
          className="flex min-w-[100px] items-center justify-center whitespace-nowrap rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white transition-colors hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400"
        >
          {cargandoMenu ? <Loader2 size={16} className="animate-spin" /> : 'Generar'}
        </button>
      </div>
    </div>
  );
}
