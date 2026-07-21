const DATE_FORMATTER = new Intl.DateTimeFormat('es-MX');

export function formatAssignedDate(value) {
  if (!value) return 'Sin fecha';

  const date = typeof value.toDate === 'function'
    ? value.toDate()
    : value instanceof Date
      ? value
      : new Date(value);

  return Number.isNaN(date.getTime()) ? 'Sin fecha' : DATE_FORMATTER.format(date);
}

export function getStatusLabel(status) {
  return String(status || '').toLowerCase() === 'active'
    ? 'Activo'
    : status || 'N/D';
}

export function getStatusClassName(status) {
  return String(status || '').toLowerCase() === 'active'
    ? 'bg-green-900/50 text-green-300 border border-green-600'
    : 'bg-gray-700 text-gray-300 border border-gray-600';
}
