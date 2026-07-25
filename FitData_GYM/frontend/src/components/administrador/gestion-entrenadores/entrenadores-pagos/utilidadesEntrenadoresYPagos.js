const MESES = Array.from({ length: 12 }, (_, index) => index + 1);

const dateFormatter = new Intl.DateTimeFormat('es-MX');
const currencyFormatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 2,
});

export function toJsDate(value) {
  if (!value) return null;
  if (typeof value?.toDate === 'function') return value.toDate();

  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function obtenerFechaPago(payment = {}) {
  return toJsDate(payment.createdAt) || toJsDate(payment.fecha);
}

export function formatearFecha(value) {
  const date = toJsDate(value);
  return date ? dateFormatter.format(date) : 'Sin fecha';
}

export function formatearMoneda(value) {
  return currencyFormatter.format(Number(value) || 0);
}

export function obtenerMontoPago(payment = {}) {
  return payment.total
    || payment.amount
    || payment.monto
    || payment.monto_recibido
    || 0;
}

export function obtenerNombreEntrenador(data = {}) {
  return data.trainerName
    || data.trainer_nombre
    || data.trainer_name
    || 'Entrenador';
}

export function obtenerTipoContrato(data = {}) {
  return data.contractType
    || data.contract_type
    || data.tipoContrato
    || 'N/D';
}

export function obtenerMetodoPago(data = {}) {
  return data.metodo_pago
    || data.paymentMethod
    || data.payment_method
    || 'N/D';
}

export function obtenerAniosDisponibles(payments = []) {
  const currentYear = new Date().getFullYear();
  const years = new Set([
    currentYear - 2,
    currentYear - 1,
    currentYear,
    currentYear + 1,
  ]);

  payments.forEach((payment) => {
    const date = obtenerFechaPago(payment);
    if (date) years.add(date.getFullYear());
  });

  return [...years].sort((first, second) => first - second);
}

export { MESES };
