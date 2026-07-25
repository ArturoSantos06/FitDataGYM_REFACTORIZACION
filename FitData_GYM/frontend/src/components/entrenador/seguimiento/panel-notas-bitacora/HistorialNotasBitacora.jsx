const FORMATO_FECHA = new Intl.DateTimeFormat(
  'es-MX',
  {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  },
);

function convertirAFecha(valor) {
  if (!valor) {
    return null;
  }

  if (typeof valor.toDate === 'function') {
    return valor.toDate();
  }

  if (typeof valor.seconds === 'number') {
    return new Date(valor.seconds * 1000);
  }

  const fecha = new Date(valor);

  return Number.isNaN(fecha.getTime())
    ? null
    : fecha;
}

function formatearFecha(valor) {
  const fecha = convertirAFecha(valor);

  return fecha
    ? FORMATO_FECHA.format(fecha)
    : 'Sin fecha';
}

function notaFueEditada(nota) {
  const fechaCreacion = convertirAFecha(
    nota.createdAt,
  );

  const fechaActualizacion = convertirAFecha(
    nota.updatedAt,
  );

  if (!fechaCreacion || !fechaActualizacion) {
    return false;
  }

  return (
    fechaCreacion.getTime() !==
    fechaActualizacion.getTime()
  );
}

function EstadoCargandoNotas() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="py-8 text-center text-slate-400"
    >
      <div
        aria-hidden="true"
        className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-purple-500"
      />

      <p className="mt-4 font-medium">
        Cargando notas...
      </p>
    </div>
  );
}

function EstadoSinNotas() {
  return (
    <div className="rounded-lg border border-dashed border-purple-900/50 bg-slate-950 py-10 text-center">
      <p
        aria-hidden="true"
        className="mb-3 text-4xl opacity-50"
      >
        📝
      </p>

      <p className="font-bold text-slate-300">
        Sin registros previos
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Agrega la primera observación usando el
        formulario de arriba.
      </p>
    </div>
  );
}

function TarjetaNotaBitacora({
  nota,
  onEditar,
  onEliminar,
}) {
  const fueEditada = notaFueEditada(nota);

  return (
    <article className="rounded-lg border border-slate-700 bg-slate-800 p-5 shadow-md transition-colors hover:border-purple-500/50">
      <div className="mb-4 flex items-start justify-between gap-4 border-b border-slate-700/50 pb-3">
        <div className="min-w-0 flex-1">
          <p className="mb-1 text-xs font-bold uppercase tracking-wider text-purple-400">
            <span aria-hidden="true">📅 </span>

            {formatearFecha(nota.createdAt)}

            {fueEditada && (
              <span className="ml-2 font-normal normal-case text-slate-500">
                Editado: {formatearFecha(nota.updatedAt)}
              </span>
            )}
          </p>

          <p className="truncate text-xs font-medium text-slate-400">
            <span aria-hidden="true">👤 </span>
            Por:{' '}

            <span className="text-slate-300">
              {nota.trainerEmail || 'Entrenador'}
            </span>
          </p>
        </div>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => onEditar(nota)}
            className="text-slate-400 transition-colors hover:text-blue-400"
            title="Editar nota"
            aria-label="Editar nota"
          >
            ✏️
          </button>

          <button
            type="button"
            onClick={() => onEliminar(nota.id)}
            className="text-slate-400 transition-colors hover:text-pink-400"
            title="Eliminar nota"
            aria-label="Eliminar nota"
          >
            🗑️
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
        <p className="whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
          {nota.note || 'Sin contenido'}
        </p>
      </div>
    </article>
  );
}

function HistorialNotasBitacora({
  notas = [],
  cargando = false,
  onEditar,
  onEliminar,
}) {
  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
      <h3 className="mb-6 flex items-center gap-2 border-b border-slate-700 pb-3 text-lg font-bold text-white">
        <span aria-hidden="true">📋</span>
        Historial de notas
      </h3>

      {cargando && <EstadoCargandoNotas />}

      {!cargando && notas.length === 0 && (
        <EstadoSinNotas />
      )}

      {!cargando && notas.length > 0 && (
        <div className="custom-scrollbar max-h-125 space-y-4 overflow-y-auto pr-2">
          {notas.map((nota) => (
            <TarjetaNotaBitacora
              key={nota.id}
              nota={nota}
              onEditar={onEditar}
              onEliminar={onEliminar}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default HistorialNotasBitacora;