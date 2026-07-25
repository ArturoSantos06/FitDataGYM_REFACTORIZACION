export function MensajeVacio({ titulo, descripcion, mensaje }) {
  const tituloVisible = titulo || mensaje;

  return (
    <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6">
      {tituloVisible && (
        <h3 className="text-lg font-bold text-white">{tituloVisible}</h3>
      )}
      {descripcion && (
        <p className="mt-2 text-sm text-slate-400">{descripcion}</p>
      )}
    </div>
  );
}
