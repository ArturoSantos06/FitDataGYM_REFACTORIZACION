import { memo } from 'react';
import TarjetaReporteMantenimiento from '../../TarjetaReporteMantenimiento/TarjetaReporteMantenimiento';

function GridReportesVista({ reportes, resolviendoId, onResolver, errorResolver }) {
  return (
    <div className="space-y-3">
      {errorResolver && (
        <p className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200">{errorResolver}</p>
      )}
      <div className="grid gap-5 md:grid-cols-2">
        {reportes.map((reporte) => (
          <TarjetaReporteMantenimiento
            key={reporte.id}
            reporte={reporte}
            mostrarAccionResolver
            onResolver={onResolver}
            resolviendo={resolviendoId === reporte.id}
          />
        ))}
      </div>
    </div>
  );
}

export default memo(GridReportesVista);
