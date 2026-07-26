import { useState, useEffect, useMemo } from 'react';
import { getSales } from '../../../../firebase';
import filtrarVentasGenerales from './filtrarVentasGenerales';
import procesarFilasVenta from './procesarFilasVenta';

export default function useHistorialVentas(reloadTrigger) {
  const [ventas, setVentas] = useState([]);
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const result = await getSales();
        if (result.success) {
          const allSales = Array.isArray(result.data) ? result.data : [];
          setVentas(filtrarVentasGenerales(allSales));
        }
      } catch (error) {
        console.error('Error cargando historial:', error);
      }
    };
    fetchVentas();
  }, [reloadTrigger]);

  const filasFiltradas = useMemo(() => {
    const filasProcesadas = procesarFilasVenta(ventas);
    const termino = filtro.toLowerCase();
    return filasProcesadas.filter(
      (fila) =>
        fila.nombre_completo.toLowerCase().includes(termino) ||
        fila.producto_nombre.toLowerCase().includes(termino) ||
        fila.folio.toLowerCase().includes(termino)
    );
  }, [ventas, filtro]);

  return { filtro, setFiltro, filasFiltradas };
}
