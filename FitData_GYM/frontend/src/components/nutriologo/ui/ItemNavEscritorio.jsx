import React from 'react';

export function ItemNavEscritorio({ label, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${
        isActive
          ? 'bg-slate-800 text-white border-b-2 border-cyan-400 shadow-[0_4px_12px_-2px_rgba(34,211,238,0.3)] -translate-y-px'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border-b-2 border-transparent'
      }`}
    >
      {label}
    </button>
  );
}