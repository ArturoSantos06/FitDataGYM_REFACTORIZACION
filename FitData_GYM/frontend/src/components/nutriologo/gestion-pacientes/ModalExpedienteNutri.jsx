import { useMemo } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ModalAgendarNutri from '../../modales/ModalAgendarNutri';
import ModalDetalleNutri from './ModalDetalleNutri';
import { useModalExpediente } from '../hooks/useModalExpediente';
import { crearEventosCalendario } from '../utils/agendaNutri';
import ContenedorCalendario from './ContenedorCalendario';
import ModalAlertaPasado from './ModalAlertaPasado';
import PanelLateralPaciente from './PanelLateralPaciente';

export default function ModalExpedienteNutri({
  miembro,
  todasLasCitas,
  alCerrar,
}) {
  const {
    abrirDetalle,
    cerrarAgenda,
    cerrarAlertaPasado,
    cerrarDetalle,
    citaVista,
    completarAgenda,
    fechaSeleccionada,
    manejarClicFecha,
    mostrarAlertaPasado,
    notaPrevia,
    setNotaPrevia,
  } = useModalExpediente();
  const eventos = useMemo(
    () => crearEventosCalendario(todasLasCitas, miembro.id),
    [miembro.id, todasLasCitas],
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md">
      <div className="relative flex h-[82vh] w-full max-w-5xl flex-col overflow-hidden rounded-4xl border border-slate-700/80 bg-[#1a2332] shadow-2xl md:flex-row">
        <PanelLateralPaciente
          miembro={miembro}
          notaPrevia={notaPrevia}
          alCambiarNota={setNotaPrevia}
          alCerrar={alCerrar}
        />

        <div className="flex-1 overflow-y-auto bg-[#0f172a] p-6">
          <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold tracking-wide uppercase">
            <span className="inline-flex items-center gap-2 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
              Hoy
            </span>
            <span className="inline-flex items-center gap-2 text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-500" />
              Día pasado
            </span>
          </div>

          <ContenedorCalendario>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              initialDate={new Date()}
              headerToolbar={{ left: '', center: 'title', right: '' }}
              showNonCurrentDates={false}
              fixedWeekCount={false}
              events={eventos}
              dateClick={manejarClicFecha}
              eventClick={(informacion) =>
                abrirDetalle(informacion.event.extendedProps)}
              locale="es"
              height="100%"
            />
          </ContenedorCalendario>
        </div>

        {fechaSeleccionada && (
          <ModalAgendarNutri
            fecha={fechaSeleccionada}
            miembro={miembro}
            notaIncial={notaPrevia}
            todasLasCitas={todasLasCitas}
            onClose={cerrarAgenda}
            onSuccess={completarAgenda}
          />
        )}
        {citaVista && (
          <ModalDetalleNutri cita={citaVista} alCerrar={cerrarDetalle} />
        )}
        {mostrarAlertaPasado && (
          <ModalAlertaPasado alCerrar={cerrarAlertaPasado} />
        )}
      </div>
    </div>
  );
}
