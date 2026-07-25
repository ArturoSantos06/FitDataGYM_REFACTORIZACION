export function ElementoNavegacionEscritorio({ etiqueta, activo, alSeleccionar }) {
  return (
    <button
      type="button"
      onClick={alSeleccionar}
      aria-current={activo ? 'page' : undefined}
      className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
        activo
          ? 'bg-slate-800 text-white border-b-2 border-cyan-400 shadow-[0_4px_12px_-2px_rgba(34,211,238,0.3)] -translate-y-px'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border-b-2 border-transparent'
      }`}
    >
      {etiqueta}
    </button>
  );
}
