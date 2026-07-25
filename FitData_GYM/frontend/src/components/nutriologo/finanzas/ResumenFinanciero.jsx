import { DollarSign, CalendarDays, ClipboardList } from 'lucide-react';
import { TarjetaResumen } from './TarjetaResumen';
import { crearResumenFinanciero } from '../utils/finanzas';

export default function ResumenFinanciero({
  cantidadConsultas,
  cantidadPlanes,
  totalGeneral,
  totalPlanes,
}) {
  const {
    totalIngresos,
    operacionesTotales,
    totalCobros,
    cantidadCobros,
    cantidadPlanesVendidos,
  } = crearResumenFinanciero({
    cantidadConsultas,
    cantidadPlanes,
    totalGeneral,
    totalPlanes,
  });

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      <TarjetaResumen
        titulo="Ingresos Totales"
        valor={totalIngresos}
        subtitulo={`${operacionesTotales} operaciones registradas`}
        tonoClases="border-emerald-500/40 bg-emerald-500/10"
        icono={<DollarSign className="text-emerald-300" size={18} />}
      />

      <TarjetaResumen
        titulo="Cobros"
        valor={totalCobros}
        subtitulo={`${cantidadCobros} cobros registrados`}
        tonoClases="border-cyan-500/40 bg-cyan-500/10"
        icono={<CalendarDays className="text-cyan-300" size={18} />}
      />

      <TarjetaResumen
        titulo="Planes Vendidos"
        valor={cantidadPlanesVendidos}
        subtitulo="Ventas con etiqueta de plan"
        tonoClases="border-indigo-500/40 bg-indigo-500/10"
        icono={<ClipboardList className="text-indigo-300" size={18} />}
      />
    </div>
  );
}
