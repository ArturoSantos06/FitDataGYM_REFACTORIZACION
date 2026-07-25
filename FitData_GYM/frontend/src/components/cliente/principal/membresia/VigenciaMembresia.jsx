import {
  calculateMembershipProgress,
  calculateTimeRemaining
} from './membresiaFechas';

export default function VigenciaMembresia({ membership, isDayPass, currentTime }) {
  const timeRemaining = calculateTimeRemaining(membership.end_date, {
    isDayPass,
    dayPassBaseDate: membership.start_date || membership.end_date,
    now: currentTime
  });
  const isExpired = timeRemaining.toLowerCase().includes('vencid');
  const progress = calculateMembershipProgress(membership, isDayPass, currentTime);
  const progressPercentage = progress === 0 && !isExpired ? 5 : progress;

  return (
    <div className="w-full max-w-2xl bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <span className="text-slate-300 text-base font-semibold tracking-wide">Tu Vigencia</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm uppercase">Tiempo restante</span>
          <span className="text-3xl font-extrabold text-blue-400 drop-shadow-[0_2px_6px_rgba(56,189,248,0.35)]">
            {timeRemaining || 'Cargando...'}
          </span>
        </div>
      </div>
      <div className="mt-5 h-4 bg-slate-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-linear-to-r from-purple-500 to-blue-500 transition-all duration-700"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
}
