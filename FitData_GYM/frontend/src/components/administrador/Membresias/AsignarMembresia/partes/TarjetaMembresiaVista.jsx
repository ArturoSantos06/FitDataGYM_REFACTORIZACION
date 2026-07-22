import { memo } from 'react';

function TarjetaMembresiaVista({ tipo, activo, onSeleccionar, obtenerUrlImagen }) {
  return (
    <div
      onClick={() => onSeleccionar(tipo.id)}
      className={`group w-full aspect-video relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 bg-black border-2 ${
        activo
          ? 'border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)] scale-[1.02]'
          : 'border-gray-700 hover:border-gray-500 hover:scale-[1.01]'
      }`}
    >
      {tipo.image ? (
        <img
          src={obtenerUrlImagen(tipo.image)}
          alt={tipo.name}
          className={`w-full h-full object-contain transition-all duration-500 ${
            !activo && 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'
          }`}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">Sin Imagen</div>
      )}

      {activo && (
        <div className="absolute top-3 right-3 bg-cyan-500 text-black rounded-full p-1.5 shadow-lg z-10 animate-bounce-short">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default memo(TarjetaMembresiaVista);
