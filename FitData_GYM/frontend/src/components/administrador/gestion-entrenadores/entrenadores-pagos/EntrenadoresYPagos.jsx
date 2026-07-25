import TablaEntrenadoresActivos from './TablaEntrenadoresActivos';
import TablaEntrenadoresInactivos from './TablaEntrenadoresInactivos';
import TablaHistorialPagos from './TablaHistorialPagos';
import { obtenerAniosDisponibles } from './utilidadesEntrenadoresYPagos';

function EntrenadoresYPagos({
  entrenadores,
  entrenadoresInactivos,
  pagosEntrenadores,
  filtroMesEntrenadores,
  setFiltroMesEntrenadores,
  filtroAnioEntrenadores,
  setFiltroAnioEntrenadores,
  filtroMesPagos,
  setFiltroMesPagos,
  filtroAnioPagos,
  setFiltroAnioPagos,
  obtenerIngresoMensualFiltrado,
  onPagarEntrenador,
  onDesactivarEntrenador,
  onReactivarEntrenador,
  idEntrenadorDesactivando,
  idEntrenadorReactivando,
}) {
  const aniosDisponibles = obtenerAniosDisponibles(pagosEntrenadores);

  return (
    <>
      <TablaEntrenadoresActivos
        entrenadores={entrenadores}
        filtroMes={filtroMesEntrenadores}
        setFiltroMes={setFiltroMesEntrenadores}
        filtroAnio={filtroAnioEntrenadores}
        setFiltroAnio={setFiltroAnioEntrenadores}
        anios={aniosDisponibles}
        obtenerIngresoMensualFiltrado={obtenerIngresoMensualFiltrado}
        onPagarEntrenador={onPagarEntrenador}
        onDesactivarEntrenador={onDesactivarEntrenador}
        idEntrenadorDesactivando={idEntrenadorDesactivando}
      />
      <TablaHistorialPagos
        pagos={pagosEntrenadores}
        filtroMes={filtroMesPagos}
        setFiltroMes={setFiltroMesPagos}
        filtroAnio={filtroAnioPagos}
        setFiltroAnio={setFiltroAnioPagos}
        anios={aniosDisponibles}
      />
      <TablaEntrenadoresInactivos
        entrenadores={entrenadoresInactivos}
        onReactivarEntrenador={onReactivarEntrenador}
        idEntrenadorReactivando={idEntrenadorReactivando}
      />
    </>
  );
}

export default EntrenadoresYPagos;
