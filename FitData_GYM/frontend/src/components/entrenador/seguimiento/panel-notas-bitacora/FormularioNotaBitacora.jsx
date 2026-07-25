function FormularioNotaBitacora({
  textoNota = '',
  notaEditando = null,
  onCambiarTexto,
  onGuardar,
  onCancelarEdicion,
}) {
  const estaEditando = Boolean(notaEditando);

  return (
    <section className="rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
      <form onSubmit={onGuardar}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h3 className="flex items-center gap-2 text-lg font-bold text-white">
            <span aria-hidden="true">
              {estaEditando ? '✏️' : '➕'}
            </span>

            {estaEditando
              ? 'Editar nota'
              : 'Nueva observación'}
          </h3>

          {estaEditando && (
            <button
              type="button"
              onClick={onCancelarEdicion}
              className="text-sm font-bold text-red-400 transition-colors hover:text-red-300"
            >
              Cancelar edición
            </button>
          )}
        </div>

        <label
          htmlFor="texto-nota-bitacora"
          className="sr-only"
        >
          Observaciones del entrenador
        </label>

        <textarea
          id="texto-nota-bitacora"
          value={textoNota}
          onChange={(evento) =>
            onCambiarTexto(evento.target.value)
          }
          placeholder="Escribe tus observaciones técnicas aquí..."
          className="min-h-30 w-full resize-y rounded-lg border border-slate-600 bg-slate-950 px-4 py-3 text-white outline-none transition-colors placeholder:text-slate-500 focus:border-purple-500"
          required
        />

        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-linear-to-r from-purple-600 to-blue-600 px-6 py-2.5 font-bold text-white shadow-lg shadow-purple-900/50 transition-all hover:scale-105 hover:from-purple-500 hover:to-blue-500"
          >
            <span aria-hidden="true">💾</span>

            {estaEditando
              ? 'Actualizar nota'
              : 'Guardar nota'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default FormularioNotaBitacora;