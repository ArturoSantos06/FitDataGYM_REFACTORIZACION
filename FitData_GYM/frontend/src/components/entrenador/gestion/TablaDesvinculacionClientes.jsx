const ESTADOS_PAGO = {
  cancelado: {
    clases: 'border-gray-600 bg-gray-900/50 text-gray-400',
    semaforo: 'bg-gray-500',
    texto: 'Servicio Cancelado',
  },
  pagado: {
    clases: 'border-green-500/50 bg-green-900/20 text-green-400',
    semaforo: 'bg-green-500 animate-pulse',
    texto: 'PAGO AL DÍA',
  },
  pendiente: {
    clases: 'border-red-500/50 bg-red-900/20 text-red-400',
    semaforo: 'bg-red-500',
    texto: 'PAGO PENDIENTE',
  },
};

function EstadoPago({ cliente }) {
  let estado = 'pendiente';

  if (cliente.estadoServicio === 'cancelado') {
    estado = 'cancelado';
  } else if (cliente.pagoAlCorriente) {
    estado = 'pagado';
  }

  const configuracion = ESTADOS_PAGO[estado];

  return (
    <div
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${configuracion.clases}`}
    >
      <span
        aria-hidden="true"
        className={`mr-2 h-2 w-2 rounded-full ${configuracion.semaforo}`}
      />

      {configuracion.texto}
    </div>
  );
}

function TablaDesvinculacionClientes({
  clientes,
  cargando,
  onArchivar,
  onEliminar,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="mt-2 w-full border-collapse">
        <thead>
          <tr className="bg-gray-700 text-left text-xs uppercase tracking-wider text-gray-300">
            <th scope="col" className="px-6 py-3">
              ID
            </th>
            <th scope="col" className="px-6 py-3">
              Cliente
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Estado de Pago
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="text-sm text-gray-200">
          {cargando && (
            <tr>
              <td
                colSpan={4}
                className="py-10 text-center italic text-gray-400"
              >
                Cargando clientes asignados...
              </td>
            </tr>
          )}

          {!cargando &&
            clientes.map((cliente) => (
              <tr
                key={cliente.id}
                className="border-b border-gray-700 transition-colors hover:bg-gray-700/50"
              >
                <td className="px-6 py-4">
                  <span className="font-mono font-bold text-teal-400">
                    #{cliente.id}
                  </span>
                </td>

                <td className="px-6 py-4 font-semibold">
                  {cliente.nombre}
                </td>

                <td className="px-6 py-4 text-center">
                  <EstadoPago cliente={cliente} />
                </td>

                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => onArchivar(cliente.id)}
                      className="rounded bg-slate-700 px-3 py-1.5 text-[10px] font-bold uppercase text-white transition-all hover:bg-slate-600"
                    >
                      {cliente.archivado ? 'Desarchivar' : 'Archivar'}
                    </button>

                    <button
                      type="button"
                      onClick={() => onEliminar(cliente.id)}
                      className="rounded border border-red-600/50 bg-red-600/20 px-3 py-1.5 text-[10px] font-bold uppercase text-red-400 transition-all hover:bg-red-600 hover:text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          {!cargando && clientes.length === 0 && (
            <tr>
              <td
                colSpan={4}
                className="py-10 text-center italic text-gray-500"
              >
                No hay clientes que mostrar.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaDesvinculacionClientes;