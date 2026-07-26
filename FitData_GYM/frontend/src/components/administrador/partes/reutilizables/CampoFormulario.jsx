import { memo } from 'react';

function CampoFormulario({
  etiqueta,
  wrapperClassName,
  labelClassName = 'block text-sm text-gray-400 mb-1',
  inputClassName = 'w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none',
  ...props
}) {
  return (
    <div className={wrapperClassName}>
      <label className={labelClassName}>{etiqueta}</label>
      <input {...props} className={inputClassName} />
    </div>
  );
}

export default memo(CampoFormulario);
