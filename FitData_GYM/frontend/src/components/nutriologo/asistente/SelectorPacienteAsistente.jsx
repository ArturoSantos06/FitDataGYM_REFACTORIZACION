import { Loader2 } from 'lucide-react';
import { obtenerNombreCompleto } from '../utils/utilidadesCobros';

export default function SelectorPacienteAsistente({
  pacientes,
  idSeleccionado,
  alSeleccionar,
  cargando,
}) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-xs text-slate-400">
        Paciente (opcional)
      </label>
      <div className="relative">
        <select
          value={idSeleccionado}
          onChange={(evento) => alSeleccionar(evento.target.value)}
          disabled={cargando}
          className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800 p-2 pr-8 text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none disabled:opacity-50"
        >
          <option value="">-- Seleccionar paciente --</option>
          {pacientes.map((paciente) => (
            <option key={paciente.id} value={paciente.id}>
              {obtenerNombreCompleto(paciente)}
            </option>
          ))}
        </select>
        {cargando && (
          <div className="absolute top-2 right-2 text-slate-400">
            <Loader2 size={16} className="animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
