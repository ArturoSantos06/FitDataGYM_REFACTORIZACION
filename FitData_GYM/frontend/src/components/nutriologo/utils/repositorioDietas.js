export const LIMITE_ARCHIVO_DIETA = 10 * 1024 * 1024;
export const LIMITE_TITULO_DIETA = 120;
export const LIMITE_NOTAS_DIETA = 500;
export const LIMITE_BUSQUEDA_DIETA = 80;
export const TIPOS_ARCHIVO_DIETA = ['application/pdf', 'image/jpeg', 'image/png'];

export const normalizarTexto = (valor = '') =>
  String(valor || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

export const normalizarRol = (valor) => String(valor || '').toLowerCase().trim();
export const normalizarClave = (valor) => String(valor || '').toLowerCase().trim();

export const esRolNutriologo = (valor) => [
  'nutritionist',
  'nutriologo',
  'nutriologa',
  'nutriologo/a',
  'nutricionista',
  'nutri',
].includes(normalizarRol(valor));

export const tieneRolPrivilegiado = (usuario) => [
  'admin',
  'entrenador',
  'trainer',
  'nutritionist',
  'nutriologo',
  'nutriologa',
  'nutriologo/a',
  'nutricionista',
  'nutri',
].includes(normalizarRol(usuario?.role));

export const esErrorPermisos = (mensaje = '') => {
  const texto = normalizarTexto(mensaje);
  return texto.includes('missing or insufficient permissions')
    || texto.includes('permission-denied');
};

export const validarArchivoDieta = (archivo) => {
  if (!archivo) return 'Selecciona un archivo para continuar.';
  if (!TIPOS_ARCHIVO_DIETA.includes(archivo.type)) {
    return 'Solo se permiten archivos PDF, JPG o PNG.';
  }
  if (archivo.size > LIMITE_ARCHIVO_DIETA) {
    return 'El archivo supera el límite de 10 MB.';
  }
  return '';
};

export const prepararPacientes = (miembros) =>
  [...miembros]
    .map((miembro) => ({
      ...miembro,
      nombreCompleto: [miembro.nombre, miembro.apellido]
        .filter(Boolean)
        .join(' ')
        .trim() || miembro.email || `Miembro ${miembro.id}`,
    }))
    .sort((a, b) => a.nombreCompleto.localeCompare(b.nombreCompleto, 'es-MX'));

export const filtrarPacientes = (pacientes, busqueda) => {
  const termino = normalizarTexto(busqueda);
  if (!termino) return pacientes;

  return pacientes.filter((paciente) => [
    paciente.nombreCompleto,
    paciente.email,
    paciente.userId,
  ].some((valor) => normalizarTexto(valor).includes(termino)));
};

export const hidratarArchivos = (archivos, pacientes) => {
  const pacientesPorId = new Map(
    pacientes.map((paciente) => [String(paciente.id), paciente]),
  );

  return archivos.map((archivo) => {
    const paciente = pacientesPorId.get(String(archivo.memberId));
    return {
      ...archivo,
      nombrePacienteResuelto: archivo.memberName || paciente?.nombreCompleto || 'Sin nombre',
      correoPacienteResuelto: archivo.memberEmail || paciente?.email || '',
    };
  });
};

const obtenerMarcaTiempo = (archivo) =>
  archivo.createdAt?.seconds || archivo.updatedAt?.seconds || 0;

export const filtrarArchivos = ({
  archivos,
  busqueda,
  idPaciente,
  mostrarRecientes,
}) => {
  const termino = normalizarTexto(busqueda);
  const buscarEnTodos = mostrarRecientes || Boolean(termino);
  if (!idPaciente && !buscarEnTodos) return [];

  const base = buscarEnTodos
    ? archivos
    : archivos.filter((archivo) => String(archivo.memberId) === String(idPaciente));

  const ordenados = [...base].sort(
    (a, b) => obtenerMarcaTiempo(b) - obtenerMarcaTiempo(a),
  );
  if (!termino) return ordenados;

  return ordenados.filter((archivo) => [
    archivo.nombrePacienteResuelto,
    archivo.correoPacienteResuelto,
    archivo.title,
    archivo.notes,
    archivo.originalFileName,
  ].some((valor) => normalizarTexto(valor).includes(termino)));
};

export const contarArchivosPorPaciente = (archivos) => {
  const cantidades = new Map();
  archivos.forEach((archivo) => {
    const clave = String(archivo.memberId);
    cantidades.set(clave, (cantidades.get(clave) || 0) + 1);
  });
  return cantidades;
};
