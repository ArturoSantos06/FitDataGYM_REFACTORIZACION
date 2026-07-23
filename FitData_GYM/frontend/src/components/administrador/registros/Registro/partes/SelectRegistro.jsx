import { memo } from 'react';
import { FIELD_CLASS, LABEL_CLASS } from '../contenido';

function SelectRegistro({ etiqueta, opciones, placeholder, className, ...props }) {
  return (
    <div className={className}>
      {etiqueta && <label className={LABEL_CLASS}>{etiqueta}</label>}
      <select {...props} className={FIELD_CLASS}>
        {placeholder && <option value="">{placeholder}</option>}
        {opciones.map((opcion) => {
          const { value, label } = typeof opcion === 'string' ? { value: opcion, label: opcion } : opcion;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default memo(SelectRegistro);
