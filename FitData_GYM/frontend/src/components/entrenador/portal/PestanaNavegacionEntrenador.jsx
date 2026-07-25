function PestanaNavegacionEntrenador({ pestaña, activa, alSeleccionar, esMovil = false }) {
  const Icono = pestaña.icono;
  const claseEscritorio = activa
    ? 'bg-slate-800 text-white border-b-2 border-cyan-400 shadow-[0_4px_12px_-2px_rgba(34,211,238,0.3)] -translate-y-px'
    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border-b-2 border-transparent';
  const claseMovil = `flex flex-col items-center justify-center gap-1 ${activa ? 'text-blue-400' : 'text-slate-500'}`;

  return <button key={pestaña.id} onClick={() => alSeleccionar(pestaña.id)}
    className={esMovil ? claseMovil : `px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${claseEscritorio}`}>
    {esMovil && <Icono size={22} />}
    <span className={esMovil ? 'text-[9px] font-medium truncate w-full px-1 text-center' : ''}>{pestaña.etiqueta}</span>
  </button>;
}

export default PestanaNavegacionEntrenador;
