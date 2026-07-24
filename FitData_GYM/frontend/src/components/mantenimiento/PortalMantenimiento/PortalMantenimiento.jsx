import { useState } from 'react';
import useDatosMantenimiento from './hooks/useDatosMantenimiento';
import EncabezadoPortal from './partes/EncabezadoPortal';
import SeccionReportesRecientes from './partes/SeccionReportesRecientes';
import VistaAdminMantenimiento from '../VistaAdminMantenimiento';
import VistaUsuarioMantenimiento from '../VistaUsuarioMantenimiento';

function PortalMantenimiento({ vistaInicial = 'usuario', modoSoloAdmin = false }) {
  const [vista, setVista] = useState(modoSoloAdmin ? 'admin' : vistaInicial);
  const { maquinas, reportes, reportesPendientes, errorCatalogo, errorReportes } = useDatosMantenimiento();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-6 md:px-8 text-slate-100">
      <div className="mx-auto max-w-6xl space-y-6">
        <EncabezadoPortal vista={vista} onCambioVista={setVista} mostrarSelector={!modoSoloAdmin} />

        {(errorCatalogo || errorReportes) && (
          <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-200">
            {errorCatalogo || errorReportes}
          </div>
        )}

        {vista === 'usuario' && (
          <>
            <VistaUsuarioMantenimiento maquinas={maquinas} />
            <SeccionReportesRecientes reportesPendientes={reportesPendientes} />
          </>
        )}

        {vista === 'admin' && <VistaAdminMantenimiento reportes={reportes} />}
      </div>
    </div>
  );
}

export default PortalMantenimiento;
