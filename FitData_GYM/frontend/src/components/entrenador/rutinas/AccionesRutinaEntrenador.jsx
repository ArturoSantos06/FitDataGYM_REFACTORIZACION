function AccionesRutinaEntrenador({ guardando, eliminando, cargando, alEliminar }) {
  const deshabilitado = guardando || eliminando || cargando;

  return <div className="flex flex-col sm:flex-row gap-3">
    <button type="submit" disabled={deshabilitado}
      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-colors">
      {guardando ? 'Guardando…' : 'Guardar rutina digital'}
    </button>
    <button type="button" onClick={alEliminar} disabled={deshabilitado}
      className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold transition-colors">
      {eliminando ? 'Eliminando…' : 'Eliminar rutina'}
    </button>
  </div>;
}

export default AccionesRutinaEntrenador;
