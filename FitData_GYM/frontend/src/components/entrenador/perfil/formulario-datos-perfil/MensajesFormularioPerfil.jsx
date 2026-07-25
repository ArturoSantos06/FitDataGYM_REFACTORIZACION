function MensajesFormularioPerfil({
  error = '',
  exito = '',
}) {
  if (!error && !exito) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      className="space-y-3"
    >
      {error && (
        <div
          role="alert"
          className="rounded-lg border border-red-700 bg-red-900/20 p-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {exito && (
        <div
          role="status"
          className="rounded-lg border border-green-700 bg-green-900/20 p-3 text-sm text-green-400"
        >
          {exito}
        </div>
      )}
    </div>
  );
}

export default MensajesFormularioPerfil;