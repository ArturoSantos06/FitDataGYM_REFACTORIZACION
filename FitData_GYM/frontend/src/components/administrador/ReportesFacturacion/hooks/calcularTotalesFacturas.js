export default function calcularTotalesFacturas(facturas) {
  return facturas.reduce(
    (accumulator, factura) => {
      accumulator.totalFacturas += 1;
      accumulator.totalIngresos += Number(factura.total || 0);
      accumulator.subtotal += Number(factura.subtotal || 0);
      accumulator.totalIVA += Number(factura.totalIVA || 0);
      return accumulator;
    },
    { totalFacturas: 0, totalIngresos: 0, subtotal: 0, totalIVA: 0 }
  );
}
