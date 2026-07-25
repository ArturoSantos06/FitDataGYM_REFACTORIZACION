const ESTADOS_ACTIVOS = new Set(['active', 'activo']);

export function normalizarClave(valor) {
  return String(valor ?? '').trim().toLowerCase();
}

function normalizarClaves(valores) {
  return valores
    .map(normalizarClave)
    .filter(Boolean);
}

export function obtenerClavesEntrenador(
  usuarioFirebase,
  perfilesEntrenador,
) {
  const claves = new Set(
    normalizarClaves([
      usuarioFirebase.uid,
      usuarioFirebase.email,
    ]),
  );

  perfilesEntrenador
    .filter((resultado) => resultado?.success && resultado?.data)
    .forEach(({ data }) => {
      normalizarClaves([
        data.id,
        data.authUid,
        data.legacyId,
        data.email,
        data.username,
      ]).forEach((clave) => claves.add(clave));
    });

  return claves;
}

export function obtenerClavesEntrenadorAsignacion(asignacion) {
  return normalizarClaves([
    asignacion.trainerId,
    asignacion.trainer_id,
    asignacion.trainer,
    asignacion.entrenador,
    asignacion.trainerAuthUid,
    asignacion.trainer_auth_uid,
    asignacion.trainerEmail,
    asignacion.trainer_email,
  ]);
}

export function obtenerClavesClienteAsignacion(
  asignacion,
  idDocumento,
) {
  const claves = normalizarClaves([
    asignacion.clientId,
    asignacion.client_id,
    asignacion.memberId,
    asignacion.member_id,
    asignacion.client,
    asignacion.cliente,
    asignacion.clienteId,
    asignacion.cliente_id,
    asignacion.clientAuthUid,
    asignacion.clienteAuthUid,
    asignacion.cliente_auth_uid,
    asignacion.clientEmail,
    asignacion.clienteEmail,
    asignacion.client_email,
  ]);

  if (claves.length > 0) {
    return claves;
  }

  return normalizarClaves([idDocumento]);
}

export function asignacionPerteneceAlEntrenador(
  asignacion,
  clavesEntrenador,
) {
  const estado = normalizarClave(
    asignacion.status ??
      asignacion.estado ??
      asignacion.trainerStatus ??
      'active',
  );

  if (!ESTADOS_ACTIVOS.has(estado)) {
    return false;
  }

  return obtenerClavesEntrenadorAsignacion(asignacion).some(
    (clave) => clavesEntrenador.has(clave),
  );
}

export function obtenerClavesMiembro(miembro) {
  return normalizarClaves([
    miembro.id,
    miembro.userId,
    miembro.authUid,
    miembro.email,
    miembro.legacyId,
    miembro.memberId,
    miembro.miembro,
    miembro.miembro_id,
  ]);
}

export function crearMapaPerfilesSalud(perfiles) {
  const mapa = new Map();

  perfiles.forEach((perfil) => {
    normalizarClaves([
      perfil.id,
      perfil.userId,
      perfil.memberId,
      perfil.userIdDisplay,
      perfil.memberAuthUid,
      perfil.memberEmail,
      perfil.email,
    ]).forEach((clave) => {
      if (!mapa.has(clave)) {
        mapa.set(clave, perfil);
      }
    });
  });

  return mapa;
}

export function combinarMiembrosConSalud(
  miembros,
  perfilesSalud,
) {
  const mapaSalud = crearMapaPerfilesSalud(perfilesSalud);

  return miembros.map((miembro) => {
    const perfilSalud = obtenerClavesMiembro(miembro)
      .map((clave) => mapaSalud.get(clave))
      .find(Boolean);

    const colorBase = miembro.avatarColor || '#06b6d4';

    return {
      ...miembro,
      edad:
        perfilSalud?.age ??
        perfilSalud?.edad ??
        null,
      colorMostrado: colorBase.startsWith('#')
        ? colorBase
        : `#${colorBase}`,
    };
  });
}

export function filtrarClientesAsignados(
  miembros,
  clavesClientesAsignados,
) {
  if (clavesClientesAsignados.size === 0) {
    return [];
  }

  return miembros.filter((miembro) =>
    obtenerClavesMiembro(miembro).some((clave) =>
      clavesClientesAsignados.has(clave),
    ),
  );
}

export function obtenerClaseAncho(cantidad, cargando) {
  if (cargando || cantidad === 0) {
    return 'max-w-3xl';
  }

  if (cantidad === 1) {
    return 'max-w-107.5';
  }

  if (cantidad === 2) {
    return 'max-w-190';
  }

  if (cantidad <= 4) {
    return 'max-w-270';
  }

  return 'max-w-350';
}