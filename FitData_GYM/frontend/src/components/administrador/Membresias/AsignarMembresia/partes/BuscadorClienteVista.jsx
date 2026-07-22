import { memo } from 'react';
import FilaClienteVista from './FilaClienteVista';

function BuscadorClienteVista({ dropdownRef, busqueda, onBusquedaChange, onFocus, dropdownAbierto, clientes, onSeleccionar }) {
  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-sm font-bold text-gray-300 mb-2">1. Selecciona el Cliente</label>
      <input
        type="text"
        placeholder="Buscar por nombre o usuario..."
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        onFocus={onFocus}
        className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-500"
      />

      {dropdownAbierto && (
        <ul className="absolute z-50 w-full bg-slate-800 border border-slate-600 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-2xl">
          {clientes.map((cliente) => (
            <FilaClienteVista key={cliente.id} cliente={cliente} onSeleccionar={onSeleccionar} />
          ))}
          {clientes.length === 0 && (
            <li className="p-3 text-gray-500 text-center italic">No se encontraron clientes</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default memo(BuscadorClienteVista);
