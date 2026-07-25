import { AlertCircle, Calendar } from 'lucide-react';
import ModalReprogramar from '../../modales/ModalReprogramar';
import usarCitasNutricion from '../../../hooks/usarCitasNutricion';
import TarjetaCitaNutricion from './TarjetaCitaNutricion';
import ModalCancelarCitaNutricion from './ModalCancelarCitaNutricion';

function CitasNutricion() {
  const estado = usarCitasNutricion();
  if (estado.cargando) return <div className="flex flex-col items-center justify-center p-10 text-emerald-400"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500 mb-4" /><p className="font-bold">Cargando tus citas...</p></div>;
  if (!estado.idCliente) return <div className="bg-slate-900 p-8 rounded-xl text-center border border-red-500/30 max-w-md mx-auto mt-6"><AlertCircle size={48} className="text-red-500 mx-auto mb-4" /><h2 className="text-xl text-white font-bold mb-2">Acceso Denegado</h2><p className="text-slate-400">Inicia sesión para ver tus citas médicas.</p></div>;
  return <div className="w-full max-w-3xl mx-auto animate-fade-in"><div className="mb-8"><h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-teal-400">Mis Citas de Nutrición</h2><p className="text-slate-400 mt-2">Gestiona tus próximas valoraciones y seguimientos.</p></div>{estado.citas.length === 0 ? <div className="bg-slate-800 rounded-xl p-10 text-center border border-slate-700"><Calendar size={48} className="text-slate-500 mx-auto mb-4 opacity-50" /><h3 className="text-xl text-white font-bold">No tienes citas programadas</h3><p className="text-slate-400 mt-2">Cuando tu nutriólogo te asigne una cita, aparecerá aquí.</p></div> : <div className="space-y-4">{estado.citas.map((cita) => <TarjetaCitaNutricion key={cita.id} cita={cita} alReprogramar={estado.abrirReprogramacion} alCancelar={estado.abrirCancelacion} />)}</div>}<ModalCancelarCitaNutricion abierto={estado.modalCancelacion.abierto} alCerrar={estado.cerrarCancelacion} alConfirmar={estado.confirmarCancelacion} />{estado.modalReprogramacion.abierto && <ModalReprogramar citaSeleccionada={estado.modalReprogramacion.cita} onClose={estado.cerrarReprogramacion} onSuccess={estado.cerrarReprogramacion} />}</div>;
}

export default CitasNutricion;
