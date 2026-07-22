import { memo } from 'react';

function CampoFormulario({ etiqueta, className, ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm text-gray-400 mb-1">{etiqueta}</label>
      <input
        {...props}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

export default memo(CampoFormulario);
