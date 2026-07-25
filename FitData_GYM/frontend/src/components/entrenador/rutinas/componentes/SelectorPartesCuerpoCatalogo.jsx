function SelectorPartesCuerpoCatalogo({ partesCuerpo, seleccionada, alSeleccionar }) {
  return <div className="flex flex-wrap gap-2 p-3 border-b border-slate-800 shrink-0">
    {partesCuerpo.map((parte) => <button key={parte.key} type="button" onClick={() => alSeleccionar(parte.key)}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${seleccionada === parte.key
        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/40'
        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200'}`}>
      {parte.label}
    </button>)}
  </div>;
}

export default SelectorPartesCuerpoCatalogo;
