import {
  CreditCard,
  Hash,
} from 'lucide-react';

function SeccionFiscalBancariaPerfil({
  form = {},
  inputClass = '',
  labelClass = '',
  onChange,
}) {
  return (
    <section
      aria-labelledby="titulo-datos-fiscales"
      className="rounded-xl border border-slate-800 bg-slate-950/30 p-4"
    >
      <h3
        id="titulo-datos-fiscales"
        className="mb-4 text-sm font-semibold text-cyan-300 md:text-base"
      >
        Datos fiscales y bancarios
      </h3>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label
            htmlFor="rfc-entrenador"
            className={`${labelClass} font-semibold text-emerald-300`}
          >
            RFC
          </label>

          <div className="relative">
            <Hash
              size={18}
              aria-hidden="true"
              className="absolute left-3 top-3.5 text-emerald-400"
            />

            <input
              id="rfc-entrenador"
              type="text"
              name="rfc"
              value={form.rfc ?? ''}
              onChange={onChange}
              placeholder="Ej: XAXX010101000"
              maxLength={13}
              autoComplete="off"
              className={`${inputClass} border-emerald-500/30 bg-emerald-900/10 uppercase text-white focus:border-emerald-500`}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="clabe-entrenador"
            className={`${labelClass} font-semibold text-fuchsia-300`}
          >
            CLABE
          </label>

          <div className="relative">
            <CreditCard
              size={18}
              aria-hidden="true"
              className="absolute left-3 top-3.5 text-fuchsia-400"
            />

            <input
              id="clabe-entrenador"
              type="text"
              name="clabe"
              value={form.clabe ?? ''}
              onChange={onChange}
              placeholder="18 dígitos"
              inputMode="numeric"
              maxLength={18}
              autoComplete="off"
              className={`${inputClass} border-fuchsia-500/30 bg-fuchsia-900/10 text-white focus:border-fuchsia-500`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeccionFiscalBancariaPerfil;