import { memo } from 'react';
import { ShieldCheck } from 'lucide-react';
import TarjetaReporteMantenimiento from '../../TarjetaReporteMantenimiento/TarjetaReporteMantenimiento';

function SeccionReportesRecientes({ reportesPendientes }) {
  return (
    <section className="space-y-4 rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-cyan-300" />
        <h2 className="text-xl font-black text-slate-100">Reportes recientes</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {reportesPendientes.slice(0, 4).map((reporte) => (
          <TarjetaReporteMantenimiento key={reporte.id} reporte={reporte} />
        ))}
        {reportesPendientes.length === 0 && <p className="text-sm text-slate-400">No hay reportes pendientes por ahora.</p>}
      </div>
    </section>
  );
}

export default memo(SeccionReportesRecientes);
