import { Search } from 'lucide-react';
import TablaServiciosEntrenamiento from './TablaServiciosEntrenamiento';
import TablaHistorialPagosEntrenador from './TablaHistorialPagosEntrenador';

function ClientesConServicioEntrenador({
  terminoBusqueda,
  setTerminoBusqueda,
  filtroEstado,
  setFiltroEstado,
  ordenarPor,
  setOrdenarPor,
  serviciosFiltrados,
  serviciosEntrenamiento,
  ventasServiciosEntrenador,
  obtenerEtiquetaEstado,
  onDesvincularCliente,
  idClienteDesvinculando,
  onCompletarVentaServicio,
  idVentaServicioCompletando,
}) {
  const servicios = serviciosFiltrados || [];
  const ventas = ventasServiciosEntrenador || [];

  return (
    <>
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="search"
                aria-label="Buscar servicios de entrenamiento"
                placeholder="Buscar por cliente, entrenador o tipo de servicio..."
                value={terminoBusqueda}
                onChange={(event) => setTerminoBusqueda(event.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select aria-label="Filtrar por estado" value={filtroEstado} onChange={(event) => setFiltroEstado(event.target.value)} className="bg-gray-900 border border-gray-600 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="todos">Todos los estados</option>
            <option value="activo">✅ Activos</option>
            <option value="vencido">❌ Vencidos</option>
          </select>

          <select aria-label="Ordenar servicios" value={ordenarPor} onChange={(event) => setOrdenarPor(event.target.value)} className="bg-gray-900 border border-gray-600 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="fechaAsignacion">Fecha de asignación</option>
            <option value="nombreCliente">Nombre del cliente</option>
            <option value="entrenador">Entrenador</option>
          </select>
        </div>
      </div>

      <TablaServiciosEntrenamiento
        servicios={servicios}
        obtenerEtiquetaEstado={obtenerEtiquetaEstado}
        onDesvincularCliente={onDesvincularCliente}
        idClienteDesvinculando={idClienteDesvinculando}
      />
      <TablaHistorialPagosEntrenador
        ventas={ventas}
        servicios={serviciosEntrenamiento || servicios}
        onCompletarVentaServicio={onCompletarVentaServicio}
        idVentaServicioCompletando={idVentaServicioCompletando}
      />
    </>
  );
}

export default ClientesConServicioEntrenador;
