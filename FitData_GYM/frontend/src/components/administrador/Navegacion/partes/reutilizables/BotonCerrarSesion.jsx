import { memo } from 'react';

const CLASES = {
  escritorio: 'inline-flex h-9 items-center bg-red-500 hover:bg-red-600 px-3.5 rounded-full text-[12px] lg:text-sm font-bold transition-colors shadow-md whitespace-nowrap box-border',
  movil: 'w-full bg-red-600 hover:bg-red-700 px-4 py-3 rounded-lg text-base font-bold transition-colors shadow-md text-center',
};

const TEXTO = {
  escritorio: 'Salir',
  movil: 'Salir del Sistema',
};

function BotonCerrarSesion({ variante = 'escritorio', onClick }) {
  return (
    <button type="button" onClick={onClick} className={CLASES[variante]}>
      {TEXTO[variante]}
    </button>
  );
}

export default memo(BotonCerrarSesion);
