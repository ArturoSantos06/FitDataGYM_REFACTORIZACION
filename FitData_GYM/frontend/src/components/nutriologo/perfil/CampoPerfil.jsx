const CLASE_ENTRADA =
  'w-full rounded-lg border border-slate-700 bg-slate-950 p-3 pl-10 text-slate-300 outline-none transition-all focus:ring-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50';

export default function CampoPerfil({
  etiqueta,
  Icono,
  tipo = 'text',
  nombre,
  valor,
  alCambiar,
  marcador,
  deshabilitado = false,
  claseColor = '',
}) {
  return (
    <div>
      <label className="mb-1 ml-1 block text-sm font-medium text-slate-400">
        {etiqueta}
      </label>
      <div className="relative">
        {createElement(Icono, {
          className: 'absolute left-3 top-3.5 text-slate-500',
          size: 18,
        })}
        <input
          type={tipo}
          name={nombre}
          value={valor}
          onChange={alCambiar}
          placeholder={marcador}
          disabled={deshabilitado}
          className={`${CLASE_ENTRADA} ${claseColor}`}
        />
      </div>
    </div>
  );
}
import { createElement } from 'react';
