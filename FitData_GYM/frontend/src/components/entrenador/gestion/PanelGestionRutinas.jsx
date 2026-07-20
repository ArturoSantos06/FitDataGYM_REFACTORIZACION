import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAlumnosAsignados from './panel-rutinas/useAlumnosAsignados';
import TarjetaAlumnoRutina from './panel-rutinas/TarjetaAlumnoRutina';
import { filtrarAlumnos } from './panel-rutinas/alumnosRutinasUtils';

function PanelGestionRutinas() {
  const navegar = useNavigate();
  const [terminoBusqueda, setTerminoBusqueda] =
    useState('');

  const {
    alumnos,
    cargando,
    error,
  } = useAlumnosAsignados();

  const alumnosFiltrados = useMemo(
    () => filtrarAlumnos(alumnos, terminoBusqueda),
    [alumnos, terminoBusqueda],
  );

  const abrirRutina = (alumno) => {
    navegar(`/entrenador/rutina/${alumno.id}`, {
      state: { member: alumno },
    });
  };

  const mostrarLista =
    !cargando &&
    !error &&
    alumnosFiltrados.length > 0;

  return (
    <div className="mx-auto max-w-350 rounded-xl border-t-4 border-emerald-500 bg-gray-800 p-6 font-sans shadow-xl">
      <h3 className="mb-6 text-2xl font-bold text-emerald-400">
        Gestión de Rutinas
      </h3>

      <div className="mb-6">
        <label
          htmlFor="buscar-alumno-rutina"
          className="mb-2 block text-sm font-medium text-slate-300"
        >
          Buscar alumno por matrícula o nombre
        </label>

        <div className="relative">
          <Search
            size={18}
            aria-hidden="true"
            className="absolute left-3 top-3.5 text-slate-500"
          />

          <input
            id="buscar-alumno-rutina"
            type="search"
            value={terminoBusqueda}
            onChange={(evento) =>
              setTerminoBusqueda(evento.target.value)
            }
            placeholder="Ej. 1024 o Juan Pérez"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white outline-none transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {cargando && (
        <div className="py-8 text-center font-medium text-slate-400">
          Cargando alumnos...
        </div>
      )}

      {!cargando && error && (
        <div className="py-8 text-center font-medium text-red-400">
          {error}
        </div>
      )}

      {!cargando &&
        !error &&
        alumnosFiltrados.length === 0 && (
          <div className="py-8 text-center font-medium text-slate-400">
            No se encontraron alumnos con ese criterio.
          </div>
        )}

      {mostrarLista && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {alumnosFiltrados.map((alumno) => (
            <TarjetaAlumnoRutina
              key={alumno.id}
              alumno={alumno}
              onAbrir={abrirRutina}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PanelGestionRutinas;