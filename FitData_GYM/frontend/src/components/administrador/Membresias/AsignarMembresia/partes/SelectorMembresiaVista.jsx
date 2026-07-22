import { memo } from 'react';
import TarjetaMembresiaVista from './TarjetaMembresiaVista';

function SelectorMembresiaVista({ tipos, seleccionado, onSeleccionar, obtenerUrlImagen }) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-300 mb-4">2. Elige la Membresía a Renovar</label>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tipos.map((tipo) => (
          <TarjetaMembresiaVista
            key={tipo.id}
            tipo={tipo}
            activo={seleccionado === tipo.id}
            onSeleccionar={onSeleccionar}
            obtenerUrlImagen={obtenerUrlImagen}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(SelectorMembresiaVista);
