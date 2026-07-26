import { memo } from 'react';

function PiePaginaEquipo() {
  return (
    <div className="text-center border-t border-gray-800 pt-12">
      <p className="text-gray-500 text-sm mb-4">Proyecto desarrollado como parte del programa académico</p>
      <p className="text-cyan-400 font-bold text-lg">FitData GYM © 2025</p>
    </div>
  );
}

export default memo(PiePaginaEquipo);
