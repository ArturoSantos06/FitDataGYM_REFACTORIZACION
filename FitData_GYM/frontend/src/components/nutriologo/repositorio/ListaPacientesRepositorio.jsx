import TarjetaPacienteLista from './TarjetaPacienteLista';
import { EntradaTexto } from '../ui/EntradaTexto';
import { MensajeEstadoLista } from '../ui/MensajeEstadoLista';
import { MensajeVacio } from '../ui/MensajeVacio';
import { LIMITE_BUSQUEDA_DIETA } from '../utils/repositorioDietas';

export default function ListaPacientesRepositorio({
  cargando,
  pacientes,
  filtro,
  alCambiarFiltro,
  idSeleccionado,
  alSeleccionar,
  cantidadesArchivos,
}) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Seleccionar Paciente</h2>
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
          {pacientes.length} resultados
        </span>
      </div>

      <div className="mb-4">
        <EntradaTexto
          type="text"
          value={filtro}
          maxLength={LIMITE_BUSQUEDA_DIETA}
          onChange={(evento) =>
            alCambiarFiltro(evento.target.value.slice(0, LIMITE_BUSQUEDA_DIETA))}
          placeholder="Buscar por nombre, correo o ID..."
        />
      </div>

      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        {cargando && (
          <MensajeEstadoLista mensaje="Cargando pacientes asignados..." />
        )}

        {!cargando && pacientes.map((paciente) => (
          <TarjetaPacienteLista
            key={paciente.id}
            id={paciente.id}
            nombre={paciente.nombreCompleto}
            correo={paciente.email}
            estaSeleccionado={String(idSeleccionado) === String(paciente.id)}
            cantidadArchivos={cantidadesArchivos.get(String(paciente.id)) || 0}
            alSeleccionar={alSeleccionar}
          />
        ))}

        {!cargando && pacientes.length === 0 && (
          <MensajeVacio mensaje="No hay pacientes que coincidan con la búsqueda." />
        )}
      </div>
    </div>
  );
}
