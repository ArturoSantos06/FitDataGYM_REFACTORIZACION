import * as Iconos from 'lucide-react';
import usarGestionServicioEntrenador from '../../../hooks/usarGestionServicioEntrenador';
import EstadoServicioEntrenador from './EstadoServicioEntrenador';
import ModalCancelacionServicio from './ModalCancelacionServicio';

const { AlertTriangle } = Iconos;

function Entrenador() {
  const estado = usarGestionServicioEntrenador();
  if (estado.cargando) return <div className="text-slate-400 text-center mt-10 font-medium flex flex-col items-center gap-3"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500" />Cargando estado del servicio...</div>;
  if (!estado.idCliente) return <div className="bg-slate-900 p-8 rounded-xl max-w-md mx-auto text-center border border-red-500/30"><AlertTriangle size={48} className="text-red-500 mx-auto mb-4" /><h2 className="text-xl text-white font-bold mb-2">Acceso Denegado</h2><p className="text-slate-400">Por favor, inicia sesión para gestionar tus servicios.</p></div>;

  return <div className="w-full flex justify-center animate-fade-in"><div className="relative w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-8 border border-slate-700"><div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-red-500 to-orange-400" /><div className="text-center md:text-left mb-8"><h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-400 to-orange-400">Gestión de Servicio</h2><p className="text-slate-400 font-medium mt-1.5">Administra tu suscripción al área de entrenamiento.</p></div><EstadoServicioEntrenador estadoServicio={estado.estadoServicio} alAbrirModal={estado.abrirModal} alReactivar={estado.reactivarServicio} /><ModalCancelacionServicio abierto={estado.modalAbierto} alCerrar={estado.cerrarModal} alConfirmar={estado.cancelarServicio} /></div></div>;
}

export default Entrenador;
