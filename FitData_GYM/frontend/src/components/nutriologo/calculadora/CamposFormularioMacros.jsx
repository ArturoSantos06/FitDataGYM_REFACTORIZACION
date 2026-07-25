const CLASE_CONTROL =
  'mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white outline-none transition-all focus:border-cyan-500';

export function CampoNumericoMacros({
  nombre,
  etiqueta,
  valor,
  minimo,
  maximo,
  paso,
  ejemplo,
  alCambiar,
}) {
  return (
    <label className="text-sm text-slate-300">
      {etiqueta}
      <input
        name={nombre}
        value={valor}
        onChange={alCambiar}
        type="number"
        min={minimo}
        max={maximo}
        step={paso}
        className={CLASE_CONTROL}
        placeholder={`Ej. ${ejemplo}`}
        required
      />
    </label>
  );
}

export function CampoSeleccionMacros({
  nombre,
  etiqueta,
  valor,
  opciones,
  alCambiar,
  anchoCompleto = false,
}) {
  return (
    <label
      className={`text-sm text-slate-300 ${anchoCompleto ? 'sm:col-span-2' : ''}`}
    >
      {etiqueta}
      <select
        name={nombre}
        value={valor}
        onChange={alCambiar}
        className={CLASE_CONTROL}
      >
        {opciones.map((opcion) => (
          <option key={opcion.valor} value={opcion.valor}>
            {opcion.etiqueta}
          </option>
        ))}
      </select>
    </label>
  );
}
