export function TarjetaResumen({ icono, titulo, valor, subtitulo, tonoClases }) {
  return (
    <article className={`rounded-2xl border p-5 shadow-lg ${tonoClases}`}>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
          {titulo}
        </p>
        {icono}
      </div>
      <p className="text-2xl font-extrabold text-white">{valor}</p>
      <p className="mt-1 text-xs text-slate-400">{subtitulo}</p>
    </article>
  );
}
