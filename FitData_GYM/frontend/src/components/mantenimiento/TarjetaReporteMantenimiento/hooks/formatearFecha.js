export default function formatearFecha(valor) {
  try {
    const date = valor?.toDate?.() || new Date(valor || Date.now());
    if (Number.isNaN(date.getTime())) return '';
    return date.toLocaleString('es-MX');
  } catch {
    return '';
  }
}
