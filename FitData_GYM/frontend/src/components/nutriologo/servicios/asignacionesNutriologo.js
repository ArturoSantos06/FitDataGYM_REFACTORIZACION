import { collection, getDocs } from 'firebase/firestore';
import {
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
} from '../../../firebase';
import { db } from '../../../firebase/config';

export const normalizarClaveAsignacion = (valor) =>
  String(valor || '').trim().toLowerCase();

export async function resolverClavesNutriologo(usuario = getCurrentUser()) {
  if (!usuario?.uid) return new Set();
  const [porUid, porId, porCorreo] = await Promise.all([
    getUserByAuthUid(usuario.uid),
    getUser(usuario.uid),
    usuario.email
      ? getUserByEmail(usuario.email, usuario.uid)
      : Promise.resolve({ success: false }),
  ]);
  const claves = new Set(
    [usuario.uid, usuario.email]
      .map(normalizarClaveAsignacion)
      .filter(Boolean),
  );

  [porUid, porId, porCorreo]
    .filter((resultado) => resultado?.success && resultado?.data)
    .forEach(({ data }) => {
      [data.id, data.authUid, data.legacyId, data.email].forEach((valor) => {
        const clave = normalizarClaveAsignacion(valor);
        if (clave) claves.add(clave);
      });
    });
  return claves;
}

export function extraerClavesClientesAsignados(
  documentos,
  clavesNutriologo,
) {
  const clavesClientes = new Set();
  documentos.forEach((documento) => {
    const asignacion = documento.data() || {};
    const activa =
      String(asignacion.status || 'active').toLowerCase() === 'active';
    const coincide = [
      asignacion.nutritionistId,
      asignacion.nutritionistEmail,
    ].some((valor) =>
      clavesNutriologo.has(normalizarClaveAsignacion(valor)));
    if (!activa || !coincide) return;

    [asignacion.clientId, asignacion.memberId, documento.id]
      .map(normalizarClaveAsignacion)
      .filter(Boolean)
      .forEach((clave) => clavesClientes.add(clave));
  });
  return clavesClientes;
}

export async function consultarClavesClientesAsignados(usuario) {
  const [clavesNutriologo, instantanea] = await Promise.all([
    resolverClavesNutriologo(usuario),
    getDocs(collection(db, 'client_nutritionist_assignments')),
  ]);
  return extraerClavesClientesAsignados(
    instantanea.docs,
    clavesNutriologo,
  );
}
