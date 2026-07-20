import {
  ChevronRight,
  ClipboardList,
  StickyNote,
  Dumbbell,
  UserMinus,
} from 'lucide-react';

const OPCIONES_MENU = [
  {
    id: 'historial',
    titulo: 'Historial Clínico',
    descripcion: 'Consultar fichas médicas y lesiones',
    icono: ClipboardList,
    color: {
      fondo: 'bg-blue-500/10',
      texto: 'text-blue-400 group-hover:text-blue-300',
      titulo: 'text-blue-300',
      flecha: 'group-hover:text-blue-400',
    },
  },
  {
    id: 'bitacora',
    titulo: 'Bitácora Privada',
    descripcion: 'Anotaciones y seguimiento de clientes',
    icono: StickyNote,
    color: {
      fondo: 'bg-purple-500/10',
      texto: 'text-purple-400 group-hover:text-purple-300',
      titulo: 'text-purple-300',
      flecha: 'group-hover:text-purple-400',
    },
  },
  {
    id: 'rutinas',
    titulo: 'Gestión de Rutinas',
    descripcion: 'Asignar y modificar planes de entrenamiento',
    icono: Dumbbell,
    color: {
      fondo: 'bg-emerald-500/10',
      texto: 'text-emerald-400 group-hover:text-emerald-300',
      titulo: 'text-emerald-300',
      flecha: 'group-hover:text-emerald-400',
    },
  },
  {
    id: 'desvinculacion',
    titulo: 'Desvinculación y Pagos',
    descripcion: 'Semáforo de estado y gestión de cuentas',
    icono: UserMinus,
    color: {
      fondo: 'bg-red-500/10',
      texto: 'text-red-400 group-hover:text-red-300',
      titulo: 'text-red-300',
      flecha: 'group-hover:text-red-400',
    },
  },
];

function TarjetaAccion({
  color,
  icono: Icono,
  titulo,
  descripcion,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-all duration-200 hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
    >
      <div className="flex items-center gap-4 text-left">
        <div
          className={`rounded-lg p-3 transition-transform group-hover:scale-110 ${color.fondo} ${color.texto}`}
        >
          <Icono size={24} aria-hidden="true" />
        </div>

        <div className="flex flex-col">
          <span
            className={`text-lg font-bold group-hover:text-white ${color.titulo}`}
          >
            {titulo}
          </span>

          <span className="hidden text-sm text-slate-400 md:block">
            {descripcion}
          </span>
        </div>
      </div>

      <ChevronRight
        size={24}
        aria-hidden="true"
        className={`text-slate-500 transition-transform group-hover:translate-x-1 ${color.flecha}`}
      />
    </button>
  );
}

function MenuGestionEntrenador({ onCambiarVista }) {
  return (
    <div className="flex w-full justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl bg-gray-800 p-8 shadow-2xl">
        <div className="absolute left-0 top-0 h-1.5 w-full bg-linear-to-r from-teal-400 via-blue-400 to-purple-400" />

        <div className="mb-8 text-center md:text-left">
          <h2 className="bg-linear-to-r from-teal-400 via-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
            Herramientas de Gestión
          </h2>

          <p className="mt-1.5 font-medium text-slate-400">
            Selecciona la acción que deseas realizar con tus clientes.
          </p>
        </div>

        <div className="space-y-3">
          {OPCIONES_MENU.map((opcion) => (
            <TarjetaAccion
              key={opcion.id}
              color={opcion.color}
              icono={opcion.icono}
              titulo={opcion.titulo}
              descripcion={opcion.descripcion}
              onClick={() => onCambiarVista(opcion.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MenuGestionEntrenador;