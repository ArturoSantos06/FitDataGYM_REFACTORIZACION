import React from 'react';

/** Botón secundario para opciones en modal */
export default function ModalBotonSecundario({ alHacer, etiqueta }) {
  return (
    <button
      onClick={alHacer}
      className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
    >
      {etiqueta}
    </button>
  );
}