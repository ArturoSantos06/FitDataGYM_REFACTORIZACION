import { memo } from 'react';

function SelectSiNo({ etiqueta, value, onChange }) {
  return (
    <div className="col-span-12 md:col-span-6">
      <label className="block text-xs font-semibold text-slate-300 mb-2 uppercase">{etiqueta}</label>
      <select
        value={value === null ? '' : value}
        onChange={(e) => onChange(e.target.value === '' ? null : e.target.value === 'true')}
        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white focus:border-blue-500 outline-none"
      >
        <option value="">Todos</option>
        <option value="true">Sí</option>
        <option value="false">No</option>
      </select>
    </div>
  );
}

export default memo(SelectSiNo);
