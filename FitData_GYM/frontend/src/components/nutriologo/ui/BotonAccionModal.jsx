import React from 'react';

export function BotonAccionModal({ tipo, onClick, children }) {
  const estilos = {
    peligro: "flex-1 py-4 rounded-2xl bg-red-600/10 text-red-500 border border-red-500/20 hover:bg-red-600 hover:text-white transition-all",
    primario: "flex-[1.5] py-4 rounded-2xl bg-purple-600 text-white shadow-lg shadow-purple-900/20 hover:bg-purple-500 transition-colors",
    secundario: "flex-[1.5] py-4 rounded-2xl bg-slate-700 text-white hover:bg-slate-600 transition-colors"
  };

  return (
    <button 
        onClick={onClick} 
        className={`${estilos[tipo]} font-black text-[10px] uppercase`}
    >
      {children}
    </button>
  );
}