import { memo } from 'react';

function FilaVentaVista({ fila }) {
  return (
    <tr className="hover:bg-slate-700/50 transition-colors">
      <td className="px-6 py-4 font-mono text-xs text-cyan-300 font-bold">{fila.folio}</td>
      <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs">{fila.fecha}</td>
      <td className="px-6 py-4 font-medium text-white capitalize">{fila.nombre_completo}</td>
      <td className="px-6 py-4 text-slate-200">{fila.producto_nombre}</td>
      <td className="px-6 py-4 text-center">
        <span className="bg-slate-600 text-white py-1 px-2 rounded text-xs">x{fila.cantidad}</span>
      </td>
      <td className="px-6 py-4 text-right font-bold text-green-400">${fila.total_linea.toFixed(2)}</td>
    </tr>
  );
}

export default memo(FilaVentaVista);
