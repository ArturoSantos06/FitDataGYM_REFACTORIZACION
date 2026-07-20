import { useState, useMemo } from 'react';
import { useAccionesEntrenadores } from './useAccionesEntrenadores';
import { useAccionesServicios } from './useAccionesServicios';
import { usePagosEntrenadores } from './usePagosEntrenadores';
import { useCargaEntrenadores } from './useCargaEntrenadores';
import { cargarDatosEntrenadores } from '../cargarDatosEntrenadores';
import * as utilidadesEntrenadores from '../utilidadesGestionEntrenadores';

const normalizarEstadoServicio = (servicio = {}) =>
  String(servicio.status || servicio.estado || '').trim().toLowerCase();

export function useGestionEntrenadores() {
  const { aMs, normalizarClaveBusqueda, normalizarEtiquetaTipoServicio, obtenerNombreVisualizacion, registrarClavesBusqueda, normalizarClaveEntrenador, esUsuarioEntrenador, esEntrenadorInactivo } = utilidadesEntrenadores;
  // Estados principales
  const [serviciosEntrenamiento, setServiciosEntrenamiento] = useState([]);
  const [ventasServiciosEntrenador, setVentasServiciosEntrenador] = useState([]);
  const [entrenadores, setEntrenadores] = useState([]);
  const [entrenadoresInactivos, setEntrenadoresInactivos] = useState([]);
  const [pagosEntrenadores, setPagosEntrenadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('todos');
  const [ordenarPor, setOrdenarPor] = useState('fechaAsignacion');
  const [pestanaActiva, setPestanaActiva] = useState('clientes');
  
  // Estados de control y acción
  const [idEntrenadorDesactivando, setIdEntrenadorDesactivando] = useState('');
  const [idEntrenadorReactivando, setIdEntrenadorReactivando] = useState('');
  const [idVentaServicioCompletando, setIdVentaServicioCompletando] = useState('');
  const [idClienteDesvinculando, setIdClienteDesvinculando] = useState('');
  const [servicioPendienteDesvincular, setServicioPendienteDesvincular] = useState(null);
  const [accionPendiente, setAccionPendiente] = useState(null);
  
  // Modales
  const [modalError, setModalError] = useState({ isOpen: false, title: '', message: '' });
  const [modalExito, setModalExito] = useState({ isOpen: false, title: '', message: '', subMessage: '' });

  const accionesEntrenadores = useAccionesEntrenadores({
    accionPendiente,
    setAccionPendiente,
    setIdEntrenadorDesactivando,
    setIdEntrenadorReactivando,
    setEntrenadores,
    setEntrenadoresInactivos,
    setModalError,
    setModalExito,
    obtenerNombreVisualizacion,
  });

  const accionesServicios = useAccionesServicios({
    accionPendiente,
    setAccionPendiente,
    servicioPendienteDesvincular,
    setServicioPendienteDesvincular,
    setIdClienteDesvinculando,
    setIdVentaServicioCompletando,
    setServiciosEntrenamiento,
    setVentasServiciosEntrenador,
    setModalError,
    setModalExito,
  });

  const pagos = usePagosEntrenadores({
    pagosEntrenadores,
    setPagosEntrenadores,
    aMs,
    normalizarClaveBusqueda,
    obtenerNombreVisualizacion,
    setModalError,
    setModalExito,
  });

  // ================== CARGA DE DATOS ==================
  useCargaEntrenadores((estaActivo) => cargarDatosEntrenadores({
    estaActivo,
    setEntrenadores,
    setEntrenadoresInactivos,
    setServiciosEntrenamiento,
    setVentasServiciosEntrenador,
    setPagosEntrenadores,
    setCargando,
  }));

  const {
    manejarDesactivarEntrenador,
    ejecutarDesactivarEntrenador,
    manejarReactivarEntrenador,
    ejecutarReactivarEntrenador,
  } = accionesEntrenadores;

  const {
    manejarDesvincularCliente,
    ejecutarDesvincularCliente,
    manejarCompletarVentaServicio,
    ejecutarCompletarVentaServicio,
  } = accionesServicios;

  const {
    modalPago,
    filtroMesPagos,
    setFiltroMesPagos,
    filtroAnioPagos,
    setFiltroAnioPagos,
    filtroMesEntrenadores,
    setFiltroMesEntrenadores,
    filtroAnioEntrenadores,
    setFiltroAnioEntrenadores,
    obtenerIngresoMensualFiltrado,
    manejarPagoEntrenador,
    actualizarMontoPago,
    cerrarModalPago,
    manejarConfirmarPagoModal,
  } = pagos;

  const manejarConfirmarAccionPendiente = () => {
    if (accionPendiente?.tipo === 'desactivar') ejecutarDesactivarEntrenador();
    if (accionPendiente?.tipo === 'reactivar') ejecutarReactivarEntrenador();
    if (accionPendiente?.tipo === 'completarVenta') ejecutarCompletarVentaServicio();
  };

  // Filtrar y ordenar servicios según búsqueda, estado y criterio seleccionado.
  const serviciosFiltrados = useMemo(() => {
    const busqueda = normalizarClaveBusqueda(terminoBusqueda);

    const servicios = serviciosEntrenamiento.filter((servicio) => {
      const estado = normalizarEstadoServicio(servicio);
      const textoBuscable = [
        servicio.clientName,
        servicio.clientEmail,
        servicio.trainerName,
        servicio.trainerEmail,
        servicio.serviceType,
        servicio.serviceLabel,
      ].map(normalizarClaveBusqueda).join(' ');

      if (busqueda && !textoBuscable.includes(busqueda)) return false;
      if (filtroEstado === 'activo' && !['active', 'activo'].includes(estado)) return false;
      if (filtroEstado === 'vencido' && !['expired', 'vencido', 'inactive', 'inactivo'].includes(estado)) return false;

      return true;
    });

    return [...servicios].sort((a, b) => {
      if (ordenarPor === 'nombreCliente') {
        return normalizarClaveBusqueda(a.clientName).localeCompare(normalizarClaveBusqueda(b.clientName));
      }

      if (ordenarPor === 'entrenador') {
        return normalizarClaveBusqueda(a.trainerName).localeCompare(normalizarClaveBusqueda(b.trainerName));
      }

      return aMs(a.assignedAt || a.createdAt || a.updatedAt) - aMs(b.assignedAt || b.createdAt || b.updatedAt);
    });
  }, [serviciosEntrenamiento, terminoBusqueda, filtroEstado, ordenarPor, normalizarClaveBusqueda, aMs]);

  const estadisticas = useMemo(() => ({
    totalEntrenadores: entrenadores.length,
    entrenadoresInactivos: entrenadoresInactivos.length,
    clientesAsignados: serviciosEntrenamiento.length,
    totalClients: serviciosEntrenamiento.length,
    activeServices: serviciosEntrenamiento.filter((servicio) =>
      ['active', 'activo'].includes(normalizarEstadoServicio(servicio))
    ).length,
    totalTrainers: entrenadores.length,
    ingresoMensual: obtenerIngresoMensualFiltrado(),
  }), [entrenadores, entrenadoresInactivos, serviciosEntrenamiento, obtenerIngresoMensualFiltrado]);

  // ================== RETURN ==================
  return {
    // Estados
    serviciosEntrenamiento,
    ventasServiciosEntrenador,
    entrenadores,
    entrenadoresInactivos,
    pagosEntrenadores,
    cargando,
    terminoBusqueda,
    filtroEstado,
    ordenarPor,
    pestanaActiva,
    idEntrenadorDesactivando,
    idEntrenadorReactivando,
    idVentaServicioCompletando,
    idClienteDesvinculando,
    servicioPendienteDesvincular,
    accionPendiente,
    modalError,
    modalExito,
    modalPago,
    filtroMesPagos,
    filtroAnioPagos,
    filtroMesEntrenadores,
    filtroAnioEntrenadores,

    // Setters
    setServiciosEntrenamiento,
    setVentasServiciosEntrenador,
    setEntrenadores,
    setEntrenadoresInactivos,
    setPagosEntrenadores,
    setCargando,
    setTerminoBusqueda,
    setFiltroEstado,
    setOrdenarPor,
    setPestanaActiva,
    setIdEntrenadorDesactivando,
    setIdEntrenadorReactivando,
    setIdVentaServicioCompletando,
    setIdClienteDesvinculando,
    setServicioPendienteDesvincular,
    setAccionPendiente,
    setModalError,
    setModalExito,
    actualizarMontoPago,
    cerrarModalPago,
    setFiltroMesPagos,
    setFiltroAnioPagos,
    setFiltroMesEntrenadores,
    setFiltroAnioEntrenadores,

    // Handlers
    manejarDesactivarEntrenador,
    ejecutarDesactivarEntrenador,
    manejarReactivarEntrenador,
    ejecutarReactivarEntrenador,
    manejarDesvincularCliente,
    ejecutarDesvincularCliente,
    manejarCompletarVentaServicio,
    ejecutarCompletarVentaServicio,

    // Utilidades
    obtenerNombreVisualizacion,
    normalizarClaveBusqueda,
    normalizarEtiquetaTipoServicio,
    registrarClavesBusqueda,
    normalizarClaveEntrenador,
    esUsuarioEntrenador,
    esEntrenadorInactivo,
    aMs,

    // Estadísticas
    estadisticas,
    obtenerIngresoMensualFiltrado,
    serviciosFiltrados,
    
    // Handlers adicionales
    manejarConfirmarAccionPendiente,
    manejarPagoEntrenador,
    manejarConfirmarPagoModal,
  };
}
