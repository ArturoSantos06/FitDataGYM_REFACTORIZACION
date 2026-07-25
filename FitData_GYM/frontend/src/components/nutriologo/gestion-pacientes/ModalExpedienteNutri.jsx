import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// Importaciones Modulares (Ajusta rutas según necesites)
import ModalAgendarNutri from '../../modales/ModalAgendarNutri';
import ModalDetalleNutri from './ModalDetalleNutri';
import DialogoSistemaNutri from '../ui/DialogoSistemaNutri';
import { useModalExpediente } from '../hooks/useModalExpediente';
import { PanelLateralPaciente } from '../ui/PanelLateralPaciente';
import { EstilosCalendario } from '../ui/EstilosCalendario';
import { ModalAlertaPasado } from '../ui/ModalAlertaPasado';

const ModalExpedienteNutri = ({ miembro, todasLasCitas, onClose }) => {
  const {
    selectedDate, setSelectedDate,
    viewingCita, setViewingCita,
    dialog,
    notaPrevia, setNotaPrevia,
    showPastDateModal, setShowPastDateModal,
    handleDateClick
  } = useModalExpediente();

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-[#1a2332] w-full max-w-5xl rounded-4xl border border-slate-700/80 flex flex-col md:flex-row h-[82vh] overflow-hidden shadow-2xl relative">
        
        {/* Componente Atómico: Sidebar */}
        <PanelLateralPaciente 
          miembro={miembro} 
          notaPrevia={notaPrevia} 
          setNotaPrevia={setNotaPrevia} 
          onClose={onClose} 
        />

        {/* Contenedor del Calendario */}
        <div className="flex-1 p-6 bg-[#0f172a] overflow-y-auto">
          
          {/* Componente Atómico: Estilos encapsulados */}
          <EstilosCalendario />

          <div className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wide">
            <span className="inline-flex items-center gap-2 text-slate-300">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400"></span> Hoy
            </span>
            <span className="inline-flex items-center gap-2 text-slate-400">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-500"></span> Día pasado
            </span>
          </div>
          
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            initialDate={new Date()}
            headerToolbar={{ left: '', center: 'title', right: '' }}
            showNonCurrentDates={false}
            fixedWeekCount={false}
            events={todasLasCitas.filter(c => c.clienteId === miembro.id).map(c => ({
                id: c.id, title: c.title, start: c.fecha, extendedProps: { ...c }
            }))}
            dateClick={handleDateClick}
            eventClick={(info) => setViewingCita(info.event.extendedProps)}
            locale="es" height="100%"
          />
        </div>

        {/* MODALES ORQUESTADOS */}
        {selectedDate && (
          <ModalAgendarNutri 
            fecha={selectedDate} 
            miembro={miembro} 
            notaIncial={notaPrevia}
            todasLasCitas={todasLasCitas}
            onClose={() => setSelectedDate(null)} 
            onSuccess={() => { setSelectedDate(null); setNotaPrevia(''); }}
          />
        )}
        
        {viewingCita && (
          <ModalDetalleNutri 
            cita={viewingCita} 
            onClose={() => setViewingCita(null)} 
          />
        )}
        
        {dialog && <DialogoSistemaNutri {...dialog} />}

        {showPastDateModal && (
          <ModalAlertaPasado onClose={() => setShowPastDateModal(false)} />
        )}
        
      </div>
    </div>
  );
};

export default ModalExpedienteNutri;