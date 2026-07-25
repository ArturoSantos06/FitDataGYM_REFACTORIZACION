export function TarjetaArchivo({
  archivo,
  alDescargar,
  alSolicitarEliminar,
  guardando,
}) {
  const fecha = archivo.createdAt?.toDate?.() || archivo.updatedAt?.toDate?.() || null;
  const esPdf = archivo.contentType === 'application/pdf';

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/70 p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-all text-base font-semibold text-white">
              {archivo.title || archivo.originalFileName}
            </h3>
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[11px] uppercase tracking-wide text-cyan-300">
              {esPdf ? 'PDF' : 'Imagen'}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-300">
            Paciente: {archivo.nombrePacienteResuelto || 'Sin nombre'}
          </p>
          <p className="mt-1 break-all text-xs text-slate-500">
            {archivo.originalFileName}
          </p>
          {archivo.notes && (
            <p className="mt-3 wrap-break-word text-sm text-slate-400">
              {archivo.notes}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Subido por: {archivo.uploadedBy || 'administración'}</span>
            <span>{fecha ? fecha.toLocaleString('es-MX') : 'Sin fecha'}</span>
            <span>
              {archivo.size
                ? `${(archivo.size / 1024 / 1024).toFixed(2)} MB`
                : 'Tamaño no disponible'}
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <a
            href={archivo.downloadURL}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
          >
            Abrir
          </a>
          <button
            type="button"
            onClick={() => alDescargar(archivo)}
            className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/20"
          >
            Descargar
          </button>
          <button
            type="button"
            onClick={() => alSolicitarEliminar(archivo)}
            disabled={guardando}
            className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm font-semibold text-rose-200 transition hover:bg-rose-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
