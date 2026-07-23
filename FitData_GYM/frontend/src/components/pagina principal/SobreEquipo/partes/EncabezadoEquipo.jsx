import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

function EncabezadoEquipo() {
  const navigate = useNavigate();

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-6 sticky top-0 z-50 backdrop-blur-lg">
      <div className="container mx-auto px-6 flex items-center justify-between">
        <button onClick={() => navigate('/')} className="flex items-center gap-3 text-cyan-400 hover:text-cyan-300 transition-colors group">
          <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span className="font-bold text-lg">Volver al Inicio</span>
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          Equipo <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">FitData</span>
        </h1>
      </div>
    </header>
  );
}

export default memo(EncabezadoEquipo);
