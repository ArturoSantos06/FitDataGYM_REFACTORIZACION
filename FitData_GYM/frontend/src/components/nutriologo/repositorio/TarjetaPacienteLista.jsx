export default function TarjetaPacienteLista({
  id,
  nombre,
  correo,
  estaSeleccionado,
  cantidadArchivos,
  alSeleccionar,
}) {
  return (
    <button
      type="button"
      aria-pressed={estaSeleccionado}
      onClick={(evento) => {
        evento.stopPropagation();
        alSeleccionar(id);
      }}
      className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
        estaSeleccionado
          ? 'border-cyan-400 bg-cyan-500/10 shadow-lg shadow-cyan-950/30'
          : 'border-slate-700 bg-slate-800/70 hover:border-slate-500 hover:bg-slate-800'
      } focus:outline-none focus:ring-0`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-white">{nombre}</p>
          <p className="mt-1 text-xs text-slate-400">
            {correo || 'Sin correo registrado'}
          </p>
          <p className="mt-2 text-[11px] uppercase tracking-wide text-slate-500">
            Expediente #{id}
          </p>
        </div>
        <span className="rounded-full bg-slate-700 px-2.5 py-1 text-xs font-semibold text-slate-200">
          {cantidadArchivos}
        </span>
      </div>
    </button>
  );
}
