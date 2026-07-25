const CLASE_INPUT =
  'w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-emerald-500 disabled:cursor-not-allowed disabled:opacity-60';

function CampoContrasena({
  id,
  label,
  value,
  autoComplete,
  disabled = false,
  minLength,
  onChange,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1 block text-sm text-slate-400"
      >
        {label}
      </label>

      <input
        id={id}
        type="password"
        value={value}
        autoComplete={autoComplete}
        disabled={disabled}
        minLength={minLength}
        onChange={(evento) =>
          onChange(evento.target.value)
        }
        className={CLASE_INPUT}
        required
      />
    </div>
  );
}

export default CampoContrasena;