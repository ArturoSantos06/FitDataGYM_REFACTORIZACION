const TIPOS_SERVICIO = [
  {
    name: 'offersPersonalService',
    titulo: 'Servicio personal',
    descripcion:
      'Entrenamiento uno a uno con precio propio.',
    claseCheckbox:
      'text-cyan-500 focus:ring-cyan-500',
  },
  {
    name: 'offersGroupService',
    titulo: 'Servicio grupal',
    descripcion:
      'Clases o sesiones en grupo con precio propio.',
    claseCheckbox:
      'text-emerald-500 focus:ring-emerald-500',
  },
];

function SeccionServiciosPerfil({
  form = {},
  onChange,
}) {
  return (
    <fieldset className="rounded-xl border border-slate-800 bg-slate-950/30 p-4">
      <legend className="mb-4 px-1 text-sm font-semibold text-fuchsia-300 md:text-base">
        Tipos de servicio ofrecidos
      </legend>

      <div className="grid gap-4 md:grid-cols-2">
        {TIPOS_SERVICIO.map(
          ({
            name,
            titulo,
            descripcion,
            claseCheckbox,
          }) => (
            <label
              key={name}
              htmlFor={name}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-slate-700 bg-slate-900/70 p-4 transition-colors hover:border-slate-600"
            >
              <input
                id={name}
                type="checkbox"
                name={name}
                checked={Boolean(form[name])}
                onChange={onChange}
                className={`mt-1 h-4 w-4 rounded border-slate-500 ${claseCheckbox}`}
              />

              <span>
                <span className="block font-semibold text-white">
                  {titulo}
                </span>

                <span className="block text-sm text-slate-400">
                  {descripcion}
                </span>
              </span>
            </label>
          ),
        )}
      </div>
    </fieldset>
  );
}

export default SeccionServiciosPerfil;