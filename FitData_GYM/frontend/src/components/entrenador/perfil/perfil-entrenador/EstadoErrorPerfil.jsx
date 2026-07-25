function EstadoErrorPerfil({
  error = 'No se pudo cargar el perfil.',
}) {
  return (
    <div className="flex min-h-100 w-full items-center justify-center">
      <div
        role="alert"
        className="max-w-md rounded-lg border border-red-500 bg-red-900/20 p-6 text-center"
      >
        <p className="mb-4 text-red-400">
          {error}
        </p>

        <a
          href="/entrenador/login"
          className="inline-block rounded-lg bg-cyan-600 px-6 py-2 font-medium text-white transition-all hover:bg-cyan-500"
        >
          Iniciar sesión como entrenador
        </a>
      </div>
    </div>
  );
}

export default EstadoErrorPerfil;