function ModalClientesEntrenador({ entrenador, onCerrar }) {
  if (!entrenador) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">
            Clientes de {entrenador.name}
          </h3>

          <button
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar lista de clientes"
            className="text-slate-400 transition-colors hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          {entrenador.clients.length > 0 ? (
            entrenador.clients.map((cliente) => (
              <div
                key={`${entrenador.id}-${cliente}`}
                className="flex items-center gap-3 rounded-lg border border-slate-700/50 bg-slate-800/50 p-3"
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-purple-500"
                />

                <span className="text-sm text-slate-200">
                  {cliente}
                </span>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-sm italic text-slate-500">
              Este entrenador aún no tiene clientes vinculados.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onCerrar}
          className="mt-6 w-full rounded-lg bg-slate-800 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          Cerrar lista
        </button>
      </div>
    </div>
  );
}

export default ModalClientesEntrenador;