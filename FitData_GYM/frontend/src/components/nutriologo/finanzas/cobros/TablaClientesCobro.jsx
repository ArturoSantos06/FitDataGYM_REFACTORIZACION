import FilaClienteCobro from './FilaClienteCobro';

export default function TablaClientesCobro({
  clientes,
  cargando,
  idSeleccionado,
  alSeleccionar,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-700">
      <div className="max-h-72 overflow-auto">
        <table className="w-full min-w-[460px] text-left text-xs">
          <thead className="sticky top-0 z-10 bg-slate-800">
            <tr className="text-slate-300">
              <th className="px-2 py-2 font-bold uppercase tracking-wide">ID</th>
              <th className="px-2 py-2 font-bold uppercase tracking-wide">Usuario</th>
              <th className="px-2 py-2 font-bold uppercase tracking-wide">Correo</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 && (
              <tr>
                <td colSpan="3" className="px-3 py-4 text-center text-slate-400">
                  {cargando ? 'Cargando clientes...' : 'No hay clientes para mostrar.'}
                </td>
              </tr>
            )}

            {clientes.map((cliente) => (
              <FilaClienteCobro
                key={cliente.id}
                cliente={cliente}
                seleccionado={String(idSeleccionado) === String(cliente.id)}
                alSeleccionar={alSeleccionar}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
