import {
  collection,
  getDocs,
} from 'firebase/firestore';

import { db } from '../../../../firebase/config';

import {
  getAllMembers,
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
} from '../../../../firebase';

import {
  asignacionPerteneceAlEntrenador,
  filtrarMiembrosAsignados,
  obtenerClavesClienteAsignacion,
  obtenerClavesEntrenador,
} from './bitacoraEntrenadorUtils';

export async function obtenerClientesAsignados() {
  const usuario = getCurrentUser();

  if (!usuario) {
    throw new Error(
      'No hay una sesión activa de entrenador.',
    );
  }

  const consultaCorreo = usuario.email
    ? getUserByEmail(usuario.email, usuario.uid)
    : Promise.resolve({ success: false });

  const [
    resultadoMiembros,
    asignaciones,
    porAuthUid,
    porDocumento,
    porCorreo,
  ] = await Promise.all([
    getAllMembers(),
    getDocs(
      collection(
        db,
        'client_trainer_assignments',
      ),
    ),
    getUserByAuthUid(usuario.uid),
    getUser(usuario.uid),
    consultaCorreo,
  ]);

  if (!resultadoMiembros?.success) {
    throw new Error(
      'No se pudieron cargar los clientes.',
    );
  }

  const clavesEntrenador =
    obtenerClavesEntrenador(usuario, [
      porAuthUid,
      porDocumento,
      porCorreo,
    ]);

  const clavesClientes = new Set();

  asignaciones.docs.forEach((documento) => {
    const asignacion = documento.data() ?? {};

    if (
      !asignacionPerteneceAlEntrenador(
        asignacion,
        clavesEntrenador,
      )
    ) {
      return;
    }

    obtenerClavesClienteAsignacion(
      asignacion,
      documento.id,
    ).forEach((claveCliente) => {
      if (!clavesEntrenador.has(claveCliente)) {
        clavesClientes.add(claveCliente);
      }
    });
  });

  const miembros = Array.isArray(
    resultadoMiembros.data,
  )
    ? resultadoMiembros.data
    : [];

  return {
    entrenadorActual: {
      uid: usuario.uid,
      email: usuario.email,
    },

    miembros: filtrarMiembrosAsignados(
      miembros,
      clavesClientes,
    ),
  };
}