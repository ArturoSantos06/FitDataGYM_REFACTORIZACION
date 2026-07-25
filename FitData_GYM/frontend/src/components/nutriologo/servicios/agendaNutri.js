import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { obtenerClaseColorAvatar } from '../utils/agendaNutri';
import {
  extraerClavesClientesAsignados,
  resolverClavesNutriologo,
} from './asignacionesNutriologo';

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
      alActualizar([
        ...extraerClavesClientesAsignados(
          instantanea.docs,
          clavesNutriologo,
        ),
      ]);
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
