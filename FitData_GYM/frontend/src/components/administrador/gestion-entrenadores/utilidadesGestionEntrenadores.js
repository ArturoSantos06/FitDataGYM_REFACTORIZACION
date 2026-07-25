// ================== UTILIDADES ==================
export const aMs = (value) => {
  if (!value) return 0;
  if (typeof value?.toDate === 'function') return value.toDate().getTime();
  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

export const normalizarClaveBusqueda = (value) => String(value || '').trim().toLowerCase();

export const esValorUtil = (value) => {
  const texto = String(value || '').trim();
  if (!texto) return false;
  const normalizado = texto.toLowerCase();
  return !['n/d', 'nd', 'n.a.', 'n/a', 'na', 'null', 'undefined'].includes(normalizado);
};

export const elegirPrimerValorUtil = (...valores) => {
  for (const valor of valores) {
    if (esValorUtil(valor)) {
      return String(valor).trim();
    }
  }
  return '';
};

export const buscarValorEnObjeto = (objeto, claves, nivelMaximo = 2) => {
  if (!objeto || typeof objeto !== 'object' || nivelMaximo < 0) {
    return '';
  }

  for (const clave of claves) {
    if (Object.prototype.hasOwnProperty.call(objeto, clave) && esValorUtil(objeto[clave])) {
      return String(objeto[clave]).trim();
    }
  }

  for (const valor of Object.values(objeto)) {
    if (!valor || typeof valor !== 'object') continue;
    const encontrado = buscarValorEnObjeto(valor, claves, nivelMaximo - 1);
    if (encontrado) {
      return encontrado;
    }
  }

  return '';
};

export const normalizarEtiquetaTipoServicio = (value, fallback = 'Personal') => {
  const raw = String(value || '').trim().toLowerCase();
  if (!raw) return fallback;
  if (raw.includes('grupal') || raw.includes('group') || raw.includes('grupo')) {
    return 'Grupal';
  }
  if (raw.includes('personal') || raw.includes('individual') || raw.includes('uno a uno') || raw.includes('1 a 1')) {
    return 'Personal';
  }
  return fallback;
};

export const obtenerNombreVisualizacion = (user = {}, fallback = 'Cliente') => {
  const fullName = `${user.firstName || user.first_name || ''} ${user.lastName || user.last_name || ''}`.trim();
  return (
    user.displayName ||
    fullName ||
    user.username ||
    user.nombre ||
    user.email ||
    fallback
  );
};

export const obtenerNombreEntrenador = (user = {}, fallback = 'Entrenador') => {
  const fullName = `${user.firstName || user.first_name || ''} ${user.lastName || user.last_name || ''}`.trim();
  const nombreDirecto = String(user.nombre || user.fullName || user.full_name || '').trim();

  return (
    user.displayName ||
    nombreDirecto ||
    fullName ||
    user.username ||
    fallback
  );
};

export const obtenerEspecialidadEntrenador = (user = {}) => {
  const especialidad = elegirPrimerValorUtil(
    user.trainer_specialty,
    user.specialty,
    user.especialidad,
    user.especialidadPrincipal,
    user.trainerSpecialty,
    user.trainerSpecialtyName,
    user.area,
    user.focus,
    user.profile?.specialty,
    user.profile?.especialidad,
    user.trainerData?.specialty,
    user.trainerData?.especialidad,
    user.data?.specialty,
    user.data?.especialidad,
    user.specialty_name,
    user.especialidad_name,
    user.trainerSpecialtyOther,
    user.trainer_specialty_other,
  );

  const especialidadAnidada = buscarValorEnObjeto(user, [
    'trainer_specialty',
    'specialty',
    'especialidad',
    'especialidadPrincipal',
    'trainerSpecialty',
    'trainerSpecialtyName',
    'specialty_name',
    'especialidad_name',
  ]);

  if (!especialidad && !especialidadAnidada) {
    return 'N/D';
  }

  const valorBase = especialidad || especialidadAnidada;

  if (valorBase.toLowerCase() === 'otro') {
    const otro = elegirPrimerValorUtil(
      user.trainer_specialty_other,
      user.specialty_other,
      user.especialidad_otro,
      buscarValorEnObjeto(user, ['trainer_specialty_other', 'specialty_other', 'especialidad_otro'])
    );
    return otro || valorBase;
  }

  return valorBase;
};

export const obtenerTipoContratoEntrenador = (user = {}, fallback = 'N/D') => {
  const contractType = elegirPrimerValorUtil(
    user.contractType,
    user.tipoContrato,
    user.contract_type,
    user.contractTypeName,
    user.tipo_contrato,
    fallback
  );

  return contractType || fallback;
};

export const obtenerClavesEntrenador = (entrenador = {}) => {
  const nombreCompleto = `${entrenador.firstName || entrenador.first_name || ''} ${entrenador.lastName || entrenador.last_name || ''}`.trim();
  const nombreDirecto = `${entrenador.nombre || ''}`.trim();

  return [
    entrenador.authUid,
    entrenador.uid,
    entrenador.email,
    entrenador.trainerEmail,
    entrenador.trainer_email,
    entrenador.username,
    entrenador.displayName,
    nombreDirecto,
    nombreCompleto,
    entrenador.id,
    entrenador.legacyId,
  ]
    .map(normalizarClaveBusqueda)
    .filter(Boolean);
};

export const fusionarEntrenadores = (base = {}, nuevo = {}) => {
  const resultado = { ...base };
  const camposDirectos = [
    'id',
    'legacyId',
    'authUid',
    'uid',
    'email',
    'trainerEmail',
    'trainer_email',
    'username',
    'displayName',
    'nombre',
    'firstName',
    'first_name',
    'lastName',
    'last_name',
    'specialty',
    'especialidad',
    'especialidadPrincipal',
    'trainer_specialty',
    'trainer_specialty_other',
    'trainerSpecialty',
    'area',
    'focus',
    'profile',
    'trainerData',
    'data',
    'contractType',
    'tipoContrato',
    'contract_type',
    'contractTypeName',
    'tipo_contrato',
    'isActive',
    'trainerStatus',
    'contractStatus',
    'role',
    'user_type',
    'trainerActive',
  ];

  camposDirectos.forEach((campo) => {
    const valorNuevo = nuevo?.[campo];
    const valorActual = resultado?.[campo];
    const estaVacio = !esValorUtil(valorActual);
    if (estaVacio && esValorUtil(valorNuevo)) {
      resultado[campo] = valorNuevo;
    }
  });

  Object.keys(nuevo || {}).forEach((campo) => {
    const valorNuevo = nuevo[campo];
    const valorActual = resultado[campo];
    const estaVacio = !esValorUtil(valorActual);
    if (estaVacio && esValorUtil(valorNuevo)) {
      resultado[campo] = valorNuevo;
    }
  });

  return resultado;
};

export const deduplicarEntrenadores = (lista = []) => {
  const entrenadoresUnicos = [];
  const indicesPorClave = new Map();

  lista.forEach((entrenador) => {
    const claves = obtenerClavesEntrenador(entrenador);
    const claveExistente = claves.find((clave) => indicesPorClave.has(clave));

    if (claveExistente) {
      const posicion = indicesPorClave.get(claveExistente);
      entrenadoresUnicos[posicion] = fusionarEntrenadores(entrenadoresUnicos[posicion], entrenador);
      claves.forEach((clave) => indicesPorClave.set(clave, posicion));
      return;
    }

    const posicionNueva = entrenadoresUnicos.length;
    entrenadoresUnicos.push({ ...entrenador });
    claves.forEach((clave) => indicesPorClave.set(clave, posicionNueva));
  });

  return entrenadoresUnicos;
};

export const registrarClavesBusqueda = (map, keys, value) => {
  keys.forEach((key) => {
    const normalizedKey = normalizarClaveBusqueda(key);
    if (normalizedKey) {
      map.set(normalizedKey, value);
    }
  });
};

export const obtenerProductosVenta = (venta = {}) => {
  const rawDetail = venta.detalle_productos || venta.detalleProductos || venta.detalle_producto || venta.productos || venta.items || null;
  if (!rawDetail) return [];

  if (Array.isArray(rawDetail)) {
    return rawDetail;
  }

  if (typeof rawDetail === 'string') {
    try {
      const parsed = JSON.parse(rawDetail);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      try {
        const parsed = JSON.parse(String(rawDetail).replace(/'/g, '"'));
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
  }

  return [];
};

export const obtenerMetodoPagoVenta = (venta = {}) => {
  const metodo = String(
    venta.metodo_pago ||
    venta.metodoPago ||
    venta.paymentMethod ||
    venta.payment_method ||
    venta.forma_pago ||
    venta.paymentType ||
    venta.metodo ||
    ''
  ).trim();

  return metodo ? metodo.toUpperCase() : 'N/D';
};

export const obtenerMontoVenta = (venta = {}) => {
  const totalDirecto = Number(
    venta.total ||
    venta.amount ||
    venta.monto ||
    venta.monto_recibido ||
    venta.montoTotal ||
    venta.monto_total ||
    venta.trainerServicePrice ||
    venta.trainer_service_price ||
    0
  );

  if (Number.isFinite(totalDirecto) && totalDirecto > 0) {
    return totalDirecto;
  }

  const productos = obtenerProductosVenta(venta);
  if (productos.length === 0) return 0;

  return productos.reduce((sum, item) => {
    const cantidad = Number(item?.cantidad || item?.qty || 1) || 1;
    const precio = Number(item?.precio || item?.price || item?.monto || 0) || 0;
    return sum + (cantidad * precio);
  }, 0);
};

export const obtenerEstadoVenta = (venta = {}) => {
  const estado = String(
    venta.payment_status ||
    venta.paymentStatus ||
    venta.estado ||
    venta.status ||
    venta.estado_pago ||
    ''
  ).trim().toLowerCase();

  if (!estado) return 'pending';
  if (estado === 'completed' || estado === 'completado' || estado === 'pagado') return 'completed';
  if (estado === 'pending' || estado === 'pendiente') return 'pending';
  return estado;
};

export const normalizarClaveEntrenador = (routine = {}) => {
  const uid = String(routine.createdBy || '').trim();
  const email = String(routine.trainerEmail || '').trim().toLowerCase();
  return uid || email || 'unknown-trainer';
};

export const esUsuarioEntrenador = (user = {}) => {
  const role = String(user.role || user.user_type || '').toLowerCase();
  return Boolean(
    user.isActive !== false &&
    user.trainerStatus !== 'inactive' &&
    (
      role === 'trainer' ||
      role === 'entrenador' ||
      role === 'coach' ||
      user.isTrainer === true ||
      user.is_trainer === true
    )
  );
};

export const esEntrenadorInactivo = (user = {}) => {
  const role = String(user.role || user.user_type || '').toLowerCase();
  const looksTrainer =
    role === 'inactive_trainer' ||
    role === 'trainer' ||
    role === 'entrenador' ||
    role === 'coach' ||
    user.trainer === true ||
    user.contractType ||
    user.tipoContrato;

  const isInactive =
    user.isActive === false ||
    user.trainerActive === false ||
    String(user.trainerStatus || '').toLowerCase() === 'inactive' ||
    String(user.contractStatus || '').toLowerCase() === 'inactive' ||
    role === 'inactive_trainer';

  return Boolean(looksTrainer && isInactive);
};

