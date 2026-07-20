import React from 'react';

export function BotonPrincipal({ children, estaCargando, textoCarga, icono: Icono, ...props }) {
  return (
    <button
      {...props}
      disabled={estaCargando || props.disabled}
      className="w-full bg-linear-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {estaCargando ? (
        <>
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          {textoCarga || 'Cargando...'}
        </>
      ) : (
        <>
          {Icono && <Icono size={20} />}
          {children}
        </>
      )}
    </button>
  );
}