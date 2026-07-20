import { useMemo } from 'react';

const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2
  }).format(Number(valor || 0));
};

export default function useResumenFinanciero({
  consultationsTotal,
  plansTotal,
  grandTotal,
  consultationsCount,
  plansCount
}) {
  const resumen = useMemo(() => ({
    totalIngresos: formatearMoneda(grandTotal),
    operacionesTotales: consultationsCount + plansCount,
    totalCobros: formatearMoneda(plansTotal),
    cantidadCobros: plansCount,
    totalPlanes: formatearMoneda(plansTotal),
    cantidadPlanes: plansCount
  }), [consultationsTotal, plansTotal, grandTotal, consultationsCount, plansCount]);

  return resumen;
}