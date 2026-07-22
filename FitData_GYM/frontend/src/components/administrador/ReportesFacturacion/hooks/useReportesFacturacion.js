import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import normalizarFactura from './normalizarFactura';
import calcularTotalesFacturas from './calcularTotalesFacturas';

export default function useReportesFacturacion() {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterMes, setFilterMes] = useState(new Date().getMonth() + 1);
  const [filterAnio, setFilterAnio] = useState(new Date().getFullYear());

  const cargarReporte = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const querySnapshot = await getDocs(collection(db, 'ventas'));
      const facturas = querySnapshot.docs
        .map(normalizarFactura)
        .filter((item) => {
          const saleDate = item.fecha;
          return saleDate && saleDate.getFullYear() === Number(filterAnio) && saleDate.getMonth() + 1 === Number(filterMes);
        })
        .sort((a, b) => b.fecha - a.fecha);

      setReportData({ success: true, ...calcularTotalesFacturas(facturas), facturas });
    } catch (err) {
      console.error('Error:', err);
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, [filterMes, filterAnio]);

  useEffect(() => {
    cargarReporte();
  }, [cargarReporte]);

  return {
    reportData,
    loading,
    error,
    filterMes,
    setFilterMes,
    filterAnio,
    setFilterAnio,
    cargarReporte,
  };
}
