import { useCallback, useRef, useState } from 'react';
import { useClicFuera } from './useClicFuera';

const construirNombreCompleto = (cliente) => {
  const nombre = cliente.firstName || '';
  const apellido = cliente.lastName || '';
  return `${nombre} ${apellido}`.trim();
};

// Buscar y seleccionar cliente. Recibe la lista completa de clientes ya
// cargada por useCatalogoMembresias.
export function useBuscadorCliente(clientes) {
  const [clienteSeleccionado, setClienteSeleccionado] = useState('');
  const [busquedaCliente, setBusquedaCliente] = useState('');
  const [dropdownAbierto, setDropdownAbierto] = useState(false);
  const dropdownRef = useRef(null);

  useClicFuera(dropdownRef, useCallback(() => setDropdownAbierto(false), []));

  const clientesFiltrados = clientes.filter((cliente) => {
    const nombreCompleto = `${cliente.firstName || ''} ${cliente.lastName || ''} ${cliente.displayName || ''} ${cliente.username || ''}`.toLowerCase();
    return nombreCompleto.includes(busquedaCliente.toLowerCase());
  });

  const cambiarBusqueda = (valor) => {
    setBusquedaCliente(valor);
    setDropdownAbierto(true);
    if (valor === '') setClienteSeleccionado('');
  };

  const seleccionarCliente = (cliente) => {
    setClienteSeleccionado(cliente.id);
    const nombreCompleto = construirNombreCompleto(cliente);
    setBusquedaCliente(`${cliente.username}${nombreCompleto ? ` (${nombreCompleto})` : ''}`);
    setDropdownAbierto(false);
  };

  const reiniciar = () => {
    setClienteSeleccionado('');
    setBusquedaCliente('');
  };

  return {
    clienteSeleccionado,
    busquedaCliente,
    dropdownAbierto,
    dropdownRef,
    clientesFiltrados,
    cambiarBusqueda,
    seleccionarCliente,
    abrirDropdown: () => setDropdownAbierto(true),
    reiniciar,
  };
}
