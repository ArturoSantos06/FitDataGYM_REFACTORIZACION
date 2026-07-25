function PanelCitasDia({
  cliente,
  fechaSeleccionada,
  citas,
  formulario,
  onCambiarFormulario,
  onGuardar,
  onEliminar,
  onCerrar,
}) {
  return (
    <section className="flex w-1/2 flex-col p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">
            {cliente.miembro_nombre}
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            {fechaSeleccionada.toLocaleDateString('es-MX')}
          </p>
        </div>

        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar agenda"
          className="text-2xl text-slate-400 transition-colors hover:text-white"
        >
          ×
        </button>
      </div>

      <div className="mb-6 flex-1 space-y-4 overflow-y-auto">
        {citas.length > 0 ? (
          citas.map((cita) => (
            <div
              key={cita.id}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-4"
            >
              <p className="text-sm font-semibold text-white">
                {cita.hora_inicio} - {cita.hora_fin}
              </p>

              <button
                type="button"
                onClick={() => onEliminar(cita.id)}
                className="mt-3 text-xs text-red-400 hover:text-red-300"
              >
                Eliminar
              </button>
            </div>
          ))
        ) : (
          <p className="py-8 text-center text-sm text-slate-500">
            Sin citas programadas
          </p>
        )}
      </div>

      <div className="border-t border-slate-700 pt-6">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
          Nueva cita
        </p>

        <div className="space-y-3">
          <label className="block">
            <span className="sr-only">Hora de inicio</span>
            <input
              type="time"
              value={formulario.inicio}
              onChange={(evento) =>
                onCambiarFormulario({
                  ...formulario,
                  inicio: evento.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            />
          </label>

          <label className="block">
            <span className="sr-only">Hora de finalización</span>
            <input
              type="time"
              value={formulario.fin}
              onChange={(evento) =>
                onCambiarFormulario({
                  ...formulario,
                  fin: evento.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            />
          </label>

          <button
            type="button"
            onClick={onGuardar}
            className="w-full rounded-lg bg-cyan-600 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-500"
          >
            Guardar cita
          </button>
        </div>
      </div>
    </section>
  );
}

export default PanelCitasDia;