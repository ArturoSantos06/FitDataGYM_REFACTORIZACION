export function normalizarLlave(valor) {
  return String(valor ?? '').trim().toLowerCase();
}

function agregarLlaves(conjunto, valores) {
  valores
    .map(normalizarLlave)
    .filter(Boolean)
    .forEach((llave) => conjunto.add(llave));
}

function obtenerLlavesMiembro(miembro) {
  return [
    miembro.id,
    miembro.userId,
    miembro.authUid,
    miembro.email,
  ]
    .map(normalizarLlave)
    .filter(Boolean);
}

function obtenerNombresMiembro(miembro) {
  return [
    `${miembro.nombre ?? ''} ${miembro.apellido ?? ''}`.trim(),
    `${miembro.firstName ?? ''} ${miembro.lastName ?? ''}`.trim(),
    miembro.displayName,
    miembro.username,
  ]
    .map(normalizarLlave)
    .filter(Boolean);
}

export function obtenerNombreMiembro(miembro) {
  return (
    miembro.memberName ||
    `${miembro.nombre ?? ''} ${miembro.apellido ?? ''}`.trim() ||
    `${miembro.firstName ?? ''} ${miembro.lastName ?? ''}`.trim() ||
    miembro.displayName ||
    miembro.username ||
    'Sin nombre'
  );
}

export function obtenerLlavesEntrenador(usuario, perfiles) {
  const llaves = new Set();

  agregarLlaves(llaves, [usuario.uid, usuario.email]);

  perfiles
    .filter((resultado) => resultado?.success && resultado?.data)
    .forEach(({ data }) => {
      agregarLlaves(llaves, [
        data.id,
        data.authUid,
        data.legacyId,
        data.email,
      ]);
    });

  return llaves;
}

export function obtenerLlavesClientesAsignados(
  asignaciones,
  llavesEntrenador,
) {
  const llavesClientes = new Set();

  asignaciones.docs.forEach((documento) => {
    const asignacion = documento.data() ?? {};

    const estado = normalizarLlave(
      asignacion.status ??
        asignacion.trainerStatus ??
        'active',
    );

    const correspondeAlEntrenador = [
      asignacion.trainerId,
      asignacion.trainer_id,
      asignacion.trainerEmail,
      asignacion.trainer_email,
    ]
      .map(normalizarLlave)
      .filter(Boolean)
      .some((llave) => llavesEntrenador.has(llave));

    if (!correspondeAlEntrenador || estado !== 'active') {
      return;
    }

    agregarLlaves(llavesClientes, [
      asignacion.clientId,
      asignacion.memberId,
      documento.id,
    ]);
  });

  return llavesClientes;
}

export function construirPerfilesAsignados(
  documentosMiembros,
  documentosPerfiles,
  llavesClientesAsignados,
) {
  const miembros = documentosMiembros.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));

  const nombresAsignados = new Set();

  miembros.forEach((miembro) => {
    const coincideAsignacion = obtenerLlavesMiembro(miembro).some(
      (llave) => llavesClientesAsignados.has(llave),
    );

    if (coincideAsignacion) {
      obtenerNombresMiembro(miembro).forEach((nombre) =>
        nombresAsignados.add(nombre),
      );
    }
  });

  const perfilesPorLlave = new Map();

  documentosPerfiles.forEach((documento) => {
    const perfil = {
      id: documento.id,
      ...documento.data(),
    };

    [
      perfil.id,
      perfil.memberId,
      perfil.userId,
      perfil.userIdDisplay,
      perfil.memberAuthUid,
      perfil.memberEmail,
      perfil.userEmail,
      perfil.email,
    ]
      .map(normalizarLlave)
      .filter(Boolean)
      .forEach((llave) => {
        if (!perfilesPorLlave.has(llave)) {
          perfilesPorLlave.set(llave, perfil);
        }
      });
  });

  return miembros
    .filter((miembro) => {
      const coincideLlave = obtenerLlavesMiembro(miembro).some(
        (llave) => llavesClientesAsignados.has(llave),
      );

      const coincideNombre = obtenerNombresMiembro(miembro).some(
        (nombre) => nombresAsignados.has(nombre),
      );

      return coincideLlave || coincideNombre;
    })
    .map((miembro) => {
      const posiblesLlaves = [
        ...obtenerLlavesMiembro(miembro),
        ...obtenerNombresMiembro(miembro),
      ];

      const perfil = posiblesLlaves
        .map((llave) => perfilesPorLlave.get(llave))
        .find(Boolean);

      if (!perfil) {
        return null;
      }

      return {
        ...miembro,
        ...perfil,
        id: perfil.id,
        memberName:
          perfil.memberName || obtenerNombreMiembro(miembro),
        userIdDisplay:
          perfil.userIdDisplay ||
          miembro.id ||
          miembro.userId ||
          '',
      };
    })
    .filter(Boolean);
}

export function formatearFechaPerfil(perfil) {
  const fecha =
    perfil.updatedAt?.toDate?.() ||
    perfil.createdAt?.toDate?.() ||
    new Date();

  return fecha.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}