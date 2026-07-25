function CampoDatosBasicosPerfil({
  campo,
  inputClass = '',
  labelClass = '',
  onChange,
}) {
  const {
    id,
    label,
    Icono,
    type = 'text',
    name,
    value = '',
    options = [],
    placeholder,
    disabled = false,
    min,
    step,
    maxLength,
    inputMode,
    autoComplete,
    claseEtiqueta = '',
    claseIcono = 'text-slate-500',
    claseCampo = '',
  } = campo;

  const propiedadesComunes = {
    id,
    name,
    value,
    disabled,
    onChange,
    className: `${inputClass} ${claseCampo}`,
  };

  return (
    <div>
      <label
        htmlFor={id}
        className={`${labelClass} ${claseEtiqueta}`}
      >
        {label}
      </label>

      <div className="relative">
        <Icono
          size={18}
          aria-hidden="true"
          className={`absolute left-3 top-3.5 ${claseIcono}`}
        />

        {type === 'select' ? (
          <select
            {...propiedadesComunes}
          >
            {options.map((opcion) => (
              <option
                key={opcion}
                value={opcion}
              >
                {opcion}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...propiedadesComunes}
            type={type}
            placeholder={placeholder}
            min={min}
            step={step}
            maxLength={maxLength}
            inputMode={inputMode}
            autoComplete={autoComplete}
          />
        )}
      </div>
    </div>
  );
}

export default CampoDatosBasicosPerfil;