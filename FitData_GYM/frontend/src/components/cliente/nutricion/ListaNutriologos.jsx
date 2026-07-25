import { User } from 'lucide-react';
import usarListaNutriologos from '../../../hooks/usarListaNutriologos';
import TarjetaNutriologoCliente from './TarjetaNutriologoCliente';
import ModalesNutriologosCliente from './ModalesNutriologosCliente';

function ListaNutriologos() {
  const estado = usarListaNutriologos();
  if (estado.error) return <div className="p-6 text-center"><div className="bg-red-900/20 border border-red-500 rounded-xl p-4 text-red-400"><p className="font-semibold">Error al cargar especialistas</p><p className="text-sm mt-1">{estado.error}</p></div></div>;
  if (estado.cargando) return <div className="p-6 text-center"><div className="animate-pulse"><div className="bg-slate-800 rounded-xl p-8"><div className="flex items-center justify-center mb-4"><div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center"><User className="w-6 h-6 text-emerald-400" /></div></div><div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-2" /><div className="h-3 bg-slate-700 rounded w-1/2 mx-auto" /></div></div></div>;
  return <div className="space-y-6"><ModalesNutriologosCliente {...estado} />{estado.idNutriologoAsignado && <div className="bg-green-900/20 border border-green-500 rounded-xl p-4 text-green-400"><p className="font-semibold">Ya tienes un nutriólogo asignado</p><p className="text-sm mt-1">Si deseas cambiar de especialista, contacta a recepción del gimnasio.</p></div>}{estado.nutriologos.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{estado.nutriologos.map((nutriologo) => <TarjetaNutriologoCliente key={nutriologo.id} nutriologo={nutriologo} seleccionado={estado.nutriologoSeleccionado?.id === nutriologo.id} asignado={estado.idNutriologoAsignado === nutriologo.id} asignando={estado.asignando} reseñas={estado.reseñas} estrellasSobre={estado.estrellasSobre} idCliente={estado.idCliente} promedio={estado.obtenerPromedio} alSeleccionar={estado.seleccionarNutriologo} alCalificar={estado.calificarNutriologo} alPasarEstrella={estado.establecerEstrellaSobre} alSalirEstrella={estado.limpiarEstrellaSobre} />)}</div> : <div className="text-center py-12"><User className="w-16 h-16 text-slate-600 mx-auto mb-4" /><p className="text-slate-400 text-lg">No se encontraron especialistas disponibles</p><p className="text-slate-500 text-sm mt-2">Estamos trabajando para expandir nuestro equipo de nutriólogos.</p></div>}</div>;
}

export default ListaNutriologos;
