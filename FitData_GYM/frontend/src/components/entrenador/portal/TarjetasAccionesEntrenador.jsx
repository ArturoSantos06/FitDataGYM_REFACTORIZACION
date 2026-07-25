import { CalendarDays, NotebookPen } from 'lucide-react';

function TarjetaAccion({ etiqueta, titulo, descripcion, claseBorde, claseFondo, claseHover, claseIcono, Icono, alAbrir }) {
  return <button type="button" onClick={alAbrir}
    className={`rounded-2xl border ${claseBorde} ${claseFondo} p-5 text-left ${claseHover} transition-all`}>
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300 font-bold mb-2">{etiqueta}</p>
        <h2 className="text-xl font-bold text-white">{titulo}</h2>
        <p className="text-sm text-slate-400 mt-2">{descripcion}</p>
      </div>
      <Icono className={claseIcono} size={28} />
    </div>
  </button>;
}

function TarjetasAccionesEntrenador({ alAbrirCitas, alAbrirBitacora }) {
  return <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
    <TarjetaAccion etiqueta="Agenda" titulo="Citas Entrenador" descripcion="Organiza sesiones y abre expedientes de entrenamiento."
      claseBorde="border-cyan-800/40" claseFondo="bg-linear-to-r from-slate-900 to-[#10253b]" claseHover="hover:border-cyan-500/50"
      claseIcono="text-cyan-400" Icono={CalendarDays} alAbrir={alAbrirCitas} />
    <TarjetaAccion etiqueta="Seguimiento" titulo="Bitácora Entrenador" descripcion="Guarda notas privadas y seguimiento de cada alumno."
      claseBorde="border-blue-800/40" claseFondo="bg-linear-to-r from-slate-900 to-[#1a2340]" claseHover="hover:border-blue-500/50"
      claseIcono="text-blue-400" Icono={NotebookPen} alAbrir={alAbrirBitacora} />
  </div>;
}

export default TarjetasAccionesEntrenador;
