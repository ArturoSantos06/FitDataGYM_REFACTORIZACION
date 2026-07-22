const toJsDate = (value) => {
  if (!value) return null;
  if (typeof value?.toDate === 'function') return value.toDate();
  const parsed = value instanceof Date ? value : new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const getSaleDate = (data = {}) => toJsDate(data.createdAt) || toJsDate(data.fecha) || null;

const buildFacturaDescripcion = (saleData = {}) => {
  const rawDetail = saleData.detalle_productos;
  if (rawDetail) {
    try {
      const parsed = JSON.parse(rawDetail);
      if (Array.isArray(parsed) && parsed.length > 0) {
        const names = parsed
          .map((item) => String(item?.nombre || item?.name || item?.producto || '').trim())
          .filter(Boolean);
        if (names.length > 0) {
          return names.length === 1 ? names[0] : names.join(', ');
        }
      }
    } catch {
      // detalle_productos no es JSON válido, se usa el fallback
    }
  }

  return String(
    saleData.membership_name ||
      saleData.membershipName ||
      saleData.producto ||
      saleData.producto_nombre ||
      saleData.productoNombre ||
      saleData.tipo_venta ||
      'Producto'
  );
};

export default function normalizarFactura(docSnap) {
  const data = docSnap.data() || {};
  const totalNumber = Number(data.total || 0);
  const subtotalNumber = Number(data.subtotal || (totalNumber > 0 ? totalNumber / 1.16 : 0));
  const ivaNumber = Number(data.totalIVA || totalNumber - subtotalNumber);
  const saleDate = getSaleDate(data) || new Date();

  return {
    id: docSnap.id,
    fecha: saleDate,
    factura_numero: String(data.folio || data.factura_numero || data.numeroFactura || data.saleFolio || docSnap.id),
    cliente_nombre: String(
      data.clienteNombre || data.cliente_nombre || data.nombreCliente || data.userName || data.customerName || 'Sin nombre'
    ),
    membership_name: String(data.membership_name || data.membershipName || ''),
    producto: buildFacturaDescripcion(data),
    subtotal: subtotalNumber,
    total: totalNumber,
    totalIVA: ivaNumber,
    estado: String(data.estado || 'Generada'),
  };
}
