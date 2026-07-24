import { useEffect, useMemo, useState } from 'react';
import { suscribirCatalogoMaquinas, suscribirReportesMantenimiento } from '../../../../backend/mantenimiento';

export default function useDatosMantenimiento() {
  const [maquinas, setMaquinas] = useState([]);
  const [reportes, setReportes] = useState([]);
  const [errorCatalogo, setErrorCatalogo] = useState('');
  const [errorReportes, setErrorReportes] = useState('');

  useEffect(() => {
    const offCatalogo = suscribirCatalogoMaquinas(
      (data) => {
        setMaquinas(data);
        setErrorCatalogo('');
      },
      (error) => setErrorCatalogo(String(error?.message || 'No se pudo cargar el catalogo.'))
    );

    const offReportes = suscribirReportesMantenimiento(
      (data) => {
        setReportes(data);
        setErrorReportes('');
      },
      (error) => setErrorReportes(String(error?.message || 'No se pudieron cargar los reportes.'))
    );

    return () => {
      offCatalogo?.();
      offReportes?.();
    };
  }, []);

  const reportesPendientes = useMemo(
    () => reportes.filter((item) => String(item.estado || '').toLowerCase() !== 'resuelto'),
    [reportes]
  );

  return { maquinas, reportes, reportesPendientes, errorCatalogo, errorReportes };
}
