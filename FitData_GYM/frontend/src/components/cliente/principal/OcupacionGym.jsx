import { useOcupacionGym } from './useOcupacionGym';

function OcupacionGym() {
  const {
    activeCount,
    barClass,
    error,
    loading,
    maxCapacity,
    occupancyPercent,
  } = useOcupacionGym();

  return (
    <div className="w-full max-w-2xl bg-slate-900/70 border border-slate-800 rounded-2xl p-4 relative overflow-hidden">
      <div aria-hidden="true" className="absolute -top-10 -right-8 w-28 h-28 rounded-full bg-cyan-400/10 blur-2xl"></div>
      <div className="relative flex items-center justify-between gap-3">
        <span className="text-slate-300 text-sm font-semibold tracking-wide">Aforo en tiempo real</span>
        <span className="text-2xl font-extrabold text-cyan-300" aria-live="polite">
          {loading ? '...' : error ? '--' : `${occupancyPercent}%`}
        </span>
      </div>
      <div
        className="mt-3 h-3 bg-slate-800/90 rounded-full overflow-hidden border border-slate-700/70"
        role="progressbar"
        aria-label="Ocupación actual del gimnasio"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={error || loading ? 0 : occupancyPercent}
      >
        <div
          className={`h-full bg-linear-to-r ${barClass} transition-all duration-700`}
          style={{ width: `${loading || error ? 0 : occupancyPercent}%` }}
        ></div>
      </div>
      {error && (
        <p className="mt-2 text-xs text-rose-300">No se pudo cargar el aforo.</p>
      )}
      {!error && !loading && (
        <p className="mt-2 text-[11px] text-slate-400">{activeCount} de {maxCapacity} lugares estimados</p>
      )}
    </div>
  );
}

export default OcupacionGym;
