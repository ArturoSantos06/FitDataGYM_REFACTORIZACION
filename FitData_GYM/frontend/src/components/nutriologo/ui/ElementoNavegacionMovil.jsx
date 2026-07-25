import { createElement } from 'react';

export function ElementoNavegacionMovil({ etiqueta, Icono, activo, alSeleccionar }) {
  return (
    <button
      type="button"
      onClick={alSeleccionar}
      aria-current={activo ? 'page' : undefined}
      className={`flex flex-col items-center justify-center gap-1 w-full ${
        activo ? 'text-cyan-400' : 'text-slate-500'
      }`}
    >
      <div className={`w-6 h-6 transition-all ${
        activo ? 'scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''
      }`}>
        {createElement(Icono, { size: 24 })}
      </div>
      <span className="text-[9px] font-medium truncate w-full px-1 text-center">
        {etiqueta}
      </span>
    </button>
  );
}
