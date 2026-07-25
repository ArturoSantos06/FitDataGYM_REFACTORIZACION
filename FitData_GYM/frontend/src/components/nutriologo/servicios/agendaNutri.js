import { collection, onSnapshot, query } from 'firebase/firestore';
import {
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
} from '../../../firebase';
import { db } from '../../../firebase/config';
import {
  normalizarClaveAgenda,
  obtenerClaseColorAvatar,
} from '../utils/agendaNutri';

const resolverClavesNutriologo = async () => {
  const usuario = getCurrentUser();
  if (!usuario) return new Set();

  const [porUid, porId, porCorreo] = await Promise.all([
    getUserByAuthUid(usuario.uid),
    getUser(usuario.uid),
    usuario.email
      ? getUserByEmail(usuario.email, usuario.uid)
      : Promise.resolve({ success: false }),
  ]);
  const claves = new Set(
    [usuario.uid, usuario.email].map(normalizarClaveAgenda).filter(Boolean),
  );

  [porUid, porId, porCorreo]
    .filter((resultado) => resultado?.success && resultado?.data)
    .forEach(({ data }) => {
      [data.id, data.authUid, data.legacyId, data.email].forEach((valor) => {
        const clave = normalizarClaveAgenda(valor);
        if (clave) claves.add(clave);
      });
    });

  return claves;
};

const obtenerEdadMiembro = (miembro, perfilesPorClave) => {
  const perfil = perfilesPorClave[miembro.id]
    || perfilesPorClave[miembro.userId]
    || perfilesPorClave[miembro.authUid];
  return perfil?.edad ?? perfil?.age ?? null;
};

export async function suscribirAsignacionesNutriologo(alActualizar, alFallar) {
  const clavesNutriologo = await resolverClavesNutriologo();
  if (!clavesNutriologo.size) {
    alActualizar([]);
    return () => {};
  }

  return onSnapshot(
    query(collection(db, 'client_nutritionist_assignments')),
    (instantanea) => {
      const idsClientes = new Set();
      instantanea.docs.forEach((documento) => {
        const asignacion = documento.data() || {};
        const activa = String(asignacion.status || 'active').toLowerCase() === 'active';
        const coincide = [
          asignacion.nutritionistId,
          asignacion.nutritionistEmail,
        ].some((valor) => clavesNutriologo.has(normalizarClaveAgenda(valor)));
        if (!activa || !coincide) return;

        const idCliente = asignacion.clientId || asignacion.memberId || documento.id;
        if (idCliente) idsClientes.add(String(idCliente));
      });
      alActualizar([...idsClientes]);
    },
    alFallar,
  );
}

export function suscribirMiembrosAgenda(alActualizar, alFallar) {
  let miembros = [];
  let perfilesPorClave = {};

  const emitirMiembros = () => {
    alActualizar(miembros.map((miembro) => ({
      ...miembro,
      edad: obtenerEdadMiembro(miembro, perfilesPorClave),
      claseColorAvatar: obtenerClaseColorAvatar(
        miembro.avatarColor || miembro.avatar_color,
      ),
    })));
  };

  const cancelarMiembros = onSnapshot(
    query(collection(db, 'miembros')),
    (instantanea) => {
      miembros = instantanea.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      }));
      emitirMiembros();
    },
    alFallar,
  );
  const cancelarPerfiles = onSnapshot(
    query(collection(db, 'healthProfiles')),
    (instantanea) => {
      perfilesPorClave = {};
      instantanea.docs.forEach((documento) => {
        const perfil = documento.data();
        perfilesPorClave[perfil.userId || documento.id] = perfil;
      });
      emitirMiembros();
    },
    alFallar,
  );

  return () => {
    cancelarMiembros();
    cancelarPerfiles();
  };
}

export const suscribirCitasNutriologo = (alActualizar, alFallar) =>
  onSnapshot(
    query(collection(db, 'citas')),
    (instantanea) => alActualizar(
      instantanea.docs.map((documento) => ({
        id: documento.id,
        ...documento.data(),
      })),
    ),
    alFallar,
  );
