import { memo } from 'react';
import TarjetaMembresiaVista from './TarjetaMembresiaVista';

function ListaMembresiasVista({ membresias, obtenerUrlImagen, activoId, onClick, onEditar, onBorrar }) {
  return (
    <div className="lg:col-span-8">
      <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Membresías Activas</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {membresias.map((membresia) => (
          <TarjetaMembresiaVista
            key={membresia.id}
            membresia={membresia}
            obtenerUrlImagen={obtenerUrlImagen}
            activo={activoId === membresia.id}
            onClick={onClick}
            onEditar={onEditar}
            onBorrar={onBorrar}
          />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(new Event('click'));
          }}
          className="text-gray-500 hover:text-cyan-400 text-sm underline transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ver Términos y Condiciones de Membresías
        </button>
      </div>
    </div>
  );
}

export default memo(ListaMembresiasVista);