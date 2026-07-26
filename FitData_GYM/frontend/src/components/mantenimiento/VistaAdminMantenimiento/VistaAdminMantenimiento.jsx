import { useMemo } from 'react';
import useCatalogoMaquinas from './hooks/useCatalogoMaquinas';
import useResolverReporte from './hooks/useResolverReporte';
import FormularioAltaMaquinaVista from './partes/FormularioAltaMaquinaVista';
import GridReportesVista from './partes/GridReportesVista';

function VistaAdminMantenimiento({ reportes = [] }) {
  const { nombreMaquina, setNombreMaquina, setArchivo, guardando, error, ok, guardarMaquina } = useCatalogoMaquinas();
  const { resolviendoId, error: errorResolver, resolverReporte } = useResolverReporte();

  const totalPendientes = useMemo(
    () => reportes.filter((item) => String(item.estado || '').toLowerCase() !== 'resuelto').length,
    [reportes]
  );

  return (
    <section className="space-y-6">
      <FormularioAltaMaquinaVista
        totalPendientes={totalPendientes}
        nombreMaquina={nombreMaquina}
        onCambioNombre={(e) => setNombreMaquina(e.target.value)}
        onCambioArchivo={(e) => setArchivo(e.target.files?.[0] || null)}
        guardando={guardando}
        error={error}
        ok={ok}
        onSubmit={guardarMaquina}
      />

      <GridReportesVista reportes={reportes} resolviendoId={resolviendoId} onResolver={resolverReporte} errorResolver={errorResolver} />
    </section>
  );
}

export default VistaAdminMantenimiento;
