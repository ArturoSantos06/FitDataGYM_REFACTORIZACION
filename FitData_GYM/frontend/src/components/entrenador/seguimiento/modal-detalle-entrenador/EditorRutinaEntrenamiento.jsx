function EditorRutinaEntrenamiento({
  estaEditando,
  contenidoRutina,
  bloqueado,
  onCambiarContenido,
}) {
  return (
    <section className="space-y-2">
      <label
        htmlFor="contenido-rutina-entrenamiento"
        className="ml-1 text-[10px] font-black uppercase tracking-widest text-slate-500"
      >
        Detalles de la rutina
      </label>

      {estaEditando ? (
        <textarea
          id="contenido-rutina-entrenamiento"
          value={contenidoRutina}
          onChange={(evento) =>
            onCambiarContenido(
              evento.target.value,
            )
          }
          disabled={bloqueado}
          autoFocus
          placeholder="Describe los ejercicios de la sesión..."
          className="min-h-45 w-full resize-y rounded-2xl border border-orange-500/50 bg-[#0f172a] p-5 text-sm font-medium text-white outline-none transition-colors placeholder:text-slate-600 focus:ring-2 focus:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
        />
      ) : (
        <div className="max-h-56 overflow-y-auto rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-inner">
          <p className="whitespace-pre-line text-sm font-medium leading-relaxed text-slate-300">
            {contenidoRutina ||
              'No se han definido ejercicios para esta sesión.'}
          </p>
        </div>
      )}
    </section>
  );
}

export default EditorRutinaEntrenamiento;