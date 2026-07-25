import { ChefHat, X } from 'lucide-react';
import ControlCaloriasAsistente from './ControlCaloriasAsistente';
import ResultadosMenuAsistente from './ResultadosMenuAsistente';
import SelectorPacienteAsistente from './SelectorPacienteAsistente';

export default function PanelAsistenteMenu({
  alCerrar,
  caloriasObjetivo,
  alCambiarCalorias,
  alGenerar,
  cargandoMenu,
  pacientes,
  idPacienteSeleccionado,
  alSeleccionarPaciente,
  cargandoPacientes,
  alGuardarCalorias,
  guardandoCalorias,
  mensajeGuardado,
  error,
  nutrientes,
  comidas,
}) {
  return (
    <div className="fixed right-4 bottom-20 z-50 flex max-h-[85vh] w-80 flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl sm:w-96">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4">
        <div className="flex items-center gap-2">
          <ChefHat className="text-cyan-400" size={20} />
          <h3 className="font-bold text-white">Asistente de Menú</h3>
        </div>
        <button
          type="button"
          onClick={alCerrar}
          className="rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          aria-label="Cerrar asistente de menú"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 text-sm [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700">
        <SelectorPacienteAsistente
          pacientes={pacientes}
          idSeleccionado={idPacienteSeleccionado}
          alSeleccionar={alSeleccionarPaciente}
          cargando={cargandoPacientes}
        />
        <ControlCaloriasAsistente
          calorias={caloriasObjetivo}
          alCambiar={alCambiarCalorias}
          alGenerar={alGenerar}
          cargandoMenu={cargandoMenu}
          permiteGuardar={Boolean(idPacienteSeleccionado)}
          alGuardar={alGuardarCalorias}
          guardando={guardandoCalorias}
          mensajeGuardado={mensajeGuardado}
        />
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
            {error}
          </div>
        )}
        <ResultadosMenuAsistente
          nutrientes={nutrientes}
          comidas={comidas}
          cargando={cargandoMenu}
        />
      </div>
    </div>
  );
}
