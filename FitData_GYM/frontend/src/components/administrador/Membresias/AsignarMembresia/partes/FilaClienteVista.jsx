import { memo } from 'react';

function FilaClienteVista({ cliente, onSeleccionar }) {
  const nombre = cliente.firstName || '';
  const apellido = cliente.lastName || '';
  const nombreCompleto = `${nombre} ${apellido}`.trim();

  return (
    <li
      onClick={() => onSeleccionar(cliente)}
      className="p-3 hover:bg-slate-700 cursor-pointer text-white border-b border-slate-700 last:border-0"
    >
      <div className="font-bold text-cyan-400">{cliente.username}</div>
      <div className="text-xs text-gray-400">{nombreCompleto || cliente.displayName || 'Sin nombre registrado'}</div>
    </li>
  );
}

export default memo(FilaClienteVista);
