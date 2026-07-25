function AccionesFormularioPerfil({
  guardando = false,
  onCancelar,
}) {
  return (
    <div className="flex gap-3 pt-2">
      <button
        type="button"
        onClick={onCancelar}
        disabled={guardando}
        className="w-1/3 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-all hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Cancelar
      </button>

      <button
        type="submit"
        disabled={guardando}
        className="w-2/3 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {guardando
          ? 'Guardando...'
          : 'Guardar cambios'}
      </button>
    </div>
  );
}

export default AccionesFormularioPerfil;