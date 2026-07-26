import { useState } from 'react';
import { marcarReporteResuelto } from '../../../../backend/mantenimiento';

export default function useResolverReporte() {
  const [resolviendoId, setResolviendoId] = useState('');
  const [error, setError] = useState('');

  const resolverReporte = async (reporteId) => {
    setResolviendoId(reporteId);
    try {
      await marcarReporteResuelto(reporteId);
    } catch (resolveError) {
      setError(String(resolveError?.message || 'No se pudo actualizar el reporte.'));
    } finally {
      setResolviendoId('');
    }
  };

  return { resolviendoId, error, resolverReporte };
}
