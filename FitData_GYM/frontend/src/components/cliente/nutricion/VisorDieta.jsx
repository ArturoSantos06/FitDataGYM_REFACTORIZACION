import React from 'react';
import { Eye, Download, CalendarClock, FileText, RefreshCw } from 'lucide-react';
import { useDietaVigente } from './hooks/useDietaVigente';

const formatDate = (value) => {
  if (!value) return 'Sin fecha disponible';
  try {
    const dateValue = value?.toDate?.() || new Date(value);
    if (Number.isNaN(dateValue.getTime())) return 'Sin fecha disponible';
    return dateValue.toLocaleString('es-MX', {
      day: '2-digit', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return 'Sin fecha disponible';
  }
};

const TarjetaDieta = ({ archivo, alAbrir, alDescargar, estaDescargando }) => (
  <div className="space-y-4">
    <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-emerald-200">Dieta vigente</p>
          <h4 className="mt-1 text-lg font-bold text-white wrap-break-word">
            {archivo.title || archivo.originalFileName || 'Plan alimenticio'}
          </h4>
          {archivo.notes && (
            <p className="mt-2 text-sm text-slate-300 wrap-break-word">{archivo.notes}</p>
          )}
        </div>

        <div className="shrink-0 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-2 text-xs text-cyan-200">
          <div className="flex items-center gap-2">
            <CalendarClock size={14} />
            <span>{formatDate(archivo.createdAt || archivo.updatedAt)}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <button
          type="button"
          onClick={alAbrir}
          disabled={!archivo.downloadURL}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Eye size={16} />
          Consultar dieta
        </button>

        <button
          type="button"
          onClick={alDescargar}
          disabled={estaDescargando}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-500 bg-cyan-500/10 px-4 py-3 text-sm font-bold text-cyan-200 transition hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download size={16} />
          {estaDescargando ? 'Descargando...' : 'Descargar dieta'}
        </button>
      </div>
    </div>

    <div className="flex items-center gap-2 text-xs text-slate-400">
      <FileText size={14} />
      <span>Se muestra la versión más reciente de tu expediente nutricional.</span>
    </div>
  </div>
);

// Componente Principal
function VisorDieta() {
  const {
    loading, downloading, error, latestDietFile,
    refrescar, handleOpenDocument, handleDownloadDocument
  } = useDietaVigente();

  return (
    <div className="w-full animate-fade-in">
      <div className="relative w-full rounded-2xl border border-emerald-600/30 bg-linear-to-br from-slate-900 via-slate-900 to-slate-950 p-6 shadow-2xl shadow-emerald-950/20 overflow-hidden">
        <div className="absolute top-0 left-0 h-1.5 w-full bg-linear-to-r from-emerald-500 to-cyan-400" />

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-emerald-200">Consulta y Descarga de Dieta</h3>
            <p className="mt-1.5 text-sm text-slate-300">
              Revisa tu plan alimenticio vigente en línea y descárgalo desde cualquier dispositivo.
            </p>
          </div>

          <button
            type="button"
            onClick={refrescar}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw size={16} />
            Actualizar
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-5">
          {loading && <p className="text-sm text-slate-300">Cargando tu dieta vigente...</p>}

          {!loading && error && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
          )}

          {!loading && !error && !latestDietFile && (
            <p className="rounded-xl border border-dashed border-slate-600 px-4 py-5 text-sm text-slate-300">
              Aún no tienes una dieta vigente publicada por tu nutriólogo.
            </p>
          )}

          {!loading && !error && latestDietFile && (
            <TarjetaDieta 
              archivo={latestDietFile}
              alAbrir={handleOpenDocument}
              alDescargar={handleDownloadDocument}
              estaDescargando={downloading}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default VisorDieta;