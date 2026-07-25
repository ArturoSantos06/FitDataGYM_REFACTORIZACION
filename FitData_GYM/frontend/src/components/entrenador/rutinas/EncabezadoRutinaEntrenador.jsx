import { ArrowLeft } from 'lucide-react';

function EncabezadoRutinaEntrenador({ nombreAlumno, alVolver }) {
  return <div className="flex items-center justify-between gap-3">
    <button type="button" onClick={alVolver}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors">
      <ArrowLeft size={16} />Volver
    </button>
    <div className="text-right">
      <h1 className="text-2xl md:text-3xl font-bold">Rutina del Alumno</h1>
      <p className="text-slate-400 text-sm">{nombreAlumno}</p>
    </div>
  </div>;
}

export default EncabezadoRutinaEntrenador;
