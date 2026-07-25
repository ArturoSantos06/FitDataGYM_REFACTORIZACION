function TarjetaInformativaEntrenador({ etiqueta, titulo, descripcion, claseBorde, claseSombra }) {
  return (
    <div className={`bg-slate-800 p-8 rounded-xl shadow-xl border ${claseBorde} hover:shadow-2xl ${claseSombra} transition-all duration-300 transform hover:-translate-y-1`}>
      <p className="text-sm uppercase tracking-[0.2em] text-cyan-300 font-bold mb-2">{etiqueta}</p>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{titulo}</h2>
      <p className="text-gray-300 leading-relaxed text-lg">{descripcion}</p>
    </div>
  );
}

export default TarjetaInformativaEntrenador;
