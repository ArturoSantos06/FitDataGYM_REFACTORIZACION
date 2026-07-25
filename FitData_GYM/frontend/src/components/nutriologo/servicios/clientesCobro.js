import {
  createMembershipSale,
  getAllMembers,
  getCurrentUser,
} from '../../../firebase';
import { obtenerNombreCompleto } from '../utils/utilidadesCobros';
import {
  consultarClavesClientesAsignados,
  normalizarClaveAsignacion,
} from './asignacionesNutriologo';

const adaptarCliente = (miembro) => ({
  id: miembro.id,
  userId: String(miembro.userId || ''),
  authUid: miembro.authUid || '',
  email: miembro.email || '',
  nombre: miembro.nombre || '',
  apellido: miembro.apellido || '',
  createdAt: miembro.createdAt || null,
});

export async function consultarClientesAsignados() {
  const usuarioActual = getCurrentUser();
  if (!usuarioActual) throw new Error('No hay una sesión activa de nutriólogo.');

  const [resultadoMiembros, clavesClientes] = await Promise.all([
    getAllMembers(),
    consultarClavesClientesAsignados(usuarioActual),
  ]);

  if (!resultadoMiembros.success) {
    throw new Error(resultadoMiembros.error || 'No se pudo cargar la lista de clientes.');
  }

  const miembros = Array.isArray(resultadoMiembros.data) ? resultadoMiembros.data : [];

  return miembros
    .map(adaptarCliente)
    .filter((cliente) =>
      [cliente.userId, cliente.id, cliente.authUid, cliente.email]
        .map(normalizarClaveAsignacion)
        .filter(Boolean)
        .some((clave) => clavesClientes.has(clave)));
}

export async function registrarCobroNutricional({
  cliente,
  metodoPago,
  total,
}) {
  const usuarioActual = getCurrentUser();
  const correoVendedor = usuarioActual?.email
    || localStorage.getItem('nutritionist_username')
    || '';
  const resultado = await createMembershipSale({
    cliente_id: String(cliente.userId || '').trim() || null,
    metodo_pago: metodoPago,
    total,
    monto_recibido: total,
    membership_name: 'Plan Nutricional',
    tipo_venta: 'PLAN_NUTRICIONAL',
    sellerId: usuarioActual?.uid || '',
    sellerEmail: correoVendedor,
    vendedorId: usuarioActual?.uid || '',
    vendedorEmail: correoVendedor,
    cliente_auth_uid: cliente.authUid || '',
    cliente_nombre_override: obtenerNombreCompleto(cliente),
    cliente_email_override: cliente.email || '',
  });
  if (!resultado.success) {
    throw new Error(resultado.error || 'No se pudo registrar el cobro.');
  }
  return resultado;
}
