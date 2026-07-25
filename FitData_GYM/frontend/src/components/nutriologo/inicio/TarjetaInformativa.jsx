const ESTILOS_TEMA = {
  esmeralda: {
    borde: 'border-emerald-800/40',
    sombra: 'hover:shadow-emerald-900/20',
    etiqueta: 'text-emerald-300',
  },
  teal: {
    borde: 'border-teal-800/40',
    sombra: 'hover:shadow-teal-900/20',
    etiqueta: 'text-teal-300',
  },
};

export default function TarjetaInformativa({
  etiqueta,
  titulo,
  descripcion,
  tema = 'esmeralda',
}) {
  const estilos = ESTILOS_TEMA[tema] || ESTILOS_TEMA.esmeralda;

  return (
    <div
      className={`transform rounded-xl border bg-slate-800 p-8 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${estilos.borde} ${estilos.sombra}`}
    >
      <p
        className={`mb-2 text-sm font-bold uppercase tracking-[0.2em] ${estilos.etiqueta}`}
      >
        {etiqueta}
      </p>
      <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
        {titulo}
      </h2>
      <p className="text-lg leading-relaxed text-gray-300">{descripcion}</p>
    </div>
  );
}
