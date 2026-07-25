function CampoNombreRutina({ nombreRutina, archivos, erroresFormulario, alCambiarNombre }) {
  return <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6">
    <label className="block text-sm text-slate-300 mb-2">Nombre de la rutina</label>
    <input type="text" value={nombreRutina} onChange={alCambiarNombre}
      placeholder="Ej. Fuerza Tren Superior – Semana 1"
      className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      required={archivos.length === 0} />
    {erroresFormulario.routineName && <p className="text-red-400 text-xs mt-2">{erroresFormulario.routineName}</p>}
  </div>;
}

export default CampoNombreRutina;
