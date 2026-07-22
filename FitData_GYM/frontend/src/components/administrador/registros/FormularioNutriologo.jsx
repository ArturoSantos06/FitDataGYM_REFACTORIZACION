const FIELD_CLASS = 'w-full bg-slate-950/70 border border-slate-600/80 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 transition-all';
const CARD_CLASS = 'rounded-xl bg-slate-900/30 p-4 md:p-5 border-b border-slate-700/40';
const LABEL_CLASS = 'block text-xs tracking-wide uppercase font-semibold text-slate-300 mb-1.5';

function FormularioNutriologo({ formData, onChange, onSubmit, cargando }) {
  return (
    <form onSubmit={onSubmit} className="grid grid-cols-12 gap-4 md:gap-5">
      <section className={`${CARD_CLASS} col-span-12`}>
        <h3 className="text-sm font-bold text-slate-200 mb-3">Datos personales</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <label htmlFor="nutriologo-email" className={LABEL_CLASS}>Correo Electrónico</label>
            <input id="nutriologo-email" type="email" name="email" value={formData.email} onChange={onChange} className={FIELD_CLASS} autoComplete="email" required />
          </div>

          <div className="col-span-12 md:col-span-6">
            <label htmlFor="nutriologo-first-name" className={LABEL_CLASS}>Nombre(s)</label>
            <input id="nutriologo-first-name" type="text" name="first_name" value={formData.first_name} onChange={onChange} className={FIELD_CLASS} autoComplete="given-name" required />
          </div>

          <div className="col-span-12 md:col-span-6">
            <label htmlFor="nutriologo-last-name" className={LABEL_CLASS}>Apellidos</label>
            <input id="nutriologo-last-name" type="text" name="last_name" value={formData.last_name} onChange={onChange} className={FIELD_CLASS} autoComplete="family-name" required />
          </div>

          <div className="col-span-12 md:col-span-6">
            <label htmlFor="nutriologo-specialty" className={LABEL_CLASS}>Especialidad</label>
            <input
              id="nutriologo-specialty"
              type="text"
              name="especialidad"
              value={formData.especialidad}
              onChange={onChange}
              className={FIELD_CLASS}
              placeholder="Ej: Nutrición Deportiva"
              required
            />
          </div>
        </div>
      </section>

      <section className={`${CARD_CLASS} col-span-12`}>
        <h3 className="text-sm font-bold text-slate-200 mb-3">Acceso</h3>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <label htmlFor="nutriologo-password" className={LABEL_CLASS}>Contraseña</label>
            <input id="nutriologo-password" type="password" name="password" value={formData.password} onChange={onChange} className={FIELD_CLASS} autoComplete="new-password" required />
          </div>
          <div className="col-span-12 md:col-span-6">
            <label htmlFor="nutriologo-confirm-password" className={LABEL_CLASS}>Confirmar Contraseña</label>
            <input id="nutriologo-confirm-password" type="password" name="confirm_password" value={formData.confirm_password} onChange={onChange} className={FIELD_CLASS} autoComplete="new-password" required />
          </div>
        </div>
      </section>

      <div className="col-span-12 mt-1">
        <button
          type="submit"
          disabled={cargando}
          aria-busy={cargando}
          className={`w-full rounded-lg bg-linear-to-r from-fuchsia-600 via-violet-600 to-cyan-600 px-5 py-3.5 text-white font-black tracking-wide shadow-xl transition-all hover:brightness-110 active:scale-[0.99] flex justify-center items-center gap-2 ${cargando ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {cargando ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Procesando...</span>
            </>
          ) : (
            'Registrar Nutriólogo'
          )}
        </button>
      </div>
    </form>
  );
}

export default FormularioNutriologo;
