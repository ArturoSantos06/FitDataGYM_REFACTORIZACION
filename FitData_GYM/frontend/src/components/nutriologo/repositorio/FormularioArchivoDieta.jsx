import {
  LIMITE_NOTAS_DIETA,
  LIMITE_TITULO_DIETA,
} from '../utils/repositorioDietas';

export default function FormularioArchivoDieta({
  alEnviar,
  titulo,
  alCambiarTitulo,
  notas,
  alCambiarNotas,
  archivo,
  alCambiarArchivo,
  guardando,
  cargando,
}) {
  return (
    <form
      onSubmit={alEnviar}
      className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl"
    >
      <h2 className="text-lg font-semibold text-white">Subir Archivo al Expediente</h2>
      <p className="mt-1 text-sm text-slate-400">
        Formatos permitidos: PDF, JPG o PNG. Tamaño máximo: 10MB.
      </p>

      <div className="mt-4 space-y-4">
        <input
          type="text"
          value={titulo}
          maxLength={LIMITE_TITULO_DIETA}
          onChange={(evento) =>
            alCambiarTitulo(evento.target.value.slice(0, LIMITE_TITULO_DIETA))}
          placeholder="Título del archivo o plan alimenticio"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
        />
        <textarea
          value={notas}
          maxLength={LIMITE_NOTAS_DIETA}
          onChange={(evento) =>
            alCambiarNotas(evento.target.value.slice(0, LIMITE_NOTAS_DIETA))}
          placeholder="Notas opcionales para el expediente"
          rows={4}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
        />

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-slate-600 bg-slate-950/80 px-4 py-6 text-center transition hover:border-cyan-500 hover:bg-slate-950">
          <span className="text-sm font-medium text-white">Seleccionar archivo</span>
          <span className="mt-1 text-xs text-slate-400">
            {archivo
              ? `${archivo.name} • ${(archivo.size / 1024 / 1024).toFixed(2)} MB`
              : 'Haz clic para elegir PDF, JPG o PNG'}
          </span>
          <input
            key={archivo?.name || 'sin-archivo'}
            type="file"
            accept="application/pdf,image/jpeg,image/png"
            className="hidden"
            onChange={alCambiarArchivo}
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={guardando || cargando}
        className="mt-5 w-full rounded-2xl bg-linear-to-r from-cyan-500 to-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {guardando ? 'Guardando archivo...' : 'Guardar en expediente'}
      </button>
    </form>
  );
}
