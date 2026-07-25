function EncabezadoRegistro({ titulo = 'Registro', descripcion }) {
  return (
    <div className="mb-8 relative">
      <div className="absolute -top-8 left-0 w-96 h-24 bg-linear-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20 blur-3xl rounded-full" />
      <div className="relative">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-wide text-blue-400">
          {titulo}
        </h2>
      </div>
      {descripcion ? (
        <p className="text-slate-400 text-sm mt-3 tracking-wide">{descripcion}</p>
      ) : null}
    </div>
  );
}

export default EncabezadoRegistro;
