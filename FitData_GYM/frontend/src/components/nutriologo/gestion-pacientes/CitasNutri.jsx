import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAgendaNutri from '../hooks/useAgendaNutri';
import ModalExpedienteNutri from './ModalExpedienteNutri';
import TarjetaPacienteAgenda from './TarjetaPacienteAgenda';
import { MensajeEstadoLista } from '../ui/MensajeEstadoLista';
import { MensajeVacio } from '../ui/MensajeVacio';

export default function CitasNutri({ integrado = false }) {
  const navegar = useNavigate();
  const ubicacion = useLocation();
  const {
    abrirExpediente,
    asignacionesListas,
    citas,
    claseAncho,
    cerrarExpediente,
    errorAgenda,
    miembroSeleccionado,
    miembrosVisibles,
  } = useAgendaNutri();
  const rutaRegreso = ubicacion.pathname.startsWith('/nutriologo')
    ? '/nutriologo'
    : '/admin';

  return (
    <div className={integrado ? '' : 'min-h-screen bg-slate-950 p-4 md:p-8'}>
      <div className={`mx-auto mt-6 w-full ${claseAncho} rounded-[28px] border border-slate-800/80 bg-linear-to-br from-[#0f172a] via-[#0c1a37] to-[#0a1430] p-5 shadow-[0_18px_55px_rgba(2,10,28,0.45)] transition-all duration-300 md:p-8`}>
        <header className="mb-8 border-b border-cyan-900/30 pb-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="bg-linear-to-br from-blue-400 to-purple-400 bg-clip-text pb-1.5 text-3xl font-bold text-transparent">
                Agenda de Nutrición
              </h2>
              <p className="mt-1.5 font-medium text-slate-400">Citas con los miembros</p>
            </div>
            {!integrado && (
              <button
                type="button"
                onClick={() => navegar(rutaRegreso)}
                className="inline-flex items-center gap-2 self-start rounded-xl border border-cyan-800/40 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-cyan-200 transition-colors hover:border-cyan-500/50 hover:text-white"
              >
                <ArrowLeft size={16} />
                Volver
              </button>
            )}
          </div>
        </header>

        {errorAgenda && <MensajeEstadoLista mensaje={errorAgenda} />}
        {!errorAgenda && !asignacionesListas && (
          <MensajeEstadoLista mensaje="Cargando clientes asignados..." />
        )}
        {!errorAgenda && asignacionesListas && miembrosVisibles.length === 0 && (
          <MensajeVacio mensaje="No tienes clientes contratados en este momento." />
        )}
        {!errorAgenda && miembrosVisibles.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] justify-center gap-6">
            {miembrosVisibles.map((miembro) => (
              <TarjetaPacienteAgenda
                key={miembro.id}
                miembro={miembro}
                alAbrirExpediente={() => abrirExpediente(miembro)}
              />
            ))}
          </div>
        )}

        {miembroSeleccionado && (
          <ModalExpedienteNutri
            miembro={miembroSeleccionado}
            todasLasCitas={citas}
            alCerrar={cerrarExpediente}
          />
        )}
      </div>
    </div>
  );
}
