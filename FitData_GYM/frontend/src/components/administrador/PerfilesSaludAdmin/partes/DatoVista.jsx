import { memo } from 'react';

function DatoVista({ etiqueta, children }) {
  return (
    <div className="bg-slate-800 rounded-lg p-3">
      <p className="text-slate-400 text-xs">{etiqueta}</p>
      <p className="text-white font-semibold">{children}</p>
    </div>
  );
}

export default memo(DatoVista);
