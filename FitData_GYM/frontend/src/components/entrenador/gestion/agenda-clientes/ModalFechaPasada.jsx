function ModalFechaPasada({
  visible,
  etiquetaFecha,
  onCerrar,
}) {
  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <p className="mb-4 font-semibold text-white">
          ⚠️ No puedes seleccionar fechas pasadas
        </p>

        <p className="mb-6 text-sm text-slate-300">
          {etiquetaFecha}
        </p>

        <button
          type="button"
          onClick={onCerrar}
          className="w-full rounded-lg bg-slate-800 py-2 font-semibold text-white transition-colors hover:bg-slate-700"
        >
          Entendido
        </button>
      </div>
    </div>
  );
}

export default ModalFechaPasada;