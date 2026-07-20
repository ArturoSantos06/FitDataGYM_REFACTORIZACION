import { getUsers, getAllClientTrainerAssignments, getTrainerServiceSales, getTrainerPayments } from '../../../firebase';
import * as utilidadesEntrenadores from './utilidadesGestionEntrenadores';

const { normalizarClaveBusqueda, obtenerNombreEntrenador, obtenerEspecialidadEntrenador, obtenerTipoContratoEntrenador, obtenerClavesEntrenador, deduplicarEntrenadores, obtenerMetodoPagoVenta, obtenerMontoVenta, obtenerEstadoVenta, esUsuarioEntrenador, esEntrenadorInactivo } = utilidadesEntrenadores;

export function cargarDatosEntrenadores({ estaActivo, setEntrenadores, setEntrenadoresInactivos, setServiciosEntrenamiento, setVentasServiciosEntrenador, setPagosEntrenadores, setCargando }) {
Promise.all([
  getUsers(),
  getAllClientTrainerAssignments(),
  getTrainerServiceSales(),
  getTrainerPayments(),
]).then(([usuariosResp, asignacionesResp, ventasResp, pagosResp]) => {
  const usuarios = Array.isArray(usuariosResp) ? usuariosResp : (usuariosResp?.data || []);
  const asignaciones = Array.isArray(asignacionesResp) ? asignacionesResp : (asignacionesResp?.data || []);
  const ventas = Array.isArray(ventasResp) ? ventasResp : (ventasResp?.data || []);
  const pagos = Array.isArray(pagosResp) ? pagosResp : (pagosResp?.data || []);
  const entrenadoresActivos = deduplicarEntrenadores(usuarios.filter(esUsuarioEntrenador));
  const entrenadoresInactList = deduplicarEntrenadores(usuarios.filter(esEntrenadorInactivo));

  const usuariosPorClave = new Map();
  const ventasPorClave = new Map();

  const registrarUsuario = (usuario) => {
    const nombreCompleto = `${usuario.firstName || usuario.first_name || ''} ${usuario.lastName || usuario.last_name || ''}`.trim();
    [
      usuario.id,
      usuario.legacyId,
      usuario.authUid,
      usuario.email,
      usuario.username,
      usuario.displayName,
      usuario.nombre,
      nombreCompleto,
    ].forEach((valor) => {
      const clave = normalizarClaveBusqueda(valor);
      if (clave) usuariosPorClave.set(clave, usuario);
    });
  };

  const registrarVenta = (venta) => {
    [
      venta.id,
      venta.saleId,
      venta.folio,
      venta.clientId,
      venta.cliente_id,
      venta.cliente,
      venta.cliente_auth_uid,
      venta.clientEmail,
      venta.clienteEmail,
      venta.trainerId,
      venta.trainer_id,
      venta.trainerEmail,
      venta.trainer_email,
    ].forEach((valor) => {
      const clave = normalizarClaveBusqueda(valor);
      if (clave) ventasPorClave.set(clave, venta);
    });
  };

  usuarios.forEach(registrarUsuario);
  ventas.forEach(registrarVenta);

  const resolverUsuario = (valor) => usuariosPorClave.get(normalizarClaveBusqueda(valor)) || null;
  const resolverVenta = (valor) => ventasPorClave.get(normalizarClaveBusqueda(valor)) || null;

  const obtenerNombreDesdeUsuario = (usuario, fallback) => {
    if (!usuario) return fallback;
    const nombreCompleto = `${usuario.firstName || usuario.first_name || ''} ${usuario.lastName || usuario.last_name || ''}`.trim();
    return usuario.displayName || nombreCompleto || usuario.username || usuario.nombre || fallback;
  };

  const obtenerFechaAsignacion = (asignacion, ventaRelacionada) => (
    asignacion.assignedAt || asignacion.createdAt || asignacion.updatedAt || ventaRelacionada?.createdAt || ventaRelacionada?.fecha || null
  );

  const obtenerEstadoAsignacion = (asignacion) => String(asignacion.status || asignacion.estado || 'active').toLowerCase() || 'active';

  const asignacionesEnriquecidas = asignaciones.map((asignacion) => {
    const ventaRelacionada = resolverVenta(
      asignacion.saleId ||
      asignacion.sale_id ||
      asignacion.folio ||
      asignacion.clientId ||
      asignacion.memberId
    );

    const cliente = resolverUsuario(
      asignacion.clientId ||
      asignacion.memberId ||
      asignacion.client ||
      asignacion.cliente ||
      asignacion.cliente_id ||
      asignacion.cliente_auth_uid ||
      ventaRelacionada?.clientId ||
      ventaRelacionada?.cliente_id ||
      ventaRelacionada?.cliente ||
      ventaRelacionada?.cliente_auth_uid ||
      ventaRelacionada?.clientEmail ||
      ventaRelacionada?.clienteEmail
    );

    const entrenador = resolverUsuario(
      asignacion.trainerId ||
      asignacion.trainer_id ||
      asignacion.trainer ||
      asignacion.entrenador ||
      ventaRelacionada?.trainerId ||
      ventaRelacionada?.trainer_id ||
      ventaRelacionada?.trainerEmail ||
      ventaRelacionada?.trainer_email
    );

    return {
      ...asignacion,
      clientId: asignacion.clientId || asignacion.memberId || asignacion.client || asignacion.cliente || ventaRelacionada?.clientId || ventaRelacionada?.cliente_id || ventaRelacionada?.cliente || '',
      trainerId: asignacion.trainerId || asignacion.trainer_id || ventaRelacionada?.trainerId || ventaRelacionada?.trainer_id || '',
      clientName: obtenerNombreDesdeUsuario(
        cliente,
        asignacion.clientName || asignacion.clienteNombre || ventaRelacionada?.clienteNombre || 'Cliente desconocido'
      ),
      clientEmail: asignacion.clientEmail || asignacion.clienteEmail || cliente?.email || ventaRelacionada?.clientEmail || ventaRelacionada?.clienteEmail || '',
      trainerName: obtenerNombreDesdeUsuario(
        entrenador,
        asignacion.trainerName || asignacion.trainer_name || ventaRelacionada?.trainerName || ventaRelacionada?.trainer_name || 'Entrenador desconocido'
      ),
      trainerEmail: asignacion.trainerEmail || asignacion.trainer_email || entrenador?.email || ventaRelacionada?.trainerEmail || ventaRelacionada?.trainer_email || '',
      serviceType: asignacion.serviceType || asignacion.service_type || ventaRelacionada?.serviceType || ventaRelacionada?.service_type || 'PERSONAL',
      serviceLabel: asignacion.serviceLabel || asignacion.service_label || ventaRelacionada?.serviceLabel || ventaRelacionada?.service_label || 'Personal',
      price: Number(asignacion.servicePrice || asignacion.service_price || ventaRelacionada?.servicePrice || ventaRelacionada?.trainerServicePrice || ventaRelacionada?.trainer_service_price || ventaRelacionada?.total || 0),
      assignedAt: obtenerFechaAsignacion(asignacion, ventaRelacionada),
      status: obtenerEstadoAsignacion(asignacion),
    };
  });

  const ventasEnriquecidas = ventas.map((venta) => {
    const cliente = resolverUsuario(
      venta.clientId ||
      venta.cliente_id ||
      venta.cliente ||
      venta.cliente_auth_uid ||
      venta.clientEmail ||
      venta.clienteEmail
    );

    const entrenador = resolverUsuario(
      venta.trainerId ||
      venta.trainer_id ||
      venta.trainer ||
      venta.trainerEmail ||
      venta.trainer_email
    );

    const metodoPago = obtenerMetodoPagoVenta(venta);
    const total = obtenerMontoVenta(venta);
    const estadoVenta = obtenerEstadoVenta(venta);

    const fecha = venta.createdAt || venta.fecha || venta.assignedAt || null;

    const clientName = obtenerNombreDesdeUsuario(
      cliente,
      venta.clienteNombre || venta.clientName || venta.cliente_nombre_override || 'Cliente'
    );

    const trainerName = obtenerNombreDesdeUsuario(
      entrenador,
      venta.trainerName || venta.trainer_name || 'Entrenador'
    );

    return {
      ...venta,
      clientId: venta.clientId || venta.cliente_id || venta.cliente || venta.cliente_auth_uid || '',
      clientName,
      clientEmail: venta.clientEmail || venta.clienteEmail || cliente?.email || '',
      trainerId: venta.trainerId || venta.trainer_id || '',
      trainerName,
      trainer_name: trainerName,
      trainerEmail: venta.trainerEmail || venta.trainer_email || entrenador?.email || '',
      metodo_pago: metodoPago,
      payment_method: metodoPago,
      paymentMethod: metodoPago,
      metodo: metodoPago,
      total,
      amount: total,
      monto: total,
      monto_recibido: Number(venta.monto_recibido || total || 0),
      createdAt: fecha,
      fecha,
      payment_status: estadoVenta,
      paymentStatus: estadoVenta,
      status: estadoVenta,
      estado: estadoVenta === 'completed' ? 'completado' : 'pendiente',
    };
  });

  const pagosEnriquecidos = pagos.map((pago) => {
    const total = Number(
      pago.total ||
      pago.amount ||
      pago.monto ||
      pago.monto_recibido ||
      0
    );

    return {
      ...pago,
      trainerId: pago.trainerId || pago.trainer_id || '',
      trainerEmail: pago.trainerEmail || pago.trainer_email || '',
      trainerName: pago.trainerName || pago.trainer_nombre || pago.trainer_name || 'Entrenador',
      contractType: pago.contractType || pago.contract_type || pago.tipoContrato || '',
      metodo_pago: String(pago.metodo_pago || pago.paymentMethod || pago.payment_method || 'N/D').trim().toUpperCase() || 'N/D',
      paymentMethod: String(pago.paymentMethod || pago.metodo_pago || pago.payment_method || 'N/D').trim().toUpperCase() || 'N/D',
      total,
      amount: total,
      monto: total,
      monto_recibido: Number(pago.monto_recibido || total || 0),
      createdAt: pago.createdAt || pago.fecha || null,
      fecha: pago.fecha || pago.createdAt || null,
    };
  });

  const coincideEntrenador = (item = {}, claves = []) => {
    const clavesItem = [
      item.trainerId,
      item.trainer_id,
      item.trainerEmail,
      item.trainer_email,
      item.trainerName,
      item.trainer_name,
      item.trainer_nombre,
    ]
      .map(normalizarClaveBusqueda)
      .filter(Boolean);

    return clavesItem.some((claveItem) => claves.includes(claveItem));
  };

  const entrenadoresConResumen = entrenadoresActivos.map((entrenador) => {
    const clavesEntrenador = obtenerClavesEntrenador(entrenador);
    const asignacionesDelEntrenador = asignacionesEnriquecidas.filter((asignacion) => coincideEntrenador(asignacion, clavesEntrenador));
    const pagosDelEntrenador = pagosEnriquecidos.filter((pago) => coincideEntrenador(pago, clavesEntrenador));

    const clientesUnicos = new Set();
    asignacionesDelEntrenador.forEach((asignacion) => {
      const clientKey = normalizarClaveBusqueda(
        asignacion.clientId ||
        asignacion.clientEmail ||
        asignacion.clientName ||
        asignacion.clienteNombre
      );
      if (clientKey) {
        clientesUnicos.add(clientKey);
      }
    });

    const contratosActivos = asignacionesDelEntrenador.filter((asignacion) => {
      const assignmentStatus = String(asignacion.status || asignacion.estado || 'active').trim().toLowerCase();
      return assignmentStatus === 'active' || assignmentStatus === 'activo';
    }).length;

    const nombreCompleto = `${entrenador.firstName || entrenador.first_name || ''} ${entrenador.lastName || entrenador.last_name || ''}`.trim();
    const specialty = obtenerEspecialidadEntrenador(entrenador);
    const contractType = obtenerTipoContratoEntrenador(entrenador, pagosDelEntrenador[0]?.contractType || 'N/D');

    return {
      ...entrenador,
      name: obtenerNombreEntrenador(entrenador, nombreCompleto || 'Entrenador'),
      email: entrenador.email || entrenador.trainerEmail || entrenador.trainer_email || '',
      specialty,
      clientsCount: clientesUnicos.size,
      activeContracts: contratosActivos,
      contractType,
      trainerId: entrenador.id || entrenador.authUid || entrenador.legacyId || '',
      payments: pagosDelEntrenador,
    };
  });

  const entrenadoresInactivosConResumen = entrenadoresInactList.map((entrenador) => {
    const clavesEntrenador = obtenerClavesEntrenador(entrenador);
    const asignacionesDelEntrenador = asignacionesEnriquecidas.filter((asignacion) => coincideEntrenador(asignacion, clavesEntrenador));
    const pagosDelEntrenador = pagosEnriquecidos.filter((pago) => coincideEntrenador(pago, clavesEntrenador));

    const clientesUnicos = new Set();
    asignacionesDelEntrenador.forEach((asignacion) => {
      const clientKey = normalizarClaveBusqueda(
        asignacion.clientId ||
        asignacion.clientEmail ||
        asignacion.clientName ||
        asignacion.clienteNombre
      );
      if (clientKey) {
        clientesUnicos.add(clientKey);
      }
    });

    const nombreCompleto = `${entrenador.firstName || entrenador.first_name || ''} ${entrenador.lastName || entrenador.last_name || ''}`.trim();

    return {
      ...entrenador,
      name: obtenerNombreEntrenador(entrenador, nombreCompleto || 'Entrenador'),
      email: entrenador.email || entrenador.trainerEmail || entrenador.trainer_email || '',
      specialty: obtenerEspecialidadEntrenador(entrenador),
      clientsCount: clientesUnicos.size,
      activeContracts: asignacionesDelEntrenador.filter((asignacion) => String(asignacion.status || asignacion.estado || '').trim().toLowerCase() === 'active').length,
      contractType: obtenerTipoContratoEntrenador(entrenador, pagosDelEntrenador[0]?.contractType || 'N/D'),
      trainerId: entrenador.id || entrenador.authUid || entrenador.legacyId || '',
      payments: pagosDelEntrenador,
    };
  });

  if (!estaActivo()) return;
  setEntrenadores(entrenadoresConResumen);
  setEntrenadoresInactivos(entrenadoresInactivosConResumen);
  setServiciosEntrenamiento(asignacionesEnriquecidas);
  setVentasServiciosEntrenador(ventasEnriquecidas);
  setPagosEntrenadores(pagosEnriquecidos);
  setCargando(false);
}).catch((error) => {
  if (!estaActivo()) return;
  console.error('Error cargando datos de entrenadores:', error);
  setCargando(false);
});
}
