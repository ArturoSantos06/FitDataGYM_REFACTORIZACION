const normalizarTexto = (valor) =>
  String(valor || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();

const obtenerFechaCreacion = (cliente) => {
  const fecha = cliente.createdAt?.seconds
    ? cliente.createdAt.seconds * 1000
    : cliente.createdAt || 0;
  return new Date(fecha).getTime() || 0;
};

const compararPorReciente = (clienteA, clienteB) => {
  const diferenciaFecha = obtenerFechaCreacion(clienteB) - obtenerFechaCreacion(clienteA);
  if (diferenciaFecha !== 0) return diferenciaFecha;

  const idA = Number(clienteA.id);
  const idB = Number(clienteB.id);
  if (!Number.isNaN(idA) && !Number.isNaN(idB)) return idB - idA;
  return String(clienteB.id || '').localeCompare(String(clienteA.id || ''));
};

const compararPorNombre = (clienteA, clienteB) =>
  obtenerNombreCompleto(clienteA)
    .toLowerCase()
    .localeCompare(obtenerNombreCompleto(clienteB).toLowerCase(), 'es');

export const obtenerNombreCompleto = (cliente) =>
  `${cliente?.nombre || ''} ${cliente?.apellido || ''}`.trim() || 'Sin nombre';

export const formatearMoneda = (valor) =>
  new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2,
  }).format(Number(valor || 0));

export const filtrarYOrdenarClientes = (clientes, busqueda, orden) => {
  const termino = normalizarTexto(busqueda);
  const clientesFiltrados = termino
    ? clientes.filter((cliente) =>
      [
        obtenerNombreCompleto(cliente),
        cliente.email,
        cliente.userId,
      ].some((valor) => normalizarTexto(valor).includes(termino)))
    : clientes;

  const comparar = orden === 'nombre' ? compararPorNombre : compararPorReciente;
  return [...clientesFiltrados].sort(comparar);
};
