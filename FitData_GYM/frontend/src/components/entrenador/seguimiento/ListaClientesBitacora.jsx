function ListaClientesBitacora({
  miembros = [],
  miembroSeleccionado = null,
  terminoBusqueda = '',
  conteoNotas = {},
  onBuscar,
  onSeleccionar,
}) {
  const hayMiembros = miembros.length > 0;

  return (
    <aside className="lg:col-span-1">
      <div className="h-full rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
          <span
            className="text-2xl"
            aria-hidden="true"
          >
            👥
          </span>

          Clientes
        </h2>

        <label
          htmlFor="buscar-cliente-bitacora"
          className="sr-only"
        >
          Buscar cliente
        </label>

        <input
          id="buscar-cliente-bitacora"
          type="search"
          placeholder="Buscar cliente..."
          value={terminoBusqueda}
          onChange={(evento) =>
            onBuscar(evento.target.value)
          }
          className="mb-4 w-full rounded-lg border border-slate-600 bg-slate-950 px-4 py-2 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-purple-500"
        />

        <div className="custom-scrollbar max-h-[calc(100vh-300px)] space-y-2 overflow-y-auto pr-2">
          {!hayMiembros && (
            <div className="rounded-lg border border-slate-700 bg-slate-800/40 px-4 py-6 text-center">
              <p className="text-sm font-medium text-slate-300">
                No se encontraron clientes.
              </p>

              {terminoBusqueda.trim() && (
                <p className="mt-1 text-xs text-slate-500">
                  Prueba con otro nombre o correo.
                </p>
              )}
            </div>
          )}

          {miembros.map((miembro) => {
            const estaSeleccionado =
              miembroSeleccionado?.id === miembro.id;

            const cantidadNotas =
              conteoNotas?.[miembro.id] ?? 0;

            return (
              <button
                key={miembro.id}
                type="button"
                onClick={() => onSeleccionar(miembro)}
                aria-pressed={estaSeleccionado}
                className={`w-full rounded-lg border p-3 text-left transition-all duration-200 ${
                  estaSeleccionado
                    ? 'scale-[1.02] border-transparent bg-linear-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'border-slate-700/50 bg-slate-800/50 text-slate-300 hover:border-purple-500/50 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="truncate font-bold">
                    {miembro.nombre || 'Cliente sin nombre'}
                  </p>

                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                      estaSeleccionado
                        ? 'bg-white/15 text-white'
                        : 'bg-purple-500/15 text-purple-300'
                    }`}
                    title={`${cantidadNotas} notas`}
                  >
                    {cantidadNotas}
                  </span>
                </div>

                <p
                  className={`truncate text-xs ${
                    estaSeleccionado
                      ? 'text-purple-200'
                      : 'text-slate-500'
                  }`}
                >
                  {miembro.email || 'Sin correo registrado'}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

export default ListaClientesBitacora;