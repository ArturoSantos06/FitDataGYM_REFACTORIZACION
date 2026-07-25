import { MESES } from './utilidadesEntrenadoresYPagos';

function SelectorPeriodo({
  mes,
  anio,
  onMesChange,
  onAnioChange,
  anios,
  mesLabel = 'Mes',
  anioLabel = 'Año',
  compact = false,
}) {
  const selectClass = compact
    ? 'bg-gray-900 border border-gray-600 rounded px-2 py-1 text-white text-xs focus:ring-2 focus:ring-purple-400 outline-none'
    : 'w-full bg-gray-900 border border-gray-600 rounded p-2 text-white text-sm focus:ring-2 focus:ring-emerald-400 outline-none';

  return (
    <div className={compact ? 'flex gap-2' : 'grid grid-cols-1 md:grid-cols-2 gap-3'}>
      <label className={compact ? 'sr-only' : 'block text-xs font-semibold text-gray-300'}>
        {mesLabel}
        <select
          value={mes}
          onChange={(event) => onMesChange(Number(event.target.value))}
          className={selectClass}
          aria-label={mesLabel}
        >
          {MESES.map((month) => (
            <option key={month} value={month}>
              {new Date(2000, month - 1).toLocaleDateString('es-MX', { month: compact ? 'short' : 'long' })}
            </option>
          ))}
        </select>
      </label>
      <label className={compact ? 'sr-only' : 'block text-xs font-semibold text-gray-300'}>
        {anioLabel}
        <select
          value={anio}
          onChange={(event) => onAnioChange(Number(event.target.value))}
          className={selectClass}
          aria-label={anioLabel}
        >
          {anios.map((year) => <option key={year} value={year}>{year}</option>)}
        </select>
      </label>
    </div>
  );
}

export default SelectorPeriodo;
