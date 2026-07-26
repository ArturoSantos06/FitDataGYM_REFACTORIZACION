import { BarChart3, AlertCircle } from 'lucide-react';
import useReportesFacturacion from './hooks/useReportesFacturacion';
import FiltrosReporteVista from './partes/FiltrosReporteVista';
import ResumenReporteVista from './partes/ResumenReporteVista';
import TablaFacturasVista from './partes/TablaFacturasVista';

function ReportesFacturacion() {
  const { reportData, loading, error, filterMes, setFilterMes, filterAnio, setFilterAnio, cargarReporte } =
    useReportesFacturacion();

  return (
    <div className="w-full space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <BarChart3 size={32} className="text-cyan-400" />
          Reportes de Facturación
        </h2>
        <p className="text-slate-400 mt-2">Análisis de ventas e ingresos por período</p>
      </div>

      <FiltrosReporteVista
        filterMes={filterMes}
        onCambioMes={(e) => setFilterMes(e.target.value)}
        filterAnio={filterAnio}
        onCambioAnio={(e) => setFilterAnio(e.target.value)}
        loading={loading}
        onCargar={cargarReporte}
      />

      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-400 shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-red-400">Error</h3>
            <p className="text-red-200 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {reportData && (
        <>
          <ResumenReporteVista reportData={reportData} />
          <TablaFacturasVista facturas={reportData.facturas} />
        </>
      )}
    </div>
  );
}

export default ReportesFacturacion;
