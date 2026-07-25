import {
  Activity,
  BookOpen,
  Calculator,
  Home,
  LogOut,
  MessageCircle,
  Stethoscope,
  UserCircle2,
} from 'lucide-react';
import { ElementoNavegacionEscritorio } from './ui/ElementoNavegacionEscritorio';
import { ElementoNavegacionMovil } from './ui/ElementoNavegacionMovil';

const PESTANAS = [
  { identificador: 'inicio', etiqueta: 'Inicio', Icono: Home },
  { identificador: 'citas', etiqueta: 'Citas', Icono: Stethoscope },
  { identificador: 'calculadora', etiqueta: 'Calculadora', Icono: Calculator },
  { identificador: 'dietas', etiqueta: 'Dietas', Icono: BookOpen },
  { identificador: 'financiero', etiqueta: 'Finanzas', Icono: Activity },
  { identificador: 'mensajes', etiqueta: 'Mensajes', Icono: MessageCircle },
  { identificador: 'perfil', etiqueta: 'Perfil', Icono: UserCircle2 },
];

export default function BarraNavegacionNutri({
  pestanaActiva,
  alCambiarPestana,
  alCerrarSesion,
  cerrandoSesion,
}) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 hidden h-20 items-center justify-center border-b border-slate-800 bg-slate-900 px-8 shadow-2xl md:flex">
        <div className="flex items-center gap-5">
          <span className="mr-4 cursor-pointer bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-xl font-black text-transparent">
            FitData <span className="text-white">GYM</span>
          </span>

          <nav className="flex items-center gap-5" aria-label="Navegación del nutriólogo">
            {PESTANAS.map(({ identificador, etiqueta }) => (
              <ElementoNavegacionEscritorio
                key={identificador}
                etiqueta={etiqueta}
                activo={pestanaActiva === identificador}
                alSeleccionar={() => alCambiarPestana(identificador)}
              />
            ))}
          </nav>
        </div>

        <div className="border-l border-slate-800/50 pl-8">
          <button
            type="button"
            onClick={alCerrarSesion}
            disabled={cerrandoSesion}
            className="rounded-md bg-red-600 px-6 py-2 text-sm font-bold text-white shadow-lg shadow-red-600/20 transition-transform hover:bg-red-700 active:scale-95 disabled:cursor-wait disabled:opacity-60"
          >
            {cerrandoSesion ? 'Saliendo...' : 'Salir'}
          </button>
        </div>
      </header>

      <nav
        className="fixed inset-x-0 bottom-0 z-50 h-16 border-t border-slate-800 bg-slate-900/95 pb-safe backdrop-blur-lg md:hidden"
        aria-label="Navegación móvil del nutriólogo"
      >
        <div className="grid h-full grid-cols-8">
          {PESTANAS.map(({ identificador, etiqueta, Icono }) => (
            <ElementoNavegacionMovil
              key={identificador}
              etiqueta={etiqueta}
              Icono={Icono}
              activo={pestanaActiva === identificador}
              alSeleccionar={() => alCambiarPestana(identificador)}
            />
          ))}
          <button
            type="button"
            onClick={alCerrarSesion}
            disabled={cerrandoSesion}
            className="flex w-full flex-col items-center justify-center gap-1 text-red-400 disabled:cursor-wait disabled:opacity-60"
          >
            <LogOut size={24} />
            <span className="text-[10px] font-medium">
              {cerrandoSesion ? 'Saliendo' : 'Salir'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
}
