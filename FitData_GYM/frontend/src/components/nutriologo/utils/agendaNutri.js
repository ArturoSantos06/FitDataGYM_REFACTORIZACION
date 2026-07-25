const CLASES_COLOR_AVATAR = {
  '#1d4ed8': 'bg-blue-700',
  '#6d28d9': 'bg-purple-700',
  '#059669': 'bg-emerald-600',
  '#d97706': 'bg-amber-600',
  '#dc2626': 'bg-red-600',
  '#db2777': 'bg-pink-600',
  '#6366f1': 'bg-indigo-500',
  '#06b6d4': 'bg-cyan-500',
  '#0ea5e9': 'bg-sky-500',
};

export const normalizarClaveAgenda = (valor) =>
  String(valor || '').trim().toLowerCase();

export const obtenerClaseColorAvatar = (color) => {
  const clave = String(color || '').trim().toLowerCase();
  return CLASES_COLOR_AVATAR[clave] || 'bg-cyan-500';
};

export const filtrarMiembrosAsignados = (miembros, idsAsignados) => {
  const clavesAsignadas = new Set(
    idsAsignados.map(normalizarClaveAgenda).filter(Boolean),
  );
  if (!clavesAsignadas.size) return [];

  return miembros.filter((miembro) =>
    [miembro.id, miembro.userId, miembro.authUid, miembro.email]
      .some((clave) => clavesAsignadas.has(normalizarClaveAgenda(clave))));
};

export const obtenerClaseAnchoAgenda = (cantidad, listas) => {
  if (!listas || cantidad === 0) return 'max-w-3xl';
  if (cantidad === 1) return 'max-w-[430px]';
  if (cantidad === 2) return 'max-w-[760px]';
  if (cantidad <= 4) return 'max-w-[1080px]';
  return 'max-w-6xl';
};

export const crearEventosCalendario = (citas, idMiembro) =>
  citas
    .filter((cita) => String(cita.clienteId) === String(idMiembro))
    .map((cita) => ({
      id: cita.id,
      title: cita.title,
      start: cita.fecha,
      extendedProps: { ...cita },
    }));
