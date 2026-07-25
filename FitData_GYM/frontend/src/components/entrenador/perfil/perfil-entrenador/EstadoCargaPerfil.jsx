function EstadoCargaPerfil() {
  return (
    <div className="flex min-h-100 w-full items-center justify-center">
      <div
        role="status"
        aria-live="polite"
        className="text-center"
      >
        <div
          aria-hidden="true"
          className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-cyan-500"
        />

        <p className="text-slate-400">
          Cargando perfil...
        </p>
      </div>
    </div>
  );
}

export default EstadoCargaPerfil;