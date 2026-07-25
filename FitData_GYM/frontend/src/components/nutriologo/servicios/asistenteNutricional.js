import {
  createHealthProfile,
  getHealthProfileByMemberId,
} from '../../../firebase';

export async function consultarPerfilSaludPaciente(idPaciente) {
  const resultado = await getHealthProfileByMemberId(idPaciente);
  const mensaje = String(resultado.error || '').toLowerCase();
  if (!resultado.success && mensaje.includes('no encontrado')) return null;
  if (!resultado.success) {
    throw new Error(
      resultado.error || 'No se pudo consultar el perfil de salud.',
    );
  }
  return resultado.data || null;
}

export async function guardarObjetivoCalorico({
  idPaciente,
  perfil,
  calorias,
}) {
  const { id: _idExterno, ...datosPerfil } = perfil || {};
  const resultado = await createHealthProfile({
    ...datosPerfil,
    memberId: idPaciente,
    targetCalories: calorias,
  });
  if (!resultado.success) {
    throw new Error(
      resultado.error || 'No se pudo guardar el objetivo calórico.',
    );
  }
  return {
    ...datosPerfil,
    memberId: idPaciente,
    targetCalories: calorias,
  };
}
