import { parseProductDetails, toDate } from '../tiendaUtils';

export const EMPTY_SALES = [];

export const MONTHS = Array.from({ length: 12 }, (_, index) => ({
  value: index + 1,
  label: new Date(2000, index, 1).toLocaleDateString('es-MX', { month: 'long' }),
}));

export const getSaleDescriptionParts = (sale) => {
  if (sale.membership_name) return [{ key: 'membership', text: sale.membership_name }];
  if (sale.producto) return [{ key: 'product', text: sale.producto }];

  const details = parseProductDetails(sale.detalle_productos);
  if (!details.length) return [{ key: 'purchase', text: 'Compra' }];

  return details.map((item, index) => {
    const quantity = Number(item.cantidad) || 1;
    const price = Number(item.precio) || 0;

    return {
      key: `${sale.id}-${item.id || item.nombre || index}`,
      text: `${item.nombre || 'Producto'} x${quantity} - $${(quantity * price).toFixed(2)}`,
    };
  });
};

export const getSaleDate = (sale) => toDate(sale.fecha);

export const getSaleTotal = (sale) => (Number(sale.total) || 0).toFixed(2);
