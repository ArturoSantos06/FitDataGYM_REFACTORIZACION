import { Users } from 'lucide-react';

function TarjetaAlumno({ alumno, alAbrirRutina }) {
  const nombreCompleto = `${alumno.nombre || ''} ${alumno.apellido || ''}`.trim();
  const matricula = alumno.matricula || alumno.id || 'N/D';

  return <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
    <p onClick={() => alAbrirRutina(alumno)} className="text-white font-semibold cursor-pointer select-none hover:text-blue-400 transition-colors" title="Clic para abrir rutina">
      {nombreCompleto || 'Sin nombre registrado'}
    </p>
    <p className="text-slate-400 text-xs mt-1">Matrícula: {matricula}</p>
    <p className="text-slate-500 text-xs mt-1">Clic en el nombre para crear rutina</p>
  </div>;
}

function ListaAlumnosEntrenador({ alumnos, cargando, error, alAbrirRutina }) {
  const mostrarVacia = !cargando && !error && alumnos.length === 0;
  const mostrarAlumnos = !cargando && !error && alumnos.length > 0;

  return <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2 text-slate-200 font-semibold"><Users size={18} />Lista de asignados</div>
      <span className="text-xs md:text-sm text-slate-400">{alumnos.length} alumno(s)</span>
    </div>
    {cargando && <div className="py-10 text-center text-slate-400">Cargando alumnos...</div>}
    {error && !cargando && <div className="py-10 text-center text-red-400">{error}</div>}
    {mostrarVacia && <div className="py-10 text-center text-slate-400">No se encontraron alumnos con ese criterio.</div>}
    {mostrarAlumnos && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{alumnos.map((alumno) => <TarjetaAlumno key={alumno.id} alumno={alumno} alAbrirRutina={alAbrirRutina} />)}</div>}
  </div>;
}

export default ListaAlumnosEntrenador;
