import { useMemo } from 'react';

const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 2
  }).format(Number(valor || 0));
};

const formatearFecha = (valor) => {
  if (!valor) return 'Sin fecha';
  const fecha = typeof valor?.toDate === 'function' ? valor.toDate() : new Date(valor);
  if (Number.isNaN(fecha.getTime())) return 'Sin fecha';
  return fecha.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

export default function useTablaOperaciones(planSales = []) {
  const filas = useMemo(() => {
    const filasVentas = planSales.map((item) => ({
      id: `venta-${item.id}`,
      tipo: 'Cobro',
      concepto: item.tipo_venta || 'Plan nutricional',
      monto: Number(item.total || 0),
      fecha: item.createdAt || item.fecha || item.fechaRegistro
    }));

    return [...filasVentas]
      .sort((a, b) => new Date(b.fecha || 0) - new Date(a.fecha || 0))
      .slice(0, 20);
  }, [planSales]);

  return {
    filas,
    formatearMoneda,
    formatearFecha
  };
}