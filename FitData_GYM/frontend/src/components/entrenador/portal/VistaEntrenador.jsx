import { Search } from 'lucide-react';
import EncabezadoVistaEntrenador from './EncabezadoVistaEntrenador';
import TarjetasAccionesEntrenador from './TarjetasAccionesEntrenador';
import ListaAlumnosEntrenador from './ListaAlumnosEntrenador';
import usarVistaEntrenador from '../../../hooks/usarVistaEntrenador';

function VistaEntrenador() {
  const estado = usarVistaEntrenador();

  return <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
    <div className="max-w-6xl mx-auto">
      <EncabezadoVistaEntrenador alVolver={estado.volverInicio} alCerrarSesion={estado.cerrarSesion} />
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 mb-6">
        <label className="block text-sm text-slate-300 mb-2">Buscar por matrícula o nombre completo</label>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3.5 text-slate-500" />
          <input type="text" value={estado.textoBusqueda}
            onChange={(evento) => estado.establecerTextoBusqueda(evento.target.value)}
            placeholder="Ej. 1024 o Juan Pérez"
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
        </div>
      </div>
      <TarjetasAccionesEntrenador alAbrirCitas={estado.abrirCitas} alAbrirBitacora={estado.abrirBitacora} />
      <ListaAlumnosEntrenador alumnos={estado.alumnosFiltrados} cargando={estado.cargando}
        error={estado.error} alAbrirRutina={estado.abrirRutina} />
    </div>
  </div>;
}

export default VistaEntrenador;
