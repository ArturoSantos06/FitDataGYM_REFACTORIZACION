import { Dumbbell } from 'lucide-react';
import usarListaEntrenadores from './hooks/usarListaEntrenadores';
import TarjetaEntrenadorCliente from './componentes/TarjetaEntrenadorCliente';
import ModalesEntrenadoresCliente from './componentes/ModalesEntrenadoresCliente';

function ListaEntrenadores() {
  const estado = usarListaEntrenadores();
  if (estado.error) return <div className="p-6 text-center"><div className="bg-red-900/20 border border-red-500 rounded-xl p-4 text-red-400"><p className="font-semibold">Error al cargar entrenadores</p><p className="text-sm mt-1">{estado.error}</p></div></div>;
  if (estado.cargando) return <div className="p-6 text-center"><div className="animate-pulse"><div className="bg-slate-800 rounded-xl p-8"><div className="flex items-center justify-center mb-4"><div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center"><Dumbbell className="w-6 h-6 text-blue-400" /></div></div><div className="h-4 bg-slate-700 rounded w-3/4 mx-auto mb-2" /><div className="h-3 bg-slate-700 rounded w-1/2 mx-auto" /></div></div></div>;

  return <div className="space-y-6">
    {estado.entrenadorAsignado && <div className="bg-green-900/20 border border-green-500 rounded-xl p-4 text-green-400"><p className="font-semibold">Ya tienes un entrenador asignado</p><p className="text-sm mt-1">Si deseas cambiar de especialista, contacta a recepción del gimnasio.</p></div>}
    {estado.entrenadores.length > 0 ? (
      <div className="grid gap-6 justify-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 260px))' }}>
        {estado.entrenadores.map((entrenador) => (
          <TarjetaEntrenadorCliente
            key={entrenador.id}
            entrenador={entrenador}
            seleccionado={estado.entrenadorSeleccionado?.id === entrenador.id}
            asignado={estado.idEntrenadorAsignado === entrenador.id}
            asignando={estado.asignando}
            reseñas={estado.reseñas}
            estrellasSobre={estado.estrellasSobre}
            idCliente={estado.idCliente}
            promedio={estado.obtenerPromedio}
            alSeleccionar={estado.seleccionarEntrenador}
            alCalificar={estado.calificarEntrenador}
            alPasarEstrella={estado.establecerEstrellaSobre}
            alSalirEstrella={estado.limpiarEstrellaSobre}
            alMostrarPrecio={estado.obtenerPrecioPorTipo}
            alObtenerConfiguracion={estado.obtenerConfiguracionServicio}
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-12">
        <Dumbbell className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400 text-lg">No se encontraron entrenadores disponibles</p>
        <p className="text-slate-500 text-sm mt-2">Estamos trabajando para expandir nuestro equipo de entrenadores.</p>
      </div>
    )}
    <ModalesEntrenadoresCliente {...estado} />
  </div>;
}

export default ListaEntrenadores;
