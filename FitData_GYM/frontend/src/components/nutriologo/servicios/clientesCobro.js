import { collection, getDocs } from 'firebase/firestore';
import {
  getAllMembers,
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
} from '../../../firebase';
import { db } from '../../../firebase/config';

const normalizarClave = (valor) => String(valor || '').trim().toLowerCase();

const obtenerClavesNutriologo = (usuarioActual, resultadosUsuario) => {
  const claves = new Set(
    [usuarioActual.uid, usuarioActual.email].map(normalizarClave).filter(Boolean),
  );

  resultadosUsuario
    .filter((resultado) => resultado?.success && resultado?.data)
    .forEach(({ data }) => {
      [data.id, data.authUid, data.legacyId, data.email].forEach((valor) => {
        const clave = normalizarClave(valor);
        if (clave) claves.add(clave);
      });
    });

  return claves;
};

const obtenerClientesAsignados = (instantanea, clavesNutriologo) => {
  const clavesClientes = new Set();

  instantanea.docs.forEach((documento) => {
    const asignacion = documento.data() || {};
    const estado = String(asignacion.status || 'active').toLowerCase();
    const perteneceAlNutriologo = [
      asignacion.nutritionistId,
      asignacion.nutritionistEmail,
    ].some((valor) => clavesNutriologo.has(normalizarClave(valor)));

    if (!perteneceAlNutriologo || estado !== 'active') return;

    const idCliente = asignacion.clientId || asignacion.memberId || documento.id;
    const claveCliente = normalizarClave(idCliente);
    if (claveCliente) clavesClientes.add(claveCliente);
  });

  return clavesClientes;
};

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

  const consultaCorreo = usuarioActual.email
    ? getUserByEmail(usuarioActual.email, usuarioActual.uid)
    : Promise.resolve({ success: false });

  const [resultadoMiembros, asignaciones, porUid, porId, porCorreo] = await Promise.all([
    getAllMembers(),
    getDocs(collection(db, 'client_nutritionist_assignments')),
    getUserByAuthUid(usuarioActual.uid),
    getUser(usuarioActual.uid),
    consultaCorreo,
  ]);

  if (!resultadoMiembros.success) {
    throw new Error(resultadoMiembros.error || 'No se pudo cargar la lista de clientes.');
  }

  const clavesNutriologo = obtenerClavesNutriologo(
    usuarioActual,
    [porUid, porId, porCorreo],
  );
  const clavesClientes = obtenerClientesAsignados(asignaciones, clavesNutriologo);
  const miembros = Array.isArray(resultadoMiembros.data) ? resultadoMiembros.data : [];

  return miembros
    .map(adaptarCliente)
    .filter((cliente) =>
      [cliente.userId, cliente.id, cliente.authUid, cliente.email]
        .map(normalizarClave)
        .filter(Boolean)
        .some((clave) => clavesClientes.has(clave)));
}
