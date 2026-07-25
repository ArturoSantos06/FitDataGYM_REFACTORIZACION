const ESTADOS_ACTIVOS = new Set([
  'active',
  'activo',
]);

export function normalizarClave(valor) {
  return String(valor ?? '')
    .trim()
    .toLowerCase();
}

function normalizarClaves(valores) {
  return valores
    .map(normalizarClave)
    .filter(Boolean);
}

export function obtenerClavesEntrenador(
  usuarioFirebase,
  resultadosUsuario = [],
) {
  const claves = new Set(
    normalizarClaves([
      usuarioFirebase?.uid,
      usuarioFirebase?.email,
    ]),
  );

  resultadosUsuario
    .filter(
      (resultado) =>
        resultado?.success &&
        resultado?.data,
    )
    .forEach(({ data }) => {
      normalizarClaves([
        data.id,
        data.authUid,
        data.legacyId,
        data.email,
        data.username,
      ]).forEach((clave) => {
        claves.add(clave);
      });
    });

  return claves;
}

function obtenerClavesEntrenadorAsignacion(
  asignacion,
) {
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

  return obtenerClavesEntrenadorAsignacion(
    asignacion,
  ).some((clave) =>
    clavesEntrenador.has(clave),
  );
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

function obtenerClavesMiembro(miembro) {
  return normalizarClaves([
    miembro.id,
    miembro.userId,
    miembro.authUid,
    miembro.email,
    miembro.legacyId,
    miembro.memberId,
    miembro.miembro_id,
  ]);
}

export function filtrarMiembrosAsignados(
  miembros,
  clavesClientes,
) {
  if (clavesClientes.size === 0) {
    return [];
  }

  return miembros.filter((miembro) =>
    obtenerClavesMiembro(miembro).some(
      (clave) => clavesClientes.has(clave),
    ),
  );
}

export function filtrarMiembrosPorBusqueda(
  miembros,
  terminoBusqueda,
) {
  const termino = normalizarClave(
    terminoBusqueda,
  );

  if (!termino) {
    return miembros;
  }

  return miembros.filter((miembro) => {
    const nombre = normalizarClave(
      miembro.nombre,
    );

    const apellido = normalizarClave(
      miembro.apellido,
    );

    const correo = normalizarClave(
      miembro.email,
    );

    const nombreCompleto =
      `${nombre} ${apellido}`.trim();

    return (
      nombre.includes(termino) ||
      apellido.includes(termino) ||
      nombreCompleto.includes(termino) ||
      correo.includes(termino)
    );
  });
}

export function crearConteoNotas(notas = []) {
  return notas.reduce((conteo, nota) => {
    const idMiembro = String(
      nota.memberId ?? '',
    ).trim();

    if (!idMiembro) {
      return conteo;
    }

    conteo[idMiembro] =
      (conteo[idMiembro] ?? 0) + 1;

    return conteo;
  }, {});
}