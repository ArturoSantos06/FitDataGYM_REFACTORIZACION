import React from 'react';

/** Botón rojo para confirmación en modal */
export default function ModalBotonAceptacion({ alHacer, etiqueta }) {
  return (
    <button
      onClick={alHacer}
      className="flex-1 bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white border border-red-500/50 hover:border-red-600 font-semibold py-3 px-4 rounded-xl transition-all"
    >
      {etiqueta}
    </button>
  );
}