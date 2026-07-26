import { useState, useEffect } from 'react';
import { getAttendances } from '../../../../firebase';

export default function useAsistencias() {
  const [asistencias, setAsistencias] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [tick, setTick] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const filters = {};
        if (dateFilter) filters.fecha = dateFilter;
        if (searchTerm) filters.search = searchTerm;

        const result = await getAttendances(filters);
        if (result.success) {
          setAsistencias(result.data);
        }
      } catch (err) {
        console.error('Error cargando asistencias:', err);
      }
    })();
  }, [dateFilter, searchTerm, tick]);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 10000);
    return () => clearInterval(interval);
  }, []);

  const limpiarFiltros = () => {
    setSearchTerm('');
    setDateFilter('');
  };

  return {
    asistencias,
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    limpiarFiltros,
    cargarAsistencias: () => setTick((t) => t + 1),
  };
}
