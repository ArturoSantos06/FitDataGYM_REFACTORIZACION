function BotonDiaEntrenamiento({ dia, activo, alAlternar }) {
  const clase = activo
    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/40'
    : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-slate-200';

  return <button type="button" onClick={() => alAlternar(dia)}
    className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all ${clase}`}>
    {dia}
  </button>;
}

export default BotonDiaEntrenamiento;
