import { memo } from 'react';
import FilaVentaVista from './FilaVentaVista';
import { COLUMNAS } from '../contenido';

function TablaVentasVista({ filas }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-700">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-900 text-slate-100 uppercase font-bold">
          <tr>
            {COLUMNAS.map(({ label, alineacion, destacada }) => (
              <th key={label} className={`px-6 py-3 ${alineacion} ${destacada ? 'text-cyan-400' : ''}`}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {filas.length > 0 ? (
            filas.map((fila) => <FilaVentaVista key={fila.id_unico} fila={fila} />)
          ) : (
            <tr>
              <td colSpan={COLUMNAS.length} className="px-6 py-8 text-center text-slate-500">
                No se encontraron ventas.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default memo(TablaVentasVista);
