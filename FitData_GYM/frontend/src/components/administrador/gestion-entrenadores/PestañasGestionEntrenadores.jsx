import ClientesConServicioEntrenador from './ClientesConServicioEntrenador';
import EntrenadoresYPagos from './EntrenadoresYPagos';

function PestanasGestionEntrenadores({ gestion, obtenerEtiquetaEstado }) {
  const mostrarClientes = gestion.pestanaActiva === 'clientes';

  return (
    <>
      <div className="flex gap-2 border-b border-gray-700">
        <button
          onClick={() => gestion.setPestanaActiva('clientes')}
          className={`px-6 py-3 font-semibold transition-all ${mostrarClientes ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400 hover:text-gray-300'}`}
        >
          👥 Clientes con Servicio
        </button>
        <button
          onClick={() => gestion.setPestanaActiva('entrenadores')}
          className={`px-6 py-3 font-semibold transition-all ${!mostrarClientes ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-gray-300'}`}
        >
          💪 Entrenadores y Pagos
        </button>
      </div>

      {mostrarClientes ? (
        <ClientesConServicioEntrenador
          terminoBusqueda={gestion.terminoBusqueda}
          setTerminoBusqueda={gestion.setTerminoBusqueda}
          filtroEstado={gestion.filtroEstado}
          setFiltroEstado={gestion.setFiltroEstado}
          ordenarPor={gestion.ordenarPor}
          setOrdenarPor={gestion.setOrdenarPor}
          serviciosFiltrados={gestion.serviciosFiltrados}
          serviciosEntrenamiento={gestion.serviciosEntrenamiento}
          ventasServiciosEntrenador={gestion.ventasServiciosEntrenador}
          obtenerEtiquetaEstado={obtenerEtiquetaEstado}
          onDesvincularCliente={gestion.manejarDesvincularCliente}
          idClienteDesvinculando={gestion.idClienteDesvinculando}
          onCompletarVentaServicio={gestion.manejarCompletarVentaServicio}
          idVentaServicioCompletando={gestion.idVentaServicioCompletando}
        />
      ) : (
        <EntrenadoresYPagos
          entrenadores={gestion.entrenadores}
          entrenadoresInactivos={gestion.entrenadoresInactivos}
          pagosEntrenadores={gestion.pagosEntrenadores}
          filtroMesEntrenadores={gestion.filtroMesEntrenadores}
          setFiltroMesEntrenadores={gestion.setFiltroMesEntrenadores}
          filtroAnioEntrenadores={gestion.filtroAnioEntrenadores}
          setFiltroAnioEntrenadores={gestion.setFiltroAnioEntrenadores}
          filtroMesPagos={gestion.filtroMesPagos}
          setFiltroMesPagos={gestion.setFiltroMesPagos}
          filtroAnioPagos={gestion.filtroAnioPagos}
          setFiltroAnioPagos={gestion.setFiltroAnioPagos}
          obtenerIngresoMensualFiltrado={gestion.obtenerIngresoMensualFiltrado}
          onPagarEntrenador={gestion.manejarPagoEntrenador}
          onDesactivarEntrenador={gestion.manejarDesactivarEntrenador}
          onReactivarEntrenador={gestion.manejarReactivarEntrenador}
          idEntrenadorDesactivando={gestion.idEntrenadorDesactivando}
          idEntrenadorReactivando={gestion.idEntrenadorReactivando}
        />
      )}
    </>
  );
}

export default PestanasGestionEntrenadores;
