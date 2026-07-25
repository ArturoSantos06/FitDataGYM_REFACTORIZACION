import {
  createTrainerNote,
  deleteTrainerNote,
  getAllTrainerNotes,
  getTrainerNotesByMember,
  updateTrainerNote,
} from '../../../../firebase';

function obtenerDatos(resultado, mensaje) {
  if (!resultado?.success) {
    throw new Error(mensaje);
  }

  return resultado.data;
}

export async function obtenerNotasPorMiembro(
  idMiembro,
) {
  const resultado =
    await getTrainerNotesByMember(idMiembro);

  const datos = obtenerDatos(
    resultado,
    'No se pudieron cargar las notas.',
  );

  return Array.isArray(datos) ? datos : [];
}

export async function obtenerTodasLasNotas() {
  const resultado = await getAllTrainerNotes();

  const datos = obtenerDatos(
    resultado,
    'No se pudo cargar el conteo de notas.',
  );

  return Array.isArray(datos) ? datos : [];
}

export async function crearNotaBitacora({
  miembro,
  entrenador,
  texto,
}) {
  const resultado = await createTrainerNote({
    memberId: miembro.id,
    memberName:
      miembro.nombre || 'Cliente',
    note: texto,
    createdBy:
      entrenador?.uid || 'unknown',
    trainerEmail:
      entrenador?.email || 'unknown',
  });

  return obtenerDatos(
    resultado,
    'No se pudo guardar la nota.',
  );
}

export async function actualizarNotaBitacora(
  idNota,
  texto,
) {
  const resultado = await updateTrainerNote(
    idNota,
    { note: texto },
  );

  return obtenerDatos(
    resultado,
    'No se pudo actualizar la nota.',
  );
}

export async function eliminarNotaBitacora(
  idNota,
) {
  const resultado =
    await deleteTrainerNote(idNota);

  return obtenerDatos(
    resultado,
    'No se pudo eliminar la nota.',
  );
}