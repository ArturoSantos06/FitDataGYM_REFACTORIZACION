import { useState, useEffect, useMemo } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import {
  db,
  getAllMembers,
  getAllDietFiles,
  createDietFileRecord,
  deleteDietFileRecord,
  createUser,
  eliminarImagen,
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  onAuthChanged,
  subirDocumentoDieta,
  descargarDocumentoDieta
} from '../../../firebase';

// --- CONSTANTES Y FUNCIONES DE APOYO (Lógica Original Intacta) ---
const maxDietFileSizeBytes = 10 * 1024 * 1024;
const maxTitleLength = 120;
const maxNotesLength = 500;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const isPermissionDeniedError = (errorMessage = '') => {
  const msg = String(errorMessage || '').toLowerCase();
  return msg.includes('missing or insufficient permissions') || msg.includes('permission-denied');
};

const normalizeSearchText = (value = '') => {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

const normalizeRole = (roleValue) => String(roleValue || '').toLowerCase().trim();
const normalizeLookupKey = (value) => String(value || '').toLowerCase().trim();

const isNutritionistRole = (roleValue) => {
  const role = normalizeRole(roleValue);
  return ['nutritionist', 'nutriologo', 'nutriologa', 'nutriologo/a', 'nutricionista', 'nutri'].includes(role);
};

const hasPrivilegedRole = (userData) => {
  const role = normalizeRole(userData?.role);
  return ['admin', 'entrenador', 'trainer', 'nutritionist', 'nutriologo', 'nutriologa', 'nutriologo/a', 'nutricionista', 'nutri'].includes(role);
};

const ensureFirebaseTokenReady = async (user) => {
  if (!user?.uid) return null;
  try {
    await user.getIdToken();
  } catch {
    await user.getIdToken(true);
  }
  return user;
};

const waitForFirebaseUser = () => {
  const currentUser = getCurrentUser();
  if (currentUser?.uid && currentUser?.email) {
    return ensureFirebaseTokenReady(currentUser);
  }

  return new Promise((resolve) => {
    let settled = false;
    const finish = (user) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      unsubscribe();
      resolve(user || null);
    };

    const unsubscribe = onAuthChanged((user) => {
      if (user?.uid && user?.email) {
        ensureFirebaseTokenReady(user)
          .then((readyUser) => finish(readyUser))
          .catch(() => finish(user));
      }
    });

    const timeoutId = setTimeout(() => finish(getCurrentUser()), 4000);
  });
};

const ensureStaffMirrorUser = async () => {
  const currentUser = await waitForFirebaseUser();
  const currentEmail = String(currentUser?.email || '').trim();
  const normalizedEmail = currentEmail.toLowerCase();

  if (!currentUser?.uid || !currentUser?.email) {
    return { success: false, error: 'Tu sesión de Firebase no está lista. Cierra sesión y vuelve a entrar.' };
  }

  const directUserResult = await getUser(currentUser.uid);
  if (directUserResult.success && hasPrivilegedRole(directUserResult.data)) {
    return { success: true, role: normalizeRole(directUserResult.data?.role) };
  }

  const authUidUserResult = await getUserByAuthUid(currentUser.uid);
  let sourceUser = authUidUserResult.success && hasPrivilegedRole(authUidUserResult.data)
    ? authUidUserResult.data : null;

  if (!sourceUser) {
    const emailUserResult = await getUserByEmail(currentEmail);
    const emailUserResultNormalized = !emailUserResult.success && normalizedEmail !== currentEmail
      ? await getUserByEmail(normalizedEmail) : emailUserResult;

    if (emailUserResultNormalized.success && hasPrivilegedRole(emailUserResultNormalized.data)) {
      sourceUser = emailUserResultNormalized.data;
    }
  }

  if (!sourceUser) {
    return { success: false, error: 'Tu cuenta no tiene rol de staff autorizado para gestionar dietas.' };
  }

  const staffRole = normalizeRole(sourceUser.role) || 'nutriologo';
  let createResult = await createUser(currentUser.uid, {
    email: currentEmail,
    displayName: sourceUser.displayName || sourceUser.username || currentUser.displayName || currentEmail.split('@')[0],
    username: sourceUser.username || sourceUser.displayName || currentEmail.split('@')[0],
    role: staffRole,
    authUid: currentUser.uid
  });

  if (!createResult.success && isPermissionDeniedError(createResult.error)) {
    await ensureFirebaseTokenReady(currentUser);
    await sleep(350);
    createResult = await createUser(currentUser.uid, {
      email: currentEmail,
      displayName: sourceUser.displayName || sourceUser.username || currentUser.displayName || currentEmail.split('@')[0],
      username: sourceUser.username || sourceUser.displayName || currentEmail.split('@')[0],
      role: staffRole,
      authUid: currentUser.uid
    });
  }

  if (!createResult.success) {
    return { success: false, error: createResult.error || 'No se pudo habilitar el acceso de staff para esta sesión.' };
  }

  await ensureFirebaseTokenReady(currentUser);
  return { success: true, role: staffRole };
};
// ----------------------------------------------------------------

export default function useRepositorioDietas() {
  const [miembros, setMiembros] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState('');
  const [titulo, setTitulo] = useState('');
  const [notas, setNotas] = useState('');
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [filtroPaciente, setFiltroPaciente] = useState('');
  const [filtroArchivo, setFiltroArchivo] = useState('');
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mostrarTodosRecientes, setMostrarTodosRecientes] = useState(false);
  const [rolSesion, setRolSesion] = useState('');
  const [modalExito, setModalExito] = useState({ open: false, title: '', message: '' });
  const [modalError, setModalError] = useState({ open: false, message: '' });
  const [archivoPendienteEliminar, setArchivoPendienteEliminar] = useState(null);

  const cargarDatos = async () => {
    setCargando(true);
    setMiembros([]);
    setArchivos([]);

    const accessResult = await ensureStaffMirrorUser();
    if (!accessResult.success) {
      setModalError({ open: true, message: accessResult.error });
      setCargando(false);
      return;
    }

    setRolSesion(normalizeRole(accessResult.role));

    const currentUser = await waitForFirebaseUser();
    if (currentUser?.uid) await ensureFirebaseTokenReady(currentUser);

    let [membersResult, filesResult] = await Promise.all([getAllMembers(), getAllDietFiles()]);

    if (isPermissionDeniedError(membersResult?.error) || isPermissionDeniedError(filesResult?.error)) {
      const retryUser = await waitForFirebaseUser();
      if (retryUser?.uid) await ensureFirebaseTokenReady(retryUser);
      await sleep(350);
      [membersResult, filesResult] = await Promise.all([getAllMembers(), getAllDietFiles()]);
    }

    if (!membersResult.success) setModalError({ open: true, message: membersResult.error || 'No se pudieron cargar los pacientes' });
    else setMiembros(membersResult.data || []);

    if (!filesResult.success) setModalError({ open: true, message: filesResult.error || 'No se pudieron cargar los archivos' });
    else setArchivos(filesResult.data || []);

    const shouldRestrictToAssignments = isNutritionistRole(accessResult.role);
    if (shouldRestrictToAssignments && membersResult.success && filesResult.success) {
      let assignmentsSnap;
      try {
        assignmentsSnap = await getDocs(collection(db, 'client_nutritionist_assignments'));
      } catch (assignmentError) {
        setMiembros([]);
        setArchivos([]);
        setModalError({ open: true, message: assignmentError?.message || 'No se pudieron validar los pacientes asignados al nutriólogo.' });
        setCargando(false);
        return;
      }

      const userCandidates = [
        await getUserByAuthUid(currentUser?.uid || ''),
        await getUser(currentUser?.uid || ''),
        currentUser?.email ? await getUserByEmail(currentUser.email, currentUser.uid) : { success: false }
      ];

      const nutritionistKeys = new Set([currentUser?.uid, currentUser?.email].map(normalizeLookupKey).filter(Boolean));

      userCandidates.filter((item) => item?.success && item?.data).forEach((item) => {
        const data = item.data;
        [data.id, data.authUid, data.legacyId, data.email].forEach((key) => {
          const normalized = normalizeLookupKey(key);
          if (normalized) nutritionistKeys.add(normalized);
        });
      });

      const assignedClientKeys = new Set();
      assignmentsSnap.docs.forEach((docSnap) => {
        const assignment = docSnap.data() || {};
        const status = String(assignment.status || 'active').toLowerCase();
        const nutritionistId = normalizeLookupKey(assignment.nutritionistId);
        const nutritionistEmail = normalizeLookupKey(assignment.nutritionistEmail);
        const matchesNutritionist = nutritionistKeys.has(nutritionistId) || nutritionistKeys.has(nutritionistEmail);

        if (!matchesNutritionist || status !== 'active') return;

        [assignment.clientId, assignment.memberId, docSnap.id].forEach((clientKey) => {
          const normalized = normalizeLookupKey(clientKey);
          if (normalized) assignedClientKeys.add(normalized);
        });
      });

      const allMembers = Array.isArray(membersResult.data) ? membersResult.data : [];
      const assignedMembers = allMembers.filter((member) => {
        const memberKeys = [member.id, member.userId, member.authUid, member.email].map(normalizeLookupKey).filter(Boolean);
        return memberKeys.some((key) => assignedClientKeys.has(key));
      });

      const allowedMemberKeys = new Set();
      assignedMembers.forEach((member) => {
        [member.id, member.userId, member.authUid, member.email].forEach((key) => {
          const normalized = normalizeLookupKey(key);
          if (normalized) allowedMemberKeys.add(normalized);
        });
      });

      const allFiles = Array.isArray(filesResult.data) ? filesResult.data : [];
      const assignedFiles = allFiles.filter((fileItem) => {
        const fileKeys = [fileItem.memberId, fileItem.memberUserId, fileItem.memberAuthUid, fileItem.memberEmail].map(normalizeLookupKey).filter(Boolean);
        return fileKeys.some((key) => allowedMemberKeys.has(key));
      });

      setMiembros(assignedMembers);
      setArchivos(assignedFiles);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const miembrosNormalizados = useMemo(() => {
    return [...miembros]
      .map((member) => ({
        ...member,
        fullName: [member.nombre, member.apellido].filter(Boolean).join(' ').trim() || member.email || `Miembro ${member.id}`
      }))
      .sort((a, b) => a.fullName.localeCompare(b.fullName, 'es-MX'));
  }, [miembros]);

  const pacientesFiltrados = useMemo(() => {
    const search = normalizeSearchText(filtroPaciente);
    if (!search) return miembrosNormalizados;
    return miembrosNormalizados.filter((member) =>
      normalizeSearchText(member.fullName).includes(search) ||
      normalizeSearchText(member.email || '').includes(search) ||
      normalizeSearchText(String(member.userId || '')).includes(search)
    );
  }, [miembrosNormalizados, filtroPaciente]);

  const miembrosPorId = useMemo(() => {
    const map = new Map();
    miembrosNormalizados.forEach((member) => map.set(String(member.id), member));
    return map;
  }, [miembrosNormalizados]);

  const archivosHidratados = useMemo(() => {
    return archivos.map((file) => {
      const linkedMember = miembrosPorId.get(String(file.memberId));
      return {
        ...file,
        resolvedMemberName: file.memberName || linkedMember?.fullName || 'Sin nombre',
        resolvedMemberEmail: file.memberEmail || linkedMember?.email || ''
      };
    });
  }, [archivos, miembrosPorId]);

  const archivosFiltrados = useMemo(() => {
    const search = normalizeSearchText(filtroArchivo);
    const shouldSearchAcrossAll = mostrarTodosRecientes || Boolean(search);

    if (!idPacienteSeleccionado && !shouldSearchAcrossAll) return [];

    const baseFiles = (shouldSearchAcrossAll
      ? [...archivosHidratados]
      : archivosHidratados.filter((file) => String(file.memberId) === String(idPacienteSeleccionado)))
      .sort((a, b) => {
        const aTime = a.createdAt?.seconds || a.updatedAt?.seconds || 0;
        const bTime = b.createdAt?.seconds || b.updatedAt?.seconds || 0;
        return bTime - aTime;
      });

    if (!search) return baseFiles;

    return baseFiles.filter((file) =>
      normalizeSearchText(file.resolvedMemberName || '').includes(search) ||
      normalizeSearchText(file.resolvedMemberEmail || '').includes(search) ||
      normalizeSearchText(file.title || '').includes(search) ||
      normalizeSearchText(file.notes || '').includes(search) ||
      normalizeSearchText(file.originalFileName || '').includes(search)
    );
  }, [archivosHidratados, filtroArchivo, idPacienteSeleccionado, mostrarTodosRecientes]);

  const reiniciarFormulario = () => {
    setTitulo('');
    setNotas('');
    setArchivoSeleccionado(null);
  };

  const manejarCambioArchivo = (event) => {
    const file = event.target.files?.[0] || null;
    if (!file) {
      setArchivoSeleccionado(null);
      return;
    }
    if (file.size > maxDietFileSizeBytes) {
      event.target.value = '';
      setArchivoSeleccionado(null);
      setModalError({ open: true, message: 'El archivo supera el limite de 10 MB. Selecciona un PDF, JPG o PNG de maximo 10 MB.' });
      return;
    }
    setArchivoSeleccionado(file);
  };

  const manejarEnvio = async (event) => {
    event.preventDefault();
    if (!idPacienteSeleccionado) {
      setModalError({ open: true, message: 'Selecciona un paciente antes de subir el archivo' });
      return;
    }
    if (!archivoSeleccionado) {
      setModalError({ open: true, message: 'Selecciona un archivo para continuar' });
      return;
    }

    const selectedMember = miembrosNormalizados.find((member) => String(member.id) === String(idPacienteSeleccionado));
    if (!selectedMember) {
      setModalError({ open: true, message: 'No se encontró la información del paciente seleccionado' });
      return;
    }

    const safeTitle = (titulo.trim() || archivoSeleccionado.name || 'archivo').slice(0, maxTitleLength);
    const safeNotes = notas.trim().slice(0, maxNotesLength);
    setGuardando(true);

    const accessResult = await ensureStaffMirrorUser();
    if (!accessResult.success) {
      setGuardando(false);
      setModalError({ open: true, message: accessResult.error });
      return;
    }

    const uploadResult = await subirDocumentoDieta(archivoSeleccionado, idPacienteSeleccionado);
    if (!uploadResult.success) {
      setGuardando(false);
      setModalError({ open: true, message: uploadResult.error || 'No se pudo subir el archivo' });
      return;
    }

    const currentStaff = JSON.parse(localStorage.getItem('firebaseUser') || '{}');
    const recordResult = await createDietFileRecord({
      memberId: String(idPacienteSeleccionado),
      memberName: selectedMember.fullName,
      memberEmail: selectedMember.email || '',
      memberUserId: selectedMember.userId || '',
      title: safeTitle,
      notes: safeNotes,
      originalFileName: uploadResult.fileName,
      contentType: uploadResult.contentType,
      size: uploadResult.size,
      storagePath: uploadResult.path,
      downloadURL: uploadResult.url,
      uploadedBy: currentStaff.email || accessResult.role || 'staff'
    });

    if (!recordResult.success) {
      await eliminarImagen(uploadResult.path);
      setGuardando(false);
      setModalError({ open: true, message: recordResult.error || 'No se pudo guardar el registro del archivo' });
      return;
    }

    await cargarDatos();
    reiniciarFormulario();
    setGuardando(false);
    setModalExito({ open: true, title: 'Archivo guardado', message: 'Archivo agregado correctamente al expediente del paciente' });
  };

  const manejarDescarga = async (fileItem) => {
    const result = await descargarDocumentoDieta(
      fileItem.storagePath,
      fileItem.originalFileName || fileItem.title || 'archivo',
      fileItem.downloadURL || ''
    );
    if (!result.success) {
      setModalError({ open: true, message: result.error || 'No se pudo descargar automáticamente. Verifica la conexión y vuelve a intentar.' });
    }
  };

  const manejarEliminacion = async (fileItem) => {
    setGuardando(true);
    const deleteRecordResult = await deleteDietFileRecord(fileItem.id);
    if (!deleteRecordResult.success) {
      setGuardando(false);
      setModalError({ open: true, message: deleteRecordResult.error || 'No se pudo eliminar el registro' });
      return;
    }
    if (fileItem.storagePath) await eliminarImagen(fileItem.storagePath);
    
    await cargarDatos();
    setGuardando(false);
    setArchivoPendienteEliminar(null);
    setModalExito({ open: true, title: 'Archivo eliminado', message: 'Archivo eliminado correctamente' });
  };

  const solicitarEliminacion = (fileItem) => setArchivoPendienteEliminar(fileItem);

  const manejarSeleccionPaciente = (memberId) => {
    const nextId = String(memberId || '');
    setIdPacienteSeleccionado((currentId) => (String(currentId) === nextId ? '' : nextId));
  };

  const limpiarPacienteSeleccionado = () => {
    setIdPacienteSeleccionado('');
    setMostrarTodosRecientes(false);
    setFiltroArchivo('');
    requestAnimationFrame(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    });
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') limpiarPacienteSeleccionado();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return {
    miembros, archivos, 
    idPacienteSeleccionado,
    titulo, setTitulo,
    notas, setNotas,
    archivoSeleccionado, 
    filtroPaciente, setFiltroPaciente,
    filtroArchivo, setFiltroArchivo,
    cargando, guardando,
    mostrarTodosRecientes, setMostrarTodosRecientes,
    rolSesion,
    modalExito, setModalExito,
    modalError, setModalError,
    archivoPendienteEliminar, setArchivoPendienteEliminar,
    pacientesFiltrados, archivosFiltrados,
    manejarCambioArchivo, manejarEnvio, manejarDescarga,
    manejarEliminacion, solicitarEliminacion, manejarSeleccionPaciente
  };
}