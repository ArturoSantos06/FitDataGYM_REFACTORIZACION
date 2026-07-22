import { memo } from 'react';

function CampoCasilla({ name, checked, onChange, etiqueta }) {
  return (
    <div className="flex items-center gap-2">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} className="w-4 h-4" />
      <label className="text-sm text-slate-200">{etiqueta}</label>
    </div>
  );
}

export default memo(CampoCasilla);
