function parsearProductos(detalleProductos) {
  if (Array.isArray(detalleProductos)) return detalleProductos;
  if (typeof detalleProductos !== 'string') return [];

  try {
    return JSON.parse(detalleProductos);
  } catch {
    const jsonFijo = detalleProductos.replace(/'/g, '"');
    return JSON.parse(jsonFijo);
  }
}

function procesarVenta(venta) {
  try {
    const productos = parsearProductos(venta.detalle_productos);
    if (!Array.isArray(productos) || productos.length === 0) return [];

    const fechaObj = venta.createdAt?.toDate?.() || new Date(venta.fecha || venta.createdAt || 0);
    const fecha = `${fechaObj.toLocaleDateString()} ${fechaObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    return productos.map((prod) => ({
      id_unico: `${venta.id}-${prod.id}`,
      folio: venta.folio || 'PENDIENTE',
      nombre_completo: venta.cliente_username || 'Cliente anónimo',
      fecha,
      producto_nombre: prod.nombre || 'Producto eliminado',
      cantidad: prod.cantidad,
      precio_unitario: prod.precio,
      total_linea: prod.cantidad * prod.precio,
      metodo: venta.metodo_pago,
    }));
  } catch {
    return [];
  }
}

export default function procesarFilasVenta(ventas) {
  return ventas.flatMap(procesarVenta);
}
