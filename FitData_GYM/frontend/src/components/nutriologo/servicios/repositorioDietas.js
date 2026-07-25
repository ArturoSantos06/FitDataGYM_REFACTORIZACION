import { Timestamp } from 'firebase/firestore';
import {
  createDietFileRecord,
  deleteDietFileRecord,
  descargarDocumentoDieta,
  eliminarImagen,
  getAllDietFiles,
  getAllMembers,
  getCurrentUser,
  subirDocumentoDieta,
} from '../../../firebase';
import {
  esErrorPermisos,
  esRolNutriologo,
} from '../utils/repositorioDietas';
import {
  asegurarAccesoRepositorioDietas,
  esperar,
  esperarUsuarioFirebase,
  prepararTokenFirebase,
} from './accesoRepositorioDietas';
import {
  consultarClavesClientesAsignados,
  normalizarClaveAsignacion,
} from './asignacionesNutriologo';

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

const filtrarPorAsignaciones = async (miembros, archivos, usuario) => {
  const clavesAsignadas = await consultarClavesClientesAsignados(usuario);
  const miembrosAsignados = miembros.filter((miembro) =>
    [miembro.id, miembro.userId, miembro.authUid, miembro.email]
      .map(normalizarClaveAsignacion)
      .filter(Boolean)
      .some((clave) => clavesAsignadas.has(clave)));
  const clavesPermitidas = new Set();

  miembrosAsignados.forEach((miembro) => {
    [miembro.id, miembro.userId, miembro.authUid, miembro.email].forEach((valor) => {
      const clave = normalizarClaveAsignacion(valor);
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
      .map(normalizarClaveAsignacion)
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
