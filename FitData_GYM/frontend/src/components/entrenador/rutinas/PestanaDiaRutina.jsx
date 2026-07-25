function PestanaDiaRutina({ dia, activa, cantidadEjercicios, alSeleccionar }) {
  const clase = activa
    ? 'border-blue-500 text-white bg-slate-900'
    : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-900/50';

  return <button type="button" onClick={() => alSeleccionar(dia)}
    className={`shrink-0 px-4 py-3 text-sm font-semibold transition-colors border-b-2 ${clase}`}>
    {dia}
    {cantidadEjercicios > 0 && <span className="ml-1.5 text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full">{cantidadEjercicios}</span>}
  </button>;
}

export default PestanaDiaRutina;
