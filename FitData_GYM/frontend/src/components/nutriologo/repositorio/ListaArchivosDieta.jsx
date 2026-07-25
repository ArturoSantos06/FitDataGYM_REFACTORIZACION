import { TarjetaArchivo } from './TarjetaArchivo';
import { MensajeEstadoLista } from '../ui/MensajeEstadoLista';
import {
  esRolNutriologo,
  LIMITE_BUSQUEDA_DIETA,
} from '../utils/repositorioDietas';

function ContenidoArchivos({
  cargando,
  mostrarRecientes,
  idPacienteSeleccionado,
  filtro,
  archivos,
  alDescargar,
  alSolicitarEliminar,
  guardando,
}) {
  if (cargando) {
    return <p className="py-4 text-center text-slate-400">Cargando repositorio...</p>;
  }
  if (!mostrarRecientes && !idPacienteSeleccionado && !filtro.trim()) {
    return <MensajeEstadoLista mensaje="Selecciona un paciente para ver sus archivos." />;
  }
  if (archivos.length === 0) {
    const contexto = mostrarRecientes ? 'recientemente' : 'con los filtros actuales';
    return <MensajeEstadoLista mensaje={`No hay archivos registrados ${contexto}.`} />;
  }

  return (
    <div className="space-y-3">
      {archivos.map((archivo) => (
        <TarjetaArchivo
          key={archivo.id}
          archivo={archivo}
          alDescargar={alDescargar}
          alSolicitarEliminar={alSolicitarEliminar}
          guardando={guardando}
        />
      ))}
    </div>
  );
}

export default function ListaArchivosDieta({
  cargando,
  rolSesion,
  mostrarRecientes,
  alCambiarMostrarRecientes,
  filtro,
  alCambiarFiltro,
  idPacienteSeleccionado,
  archivos,
  alDescargar,
  alSolicitarEliminar,
  guardando,
}) {
  const descripcionRecientes = esRolNutriologo(rolSesion)
    ? 'Archivos más recientes de tus pacientes asignados.'
    : 'Archivos más recientes de todos los pacientes.';

  return (
    <div className="self-start rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Archivos Registrados</h2>
          <p className="text-sm text-slate-400">
            {mostrarRecientes
              ? descripcionRecientes
              : 'Consulta y descarga los archivos del expediente digital.'}
          </p>
        </div>
        <div className="flex gap-2 lg:items-center">
          <button
            type="button"
            onClick={() => alCambiarMostrarRecientes(!mostrarRecientes)}
            className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${
              mostrarRecientes
                ? 'border border-cyan-500 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30'
                : 'border border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'
            }`}
          >
            {mostrarRecientes ? '← Volver' : 'Ver recientes'}
          </button>
          <input
            type="text"
            value={filtro}
            maxLength={LIMITE_BUSQUEDA_DIETA}
            onChange={(evento) =>
              alCambiarFiltro(evento.target.value.slice(0, LIMITE_BUSQUEDA_DIETA))}
            placeholder="Buscar archivo o paciente..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 lg:w-auto lg:min-w-xs"
          />
        </div>
      </div>

      <ContenidoArchivos
        cargando={cargando}
        mostrarRecientes={mostrarRecientes}
        idPacienteSeleccionado={idPacienteSeleccionado}
        filtro={filtro}
        archivos={archivos}
        alDescargar={alDescargar}
        alSolicitarEliminar={alSolicitarEliminar}
        guardando={guardando}
      />
    </div>
  );
}
