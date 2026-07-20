export function normalizarLlave(valor) {
  return String(valor ?? '').trim().toLowerCase();
}

function agregarLlaves(conjunto, valores) {
  valores
    .map(normalizarLlave)
    .filter(Boolean)
    .forEach((llave) => conjunto.add(llave));
}

export function obtenerLlavesEntrenador(usuarioAuth, perfiles = []) {
  const llavesEntrenador = new Set();

  agregarLlaves(llavesEntrenador, [
    usuarioAuth.uid,
    usuarioAuth.email,
  ]);

  perfiles
    .filter((perfil) => perfil?.success && perfil?.data)
    .forEach(({ data }) => {
      agregarLlaves(llavesEntrenador, [
        data.id,
        data.authUid,
        data.legacyId,
        data.email,
      ]);
    });

  return llavesEntrenador;
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

    const llavesDeAsignacion = [
      asignacion.trainerId,
      asignacion.trainer_id,
      asignacion.trainerEmail,
      asignacion.trainer_email,
    ]
      .map(normalizarLlave)
      .filter(Boolean);

    const correspondeAlEntrenador = llavesDeAsignacion.some(
      (llave) => llavesEntrenador.has(llave),
    );

    if (estado !== 'active' || !correspondeAlEntrenador) {
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

export function esAlumnoAsignado(
  alumno,
  llavesClientesAsignados,
) {
  const llavesAlumno = [
    alumno.id,
    alumno.userId,
    alumno.authUid,
    alumno.email,
  ]
    .map(normalizarLlave)
    .filter(Boolean);

  return llavesAlumno.some((llave) =>
    llavesClientesAsignados.has(llave),
  );
}

export function obtenerNombreCompleto(alumno) {
  return `${alumno.nombre ?? ''} ${alumno.apellido ?? ''}`.trim();
}

export function filtrarAlumnos(alumnos, terminoBusqueda) {
  const termino = normalizarLlave(terminoBusqueda);

  if (!termino) {
    return alumnos;
  }

  return alumnos.filter((alumno) => {
    const matricula = normalizarLlave(
      alumno.matricula ?? alumno.id,
    );

    const nombre = normalizarLlave(
      obtenerNombreCompleto(alumno),
    );

    return (
      matricula.includes(termino) ||
      nombre.includes(termino)
    );
  });
}