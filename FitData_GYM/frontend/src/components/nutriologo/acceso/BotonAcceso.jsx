import { createElement } from 'react';

export default function BotonAcceso({
  children: contenido,
  cargando,
  textoCarga,
  icono,
  ...propiedades
}) {
  return (
    <button
      {...propiedades}
      disabled={cargando || propiedades.disabled}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-cyan-500 to-blue-500 px-6 py-3 font-bold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {cargando ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
          {textoCarga || 'Cargando...'}
        </>
      ) : (
        <>
          {icono && createElement(icono, { size: 20 })}
          {contenido}
        </>
      )}
    </button>
  );
}
