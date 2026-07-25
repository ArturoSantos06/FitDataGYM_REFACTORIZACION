import { collection, getDocs, Timestamp } from 'firebase/firestore';
import {
  createDietFileRecord,
  deleteDietFileRecord,
  descargarDocumentoDieta,
  eliminarImagen,
  getAllDietFiles,
  getAllMembers,
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  subirDocumentoDieta,
} from '../../../firebase';
import { db } from '../../../firebase/config';
import {
  esErrorPermisos,
  esRolNutriologo,
  normalizarClave,
} from '../utils/repositorioDietas';
import {
  asegurarAccesoRepositorioDietas,
  esperar,
  esperarUsuarioFirebase,
  prepararTokenFirebase,
} from './accesoRepositorioDietas';

const consultarDatosBase = async () => {
  let resultados = await Promise.all([getAllMembers(), getAllDietFiles()]);
  if (resultados.some((resultado) => esErrorPermisos(resultado?.error))) {
    const usuario = await esperarUsuarioFirebase();
    if (usuario?.uid) await prepararTokenFirebase(usuario);
    await esperar(350);
    resultados = await Promise.all([getAllMembers(), getAllDietFiles()]);
  }

  const [resultadoMiembros, resultadoArchivos] = resultados;
  if (!resultadoMiembros.success) {
    throw new Error(resultadoMiembros.error || 'No se pudieron cargar los pacientes.');
  }
  if (!resultadoArchivos.success) {
    throw new Error(resultadoArchivos.error || 'No se pudieron cargar los archivos.');
  }

  return {
    miembros: Array.isArray(resultadoMiembros.data) ? resultadoMiembros.data : [],
    archivos: Array.isArray(resultadoArchivos.data) ? resultadoArchivos.data : [],
  };
};

const obtenerClavesAsignadas = async (usuario) => {
  const [asignaciones, porUid, porId, porCorreo] = await Promise.all([
    getDocs(collection(db, 'client_nutritionist_assignments')),
    getUserByAuthUid(usuario?.uid || ''),
    getUser(usuario?.uid || ''),
    usuario?.email
      ? getUserByEmail(usuario.email, usuario.uid)
      : Promise.resolve({ success: false }),
  ]);
  const clavesNutriologo = new Set(
    [usuario?.uid, usuario?.email].map(normalizarClave).filter(Boolean),
  );

  [porUid, porId, porCorreo]
    .filter((resultado) => resultado?.success && resultado?.data)
    .forEach(({ data }) => {
      [data.id, data.authUid, data.legacyId, data.email].forEach((valor) => {
        const clave = normalizarClave(valor);
        if (clave) clavesNutriologo.add(clave);
      });
    });

  const clavesPacientes = new Set();
  asignaciones.docs.forEach((documento) => {
    const asignacion = documento.data() || {};
    const activa = String(asignacion.status || 'active').toLowerCase() === 'active';
    const coincide = [
      asignacion.nutritionistId,
      asignacion.nutritionistEmail,
    ].some((valor) => clavesNutriologo.has(normalizarClave(valor)));
    if (!activa || !coincide) return;

    [asignacion.clientId, asignacion.memberId, documento.id].forEach((valor) => {
      const clave = normalizarClave(valor);
      if (clave) clavesPacientes.add(clave);
    });
  });

  return clavesPacientes;
};

const filtrarPorAsignaciones = async (miembros, archivos, usuario) => {
  const clavesAsignadas = await obtenerClavesAsignadas(usuario);
  const miembrosAsignados = miembros.filter((miembro) =>
    [miembro.id, miembro.userId, miembro.authUid, miembro.email]
      .map(normalizarClave)
      .filter(Boolean)
      .some((clave) => clavesAsignadas.has(clave)));
  const clavesPermitidas = new Set();

  miembrosAsignados.forEach((miembro) => {
    [miembro.id, miembro.userId, miembro.authUid, miembro.email].forEach((valor) => {
      const clave = normalizarClave(valor);
      if (clave) clavesPermitidas.add(clave);
    });
  });

  const archivosAsignados = archivos.filter((archivo) =>
    [
      archivo.memberId,
      archivo.memberUserId,
      archivo.memberAuthUid,
      archivo.memberEmail,
    ]
      .map(normalizarClave)
      .filter(Boolean)
      .some((clave) => clavesPermitidas.has(clave)));

  return { miembros: miembrosAsignados, archivos: archivosAsignados };
};

export async function consultarRepositorioDietas() {
  const acceso = await asegurarAccesoRepositorioDietas();
  const datos = await consultarDatosBase();
  if (!esRolNutriologo(acceso.rol)) return { ...datos, rol: acceso.rol };

  const asignados = await filtrarPorAsignaciones(
    datos.miembros,
    datos.archivos,
    acceso.usuario,
  );
  return { ...asignados, rol: acceso.rol };
}

export async function guardarArchivoDieta({
  archivo,
  paciente,
  titulo,
  notas,
}) {
  const acceso = await asegurarAccesoRepositorioDietas();
  const resultadoSubida = await subirDocumentoDieta(archivo, paciente.id);
  if (!resultadoSubida.success) {
    throw new Error(resultadoSubida.error || 'No se pudo subir el archivo.');
  }

  const correoPersonal = getCurrentUser()?.email || acceso.rol || 'personal';
  const registro = {
    memberId: String(paciente.id),
    memberName: paciente.nombreCompleto,
    memberEmail: paciente.email || '',
    memberUserId: paciente.userId || '',
    memberAuthUid: paciente.authUid || '',
    title: titulo,
    notes: notas,
    originalFileName: resultadoSubida.fileName,
    contentType: resultadoSubida.contentType,
    size: resultadoSubida.size,
    storagePath: resultadoSubida.path,
    downloadURL: resultadoSubida.url,
    uploadedBy: correoPersonal,
  };
  const resultadoRegistro = await createDietFileRecord(registro);

  if (!resultadoRegistro.success) {
    await eliminarImagen(resultadoSubida.path);
    throw new Error(
      resultadoRegistro.error || 'No se pudo guardar el registro del archivo.',
    );
  }

  return {
    id: resultadoRegistro.id,
    ...registro,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  };
}

export const descargarArchivoDieta = (archivo) =>
  descargarDocumentoDieta(
    archivo.storagePath,
    archivo.originalFileName || archivo.title || 'archivo',
    archivo.downloadURL || '',
  );

export async function eliminarArchivoDieta(archivo) {
  const resultadoRegistro = await deleteDietFileRecord(archivo.id);
  if (!resultadoRegistro.success) {
    throw new Error(resultadoRegistro.error || 'No se pudo eliminar el registro.');
  }

  if (!archivo.storagePath) return { advertencia: '' };
  const resultadoStorage = await eliminarImagen(archivo.storagePath);
  return {
    advertencia: resultadoStorage.success
      ? ''
      : ' El registro se eliminó, pero el archivo físico requiere revisión.',
  };
}
