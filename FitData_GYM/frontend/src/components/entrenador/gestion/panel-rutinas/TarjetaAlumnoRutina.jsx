import { obtenerNombreCompleto } from './alumnosRutinasUtils';

function TarjetaAlumnoRutina({ alumno, onAbrir }) {
  const nombre =
    obtenerNombreCompleto(alumno) ||
    'Sin nombre registrado';

  const matricula =
    alumno.matricula || alumno.id || 'N/D';

  return (
    <button
      type="button"
      onClick={() => onAbrir(alumno)}
      className="group rounded-xl border border-slate-700 bg-slate-900 p-5 text-left shadow-md transition-all hover:border-emerald-500/50 hover:bg-slate-800"
    >
      <p className="truncate text-lg font-bold text-white transition-colors group-hover:text-emerald-300">
        {nombre}
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Matrícula: {matricula}
      </p>

      <p className="mt-3 text-xs text-slate-500 transition-colors group-hover:text-emerald-500/70">
        Clic para abrir o editar rutina
      </p>
    </button>
  );
}

export default TarjetaAlumnoRutina;