import useTablaOperaciones from '../hooks/useTablaOperaciones';
import FilaTablaOperaciones from '../ui/FilaTablaOperaciones';

export default function TablaOperaciones({ ventasPlanes = [] }) {
  const { filas, formatearMoneda, formatearFecha } = useTablaOperaciones(ventasPlanes);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
        Movimientos Recientes
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[540px] text-left">
          <thead>
            <tr className="border-b border-slate-800 text-xs uppercase tracking-[0.14em] text-slate-400">
              <th className="pb-2">Tipo</th>
              <th className="pb-2">Concepto</th>
              <th className="pb-2">Fecha</th>
              <th className="pb-2 text-right">Monto</th>
            </tr>
          </thead>
          <tbody>
            {filas.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-sm text-slate-500">
                  No hay movimientos para mostrar.
                </td>
              </tr>
            )}
            {filas.map((fila) => (
              <FilaTablaOperaciones
                key={fila.id}
                tipo={fila.tipo}
                concepto={fila.concepto}
                fechaFormateada={formatearFecha(fila.fecha)}
                montoFormateado={formatearMoneda(fila.monto)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
