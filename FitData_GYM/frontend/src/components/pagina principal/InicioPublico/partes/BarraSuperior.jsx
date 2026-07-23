import { memo } from 'react';
import { DIRECCION_GYM } from '../contenido';

function BarraSuperior() {
  return (
    <div className="absolute top-0 left-0 w-full z-30 pt-4 pb-2">
      <div className="container mx-auto flex justify-center items-center">
        <p className="text-xs md:text-sm text-gray-300 tracking-wide drop-shadow-md flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity">
          <span>📍</span>
          Dirección: {DIRECCION_GYM}
        </p>
      </div>
    </div>
  );
}

export default memo(BarraSuperior);
