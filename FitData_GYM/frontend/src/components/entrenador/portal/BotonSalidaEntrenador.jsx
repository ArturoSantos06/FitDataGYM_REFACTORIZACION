import { LogOut } from 'lucide-react';

function BotonSalidaEntrenador({ alSalir, esMovil = false }) {
  const clase = esMovil
    ? 'flex flex-col items-center justify-center gap-1 text-red-400'
    : 'bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded-md shadow-lg transition-transform active:scale-95 text-sm';

  return <button onClick={alSalir} className={clase}>
    {esMovil && <LogOut size={22} />}
    <span className={esMovil ? 'text-[10px] font-medium' : ''}>Salir</span>
  </button>;
}

export default BotonSalidaEntrenador;
