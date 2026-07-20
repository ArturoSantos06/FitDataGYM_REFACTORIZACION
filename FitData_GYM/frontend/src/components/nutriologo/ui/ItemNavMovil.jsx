import React from 'react';

export function ItemNavMovil({ label, icono: Icon, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 w-full ${
        isActive ? 'text-cyan-400' : 'text-slate-500'
      }`}
    >
      <div className={`w-6 h-6 transition-all ${
        isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]' : ''
      }`}>
        <Icon size={24} />
      </div>
      <span className="text-[9px] font-medium truncate w-full px-1 text-center">
        {label}
      </span>
    </button>
  );
}