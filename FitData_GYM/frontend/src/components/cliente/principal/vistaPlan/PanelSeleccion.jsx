function PanelSeleccion({ title, description, accentClass, titleClass, children }) {
  return (
    <div className="flex w-full justify-center">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-xl border border-slate-700 bg-gray-800 p-8 shadow-2xl">
        <div className={`absolute left-0 top-0 h-1.5 w-full ${accentClass}`} />
        <div className="mb-8 text-center md:text-left">
          <h2 className={`text-2xl font-bold text-transparent bg-clip-text ${titleClass}`}>{title}</h2>
          <p className="mt-1.5 font-medium text-slate-400">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}

export default PanelSeleccion;
