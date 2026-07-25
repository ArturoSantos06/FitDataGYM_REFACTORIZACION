const FIELD_CLASS = 'w-full bg-slate-950/70 border border-slate-600/80 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 transition-all';
const CARD_CLASS = 'rounded-xl bg-slate-900/30 p-4 md:p-5 border-b border-slate-700/40';
const LABEL_CLASS = 'block text-xs tracking-wide uppercase font-semibold text-slate-300 mb-1.5';

function SelectorTipoRegistro({ tipoRegistro, onTipoRegistroChange }) {
  if (!onTipoRegistroChange) return null;

  return (
    <section className={`${CARD_CLASS} mb-4`}>
      <label htmlFor="tipo-registro" className={LABEL_CLASS}>Tipo de registro</label>
      <select
        id="tipo-registro"
        value={tipoRegistro}
        onChange={(event) => onTipoRegistroChange(event.target.value)}
        className={FIELD_CLASS}
      >
        <option value="cliente">Cliente</option>
        <option value="entrenador">Entrenador</option>
        <option value="nutriologo">Nutriólogo</option>
      </select>
    </section>
  );
}

export default SelectorTipoRegistro;
