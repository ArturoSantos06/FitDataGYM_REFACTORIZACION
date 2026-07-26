import { useState } from 'react';
import formatearFecha from './hooks/formatearFecha';
import BotonImagenAmpliable from './partes/BotonImagenAmpliable';
import VisorImagenAmpliada from './partes/VisorImagenAmpliada';

function TarjetaReporteMantenimiento({ reporte, mostrarAccionResolver = false, onResolver, resolviendo = false }) {
  const pendiente = String(reporte?.estado || '').toLowerCase() !== 'resuelto';
  const [imagenActiva, setImagenActiva] = useState('');

  return (
    <article className="overflow-hidden rounded-2xl border border-cyan-500/20 bg-slate-900/80 shadow-sm">
      <div className="relative h-44 w-full bg-slate-800">
        {reporte?.maquinaFotoUrl ? (
          <BotonImagenAmpliable
            src={reporte.maquinaFotoUrl}
            alt={reporte.maquinaNombre || 'Maquina'}
            className="h-full w-full cursor-zoom-in"
            onAmpliar={() => setImagenActiva(reporte.maquinaFotoUrl)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300">Sin foto de maquina</div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 to-transparent px-4 pb-3 pt-8 text-white">
          <h3 className="text-2xl font-bold leading-tight">{reporte?.maquinaNombre || 'Maquina'}</h3>
          <p className="text-sm text-slate-200">{formatearFecha(reporte?.creadoEn)}</p>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <p className="text-base text-slate-100">{reporte?.descripcion || 'Sin descripcion'}</p>

        {reporte?.fotoUsuarioUrl && (
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-300">Foto del usuario</p>
            <BotonImagenAmpliable
              src={reporte.fotoUsuarioUrl}
              alt="Evidencia de usuario"
              className="h-28 w-full cursor-zoom-in overflow-hidden rounded-xl"
              onAmpliar={() => setImagenActiva(reporte.fotoUsuarioUrl)}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${pendiente ? 'bg-amber-500/20 text-amber-200' : 'bg-emerald-500/20 text-emerald-200'}`}
          >
            {pendiente ? 'Pendiente' : 'Resuelto'}
          </span>

          {mostrarAccionResolver && pendiente && (
            <button
              type="button"
              onClick={() => onResolver?.(reporte.id)}
              disabled={resolviendo}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {resolviendo ? 'Guardando...' : 'Marcar como resuelto'}
            </button>
          )}
        </div>
      </div>

      {imagenActiva && <VisorImagenAmpliada url={imagenActiva} onCerrar={() => setImagenActiva('')} />}
    </article>
  );
}

export default TarjetaReporteMantenimiento;
