import { Home, Calendar, Users, User, MessageCircle } from 'lucide-react';
import BotonSalidaEntrenador from './componentes/BotonSalidaEntrenador';
import PestanaNavegacionEntrenador from './componentes/PestanaNavegacionEntrenador';

const pestañasPortal = [
  { id: 'inicio', etiqueta: 'Inicio', icono: Home },
  { id: 'agenda', etiqueta: 'Agenda', icono: Calendar },
  { id: 'gestion', etiqueta: 'Gestión', icono: Users },
  { id: 'mensajes', etiqueta: 'Mensajes', icono: MessageCircle },
  { id: 'perfil', etiqueta: 'Perfil', icono: User },
];

function BarraNavegacionEntrenador({ pestañaActiva, onCambiarPestaña, onCerrarSesion }) {
  return (
    <>
      <header className="hidden md:flex fixed top-0 left-0 right-0 bg-slate-900 border-b border-slate-800 z-50 h-20 items-center px-8 justify-center shadow-2xl">
        <div className="flex items-center gap-5">
          <span className="text-xl font-black text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-400 mr-4 cursor-pointer">
            FitData <span className="text-white">GYM</span>
          </span>

          <nav className="flex items-center gap-5">
            {pestañasPortal.map((pestaña) => <PestanaNavegacionEntrenador
              key={pestaña.id} pestaña={pestaña} activa={pestañaActiva === pestaña.id}
              alSeleccionar={onCambiarPestaña} />)}
          </nav>
        </div>

        <div className="pl-8 border-l border-slate-800/50">
          <BotonSalidaEntrenador alSalir={onCerrarSesion} />
        </div>
      </header>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-slate-900/95 backdrop-blur-lg border-t border-slate-800 pb-safe z-50 h-16">
        <div className="grid grid-cols-6 h-full">
          {pestañasPortal.map((pestaña) => <PestanaNavegacionEntrenador
            key={pestaña.id} pestaña={pestaña} activa={pestañaActiva === pestaña.id}
            alSeleccionar={onCambiarPestaña} esMovil />)}
          <BotonSalidaEntrenador alSalir={onCerrarSesion} esMovil />
        </div>
      </nav>
    </>
  );
}

export default BarraNavegacionEntrenador;
