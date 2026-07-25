export function crearFechaFormateada(entreno) {
  if (!entreno) {
    return 'Fecha sin definir';
  }

  const horario = [
    entreno.horaInicio,
    entreno.horaFin,
  ]
    .filter(Boolean)
    .join(' - ');

  const partes = [
    entreno.fecha,
    horario,
  ].filter(Boolean);

  return partes.length > 0
    ? partes.join(' | ')
    : 'Fecha sin definir';
}