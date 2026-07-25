import { useMemo, useState } from 'react';
import useAgendaClientes from './agenda-clientes/useAgendaClientes';
import TarjetaClienteAgenda from './agenda-clientes/TarjetaClienteAgenda';
import CalendarioAgenda from './agenda-clientes/CalendarioAgenda';
import PanelCitasDia from './agenda-clientes/PanelCitasDia';
import ModalFechaPasada from './agenda-clientes/ModalFechaPasada';
import {
  crearMesInicial,
  FORMULARIO_CITA_INICIAL,
  formatearClaveFecha,
  irAlInicioDia,
} from './agenda-clientes/agendaClientesUtils';

function AgendaClientes() {
  const {
    clientes,
    citas,
    guardarCita,
    eliminarCita,
  } = useAgendaClientes();

  const [clienteSeleccionado, setClienteSeleccionado] =
    useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] =
    useState(new Date());
  const [mesCalendario, setMesCalendario] = useState(
    crearMesInicial,
  );
  const [formularioCita, setFormularioCita] = useState(
    FORMULARIO_CITA_INICIAL,
  );
  const [
    mostrarModalFechaPasada,
    setMostrarModalFechaPasada,
  ] = useState(false);
  const [etiquetaFechaPasada, setEtiquetaFechaPasada] =
    useState('');

  const citasPorFecha = useMemo(() => {
    const conteo = new Map();

    citas
      .filter(
        (cita) =>
          String(cita.cliente) ===
          String(clienteSeleccionado?.id),
      )
      .forEach((cita) => {
        conteo.set(
          cita.fecha,
          (conteo.get(cita.fecha) || 0) + 1,
        );
      });

    return conteo;
  }, [citas, clienteSeleccionado]);

  const citasDelDia = useMemo(() => {
    const claveFecha = formatearClaveFecha(
      fechaSeleccionada,
    );

    return citas.filter(
      (cita) =>
        String(cita.cliente) ===
          String(clienteSeleccionado?.id) &&
        cita.fecha === claveFecha,
    );
  }, [citas, clienteSeleccionado, fechaSeleccionada]);

  const seleccionarFecha = (fecha) => {
    const hoy = irAlInicioDia(new Date());
    const fechaObjetivo = irAlInicioDia(fecha);

    if (fechaObjetivo < hoy) {
      setEtiquetaFechaPasada(
        fechaObjetivo.toLocaleDateString('es-MX', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }),
      );

      setMostrarModalFechaPasada(true);
      return;
    }

    setFechaSeleccionada(fechaObjetivo);
    setMesCalendario(crearMesInicial(fechaObjetivo));
  };

  const cambiarMes = (cantidad) => {
    setMesCalendario(
      (mesActual) =>
        new Date(
          mesActual.getFullYear(),
          mesActual.getMonth() + cantidad,
          1,
        ),
    );
  };

  const irHoy = () => {
    const hoy = new Date();
    setFechaSeleccionada(hoy);
    setMesCalendario(crearMesInicial(hoy));
  };

  const registrarCita = async () => {
    if (!clienteSeleccionado) return;

    const guardada = await guardarCita({
      clienteId: clienteSeleccionado.id,
      fecha: fechaSeleccionada,
      inicio: formularioCita.inicio,
      fin: formularioCita.fin,
    });

    if (guardada) {
      setFormularioCita(FORMULARIO_CITA_INICIAL);
    }
  };

  return (
    <div className="mx-auto max-w-350 animate-fade-in p-6 text-white">
      <header className="mb-10 border-b border-slate-800 pb-6">
        <h1 className="bg-linear-to-r from-purple-400 via-pink-400 to-blue-500 bg-clip-text text-3xl font-extrabold uppercase italic tracking-wider text-transparent md:text-4xl">
          Agenda de Sesiones
        </h1>

        <p className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
          Planeación de Entrenamientos
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {clientes.map((cliente) => (
          <TarjetaClienteAgenda
            key={cliente.id}
            cliente={cliente}
            onSeleccionar={setClienteSeleccionado}
          />
        ))}
      </div>

      {clienteSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="flex h-137.5 w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-700 bg-slate-900">
            <CalendarioAgenda
              mesCalendario={mesCalendario}
              fechaSeleccionada={fechaSeleccionada}
              citasPorFecha={citasPorFecha}
              onCambiarMes={cambiarMes}
              onIrHoy={irHoy}
              onSeleccionarFecha={seleccionarFecha}
            />

            <PanelCitasDia
              cliente={clienteSeleccionado}
              fechaSeleccionada={fechaSeleccionada}
              citas={citasDelDia}
              formulario={formularioCita}
              onCambiarFormulario={setFormularioCita}
              onGuardar={registrarCita}
              onEliminar={eliminarCita}
              onCerrar={() =>
                setClienteSeleccionado(null)
              }
            />
          </div>
        </div>
      )}

      <ModalFechaPasada
        visible={mostrarModalFechaPasada}
        etiquetaFecha={etiquetaFechaPasada}
        onCerrar={() =>
          setMostrarModalFechaPasada(false)
        }
      />
    </div>
  );
}

export default AgendaClientes;