import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ModalExpedienteEntrenador from '../../modales/ModalExpedienteEntrenador';
import useClientesAsignadosEntrenador from './citas-entrenador/useClientesAsignadosEntrenador';
import TarjetaClienteAgenda from './citas-entrenador/TarjetaClienteAgenda';
import { obtenerClaseAncho } from './citas-entrenador/citasEntrenadorUtils';

function CitasEntrenador({ embedded = false }) {
  const navegar = useNavigate();
  const ubicacion = useLocation();

  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

  const {
    clientes,
    cargando,
    error,
  } = useClientesAsignadosEntrenador();

  const rutaAtras = ubicacion.pathname.startsWith('/entrenador')
    ? '/entrenador'
    : '/admin';

  const claseAncho = obtenerClaseAncho(
    clientes.length,
    cargando,
  );

  const abrirExpediente = (cliente) => {
    setClienteSeleccionado(cliente);
  };

  const cerrarExpediente = () => {
    setClienteSeleccionado(null);
  };

  return (
    <div
      className={
        embedded
          ? ''
          : 'min-h-screen bg-slate-950 p-4 md:p-8'
      }
    >
      <div
        className={`mx-auto mt-6 w-full ${claseAncho} rounded-[28px] border border-slate-800/80 bg-linear-to-br from-[#0f172a] via-[#0c1a37] to-[#0a1430] p-5 shadow-[0_18px_55px_rgba(2,10,28,0.45)] transition-all duration-300 md:p-8`}
      >
        <header className="mb-8 border-b border-cyan-900/30 pb-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="bg-linear-to-br from-blue-400 to-purple-400 bg-clip-text pb-1.5 text-3xl font-bold text-transparent">
                Agenda de Sesiones
              </h2>

              <p className="mt-1.5 font-medium text-slate-400">
                Planeación de sesiones
              </p>
            </div>

            {!embedded && (
              <button
                type="button"
                onClick={() => navegar(rutaAtras)}
                className="inline-flex items-center gap-2 self-start rounded-xl border border-cyan-800/40 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-cyan-200 transition-colors hover:border-cyan-500/50 hover:text-white"
              >
                <ArrowLeft
                  size={16}
                  aria-hidden="true"
                />
                Volver
              </button>
            )}
          </div>
        </header>

        {cargando && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-8 text-center text-slate-300">
            Cargando clientes asignados...
          </div>
        )}

        {!cargando && error && (
          <div className="rounded-2xl border border-red-800/50 bg-red-900/20 px-6 py-8 text-center text-red-300">
            {error}
          </div>
        )}

        {!cargando && !error && clientes.length === 0 && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-6 py-8 text-center text-slate-300">
            No tienes clientes asignados en este momento.
          </div>
        )}

        {!cargando && !error && clientes.length > 0 && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,320px))] justify-center gap-6">
            {clientes.map((cliente) => (
              <TarjetaClienteAgenda
                key={cliente.id}
                cliente={cliente}
                onPlanificar={abrirExpediente}
              />
            ))}
          </div>
        )}

        {clienteSeleccionado && (
          <ModalExpedienteEntrenador
            miembro={clienteSeleccionado}
            onClose={cerrarExpediente}
          />
        )}
      </div>
    </div>
  );
}

export default CitasEntrenador;