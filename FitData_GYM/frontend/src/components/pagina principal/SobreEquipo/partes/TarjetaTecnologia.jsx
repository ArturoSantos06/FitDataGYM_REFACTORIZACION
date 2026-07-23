import { memo } from 'react';

function TarjetaTecnologia({ nombre, descripcion, tamañoTitulo = 'text-lg' }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-cyan-500/50 transition-all">
      <h4 className={`${tamañoTitulo} font-bold text-white mb-2`}>{nombre}</h4>
      <p className="text-gray-400 text-sm">{descripcion}</p>
    </div>
  );
}

export default memo(TarjetaTecnologia);
