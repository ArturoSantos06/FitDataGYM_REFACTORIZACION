import { useMemo } from 'react';
import {
  esMismoDia,
  formatearClaveFecha,
  generarDiasCalendario,
  irAlInicioDia,
} from './agendaClientesUtils';

const DIAS_SEMANA = [
  'Lun',
  'Mar',
  'Mié',
  'Jue',
  'Vie',
  'Sáb',
  'Dom',
];

function CalendarioAgenda({
  mesCalendario,
  fechaSeleccionada,
  citasPorFecha,
  onCambiarMes,
  onIrHoy,
  onSeleccionarFecha,
}) {
  const diasCalendario = useMemo(
    () => generarDiasCalendario(mesCalendario),
    [mesCalendario],
  );

  const etiquetaMes = useMemo(
    () =>
      mesCalendario
        .toLocaleDateString('es-MX', {
          month: 'long',
          year: 'numeric',
        })
        .toUpperCase(),
    [mesCalendario],
  );

  const hoy = irAlInicioDia(new Date());
  const fechaActiva = irAlInicioDia(fechaSeleccionada);

  return (
    <section className="flex w-1/2 flex-col border-r border-slate-800 bg-slate-900/50 p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Mes anterior"
            onClick={() => onCambiarMes(-1)}
            className="h-8 w-8 rounded-lg border border-slate-700 text-slate-300 transition-colors hover:bg-slate-800"
          >
            ‹
          </button>

          <button
            type="button"
            aria-label="Mes siguiente"
            onClick={() => onCambiarMes(1)}
            className="h-8 w-8 rounded-lg border border-slate-700 text-slate-300 transition-colors hover:bg-slate-800"
          >
            ›
          </button>

          <button
            type="button"
            onClick={onIrHoy}
            className="h-8 rounded-lg border border-slate-700 px-3 text-[11px] font-bold tracking-wider text-slate-300 transition-colors hover:bg-slate-800"
          >
            HOY
          </button>
        </div>

        <h2 className="text-sm font-bold tracking-wide text-cyan-400">
          {etiquetaMes}
        </h2>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
        {DIAS_SEMANA.map((dia) => (
          <div key={dia} className="py-1 text-center">
            {dia}
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-7 gap-2">
        {diasCalendario.map(({ fecha, enMesActual }) => {
          const fechaNormalizada = irAlInicioDia(fecha);
          const esPasado = fechaNormalizada < hoy;
          const seleccionado = esMismoDia(
            fechaNormalizada,
            fechaActiva,
          );
          const esHoy = esMismoDia(fechaNormalizada, hoy);
          const clave = formatearClaveFecha(fechaNormalizada);
          const tieneCitas =
            (citasPorFecha.get(clave) || 0) > 0;

          const claseMes = enMesActual
            ? 'text-slate-200'
            : 'text-slate-600';

          const claseSeleccionada = seleccionado
            ? 'bg-cyan-900/40 font-bold text-cyan-300 ring-2 ring-cyan-400'
            : 'hover:bg-slate-800';

          const claseHoy = esHoy
            ? 'border-cyan-500/50'
            : 'border-transparent';

          return (
            <button
              key={clave}
              type="button"
              onClick={() =>
                onSeleccionarFecha(fechaNormalizada)
              }
              className={`relative flex items-center justify-center rounded-xl border text-sm transition-all ${claseMes} ${claseSeleccionada} ${claseHoy} ${
                esPasado
                  ? 'opacity-40 hover:opacity-100'
                  : 'opacity-100'
              }`}
            >
              <span>{fechaNormalizada.getDate()}</span>

              {tieneCitas && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400 shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default CalendarioAgenda;