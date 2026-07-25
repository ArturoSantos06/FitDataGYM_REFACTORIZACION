import { ArrowLeft, LogOut } from 'lucide-react';

function EncabezadoVistaEntrenador({ alVolver, alCerrarSesion }) {
  return <div className="flex items-center justify-between gap-3 mb-6">
    <div className="flex items-center gap-2">
      <button type="button" onClick={alVolver}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
        <ArrowLeft size={16} />Volver
      </button>
      <button type="button" onClick={alCerrarSesion}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-300 transition-colors">
        <LogOut size={16} />Cerrar sesión
      </button>
    </div>
    <div className="text-right">
      <h1 className="text-2xl md:text-3xl font-bold">Portal de Entrenador</h1>
      <p className="text-slate-400 text-sm">Alumnos asignados</p>
    </div>
  </div>;
}

export default EncabezadoVistaEntrenador;
