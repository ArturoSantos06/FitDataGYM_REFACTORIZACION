import React from 'react';

export function EntradaTexto({ label, icono: Icono, elementoDerecha, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {Icono && <Icono className="absolute left-3 top-3.5 text-slate-500" size={18} />}
        <input
          className={`w-full bg-slate-950 border border-slate-700 rounded-lg p-3 ${
            Icono ? 'pl-10' : 'pl-3'
          } ${
            elementoDerecha ? 'pr-12' : 'pr-3'
          } text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
          {...props}
        />
        {elementoDerecha && (
          <div className="absolute right-3 top-2.5">
            {elementoDerecha}
          </div>
        )}
      </div>
    </div>
  );
}