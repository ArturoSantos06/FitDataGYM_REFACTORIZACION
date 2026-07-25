import {
  TRAINER_SERVICE_SALE_TYPE,
  NUTRITION_PLAN_SALE_TYPE,
  MEMBERSHIP_SALE_TYPES,
  PRODUCT_SALE_TYPES,
} from '../contenido';

const getTipoVenta = (sale = {}) => String(sale?.tipo_venta || sale?.tipoVenta || '').trim().toUpperCase();

function isMembershipOrProductSale(sale = {}) {
  const tipoVenta = getTipoVenta(sale);

  // Si existe tipo_venta explícito, solo permitimos productos y membresías.
  if (tipoVenta) {
    return MEMBERSHIP_SALE_TYPES.has(tipoVenta) || PRODUCT_SALE_TYPES.has(tipoVenta);
  }

  // Fallback legacy: ventas sin tipo, pero que no sean de servicios.
  const hasTrainerMarkers = Boolean(sale?.trainerId || sale?.trainer_id || sale?.trainerEmail || sale?.trainer_email);
  const hasServiceType = [TRAINER_SERVICE_SALE_TYPE, NUTRITION_PLAN_SALE_TYPE].includes(tipoVenta);

  return !hasTrainerMarkers && !hasServiceType;
}

export default function filtrarVentasGenerales(allSales) {
  return allSales.filter((sale) => {
    const tipoVenta = getTipoVenta(sale);
    if (tipoVenta === TRAINER_SERVICE_SALE_TYPE || tipoVenta === NUTRITION_PLAN_SALE_TYPE) {
      return false;
    }
    return isMembershipOrProductSale(sale);
  });
}
