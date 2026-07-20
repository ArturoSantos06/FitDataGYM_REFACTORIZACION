import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

import useAgendaNutri from '../hooks/useAgendaNutri';
import ModalExpedienteNutri from './ModalExpedienteNutri';
import TarjetaPacienteAgenda from '../ui/TarjetaPacienteAgenda';
import { MensajeEstadoLista } from '../ui/MensajeEstadoLista';
import { MensajeVacio } from '../ui/MensajeVacio';

const CitasNutri = ({ embedded = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extraemos todo el estado y lógica desde el Hook
  const {
    miembrosVisibles,
    miembroSeleccionado,
    setMiembroSeleccionado,
    modalAbierto,
    setModalAbierto,
    citas,
    asignacionesListas,
    clasesAnchoLayout
  } = useAgendaNutri();

  const rutaRegreso = location.pathname.startsWith('/nutriologo') ? '/nutriologo' : '/admin';

  return (
    <div className={embedded ? '' : 'min-h-screen bg-slate-950 p-4 md:p-8'}>
      <div className={`mx-auto mt-6 w-full ${clasesAnchoLayout} rounded-[28px] border border-slate-800/80 bg-linear-to-br from-[#0f172a] via-[#0c1a37] to-[#0a1430] p-5 md:p-8 shadow-[0_18px_55px_rgba(2,10,28,0.45)] transition-all duration-300`}>

        {/* Encabezado */}
        <header className="mb-8 border-b border-cyan-900/30 pb-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-br from-blue-400 to-purple-400 pb-1.5">
                Agenda de Nutrición
              </h2>
              <p className="text-slate-400 font-medium mt-1.5">Citas con los miembros</p>
            </div>
            {!embedded && (
              <button
                type="button"
                onClick={() => navigate(rutaRegreso)}
                className="inline-flex items-center gap-2 self-start rounded-xl border border-cyan-800/40 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-cyan-200 hover:border-cyan-500/50 hover:text-white transition-colors"
              >
                <ArrowLeft size={16} />
                Volver
              </button>
            )}
          </div>
        </header>

        {/* Renderizado Condicional del Listado */}
        {!asignacionesListas ? (
           <MensajeEstadoLista mensaje="Cargando clientes asignados..." />
        ) : miembrosVisibles.length === 0 ? (
           <MensajeVacio mensaje="No tienes clientes contratados en este momento." />
        ) : (
          <div className="grid gap-6 justify-center grid-cols-[repeat(auto-fit,minmax(260px,320px))]">
            {miembrosVisibles.map((miembro) => (
              <TarjetaPacienteAgenda
                key={miembro.id}
                id={miembro.id}
                nombre={miembro.nombre}
                apellido={miembro.apellido}
                edad={miembro.edad}
                colorFondo={miembro.colorFondo}
                alAbrirExpediente={() => { 
                  setMiembroSeleccionado(miembro); 
                  setModalAbierto(true); 
                }}
              />
            ))}
          </div>
        )}

        {/* Modal */}
        {modalAbierto && (
          <ModalExpedienteNutri
            miembro={miembroSeleccionado}
            todasLasCitas={citas}
            onClose={() => setModalAbierto(false)}
          />
        )}
      </div>
    </div>
  );
};

export default CitasNutri;