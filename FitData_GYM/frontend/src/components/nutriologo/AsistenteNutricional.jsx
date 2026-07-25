import { ChefHat, X } from 'lucide-react';
import PanelAsistenteMenu from './asistente/PanelAsistenteMenu';
import useAsistenteNutricional from './hooks/useAsistenteNutricional';

export default function AsistenteNutricional() {
  const {
    abierto,
    caloriasObjetivo,
    cambiarCaloriasObjetivo,
    cargandoMenu,
    cargandoPacientes,
    cerrarAsistente,
    comidasSugeridas,
    error,
    generarSugerencias,
    guardandoCalorias,
    guardarCaloriasPaciente,
    idPacienteSeleccionado,
    mensajeGuardado,
    nutrientesDiarios,
    pacientes,
    seleccionarPaciente,
    alternarAsistente,
  } = useAsistenteNutricional();

  return (
    <>
      {abierto && (
        <PanelAsistenteMenu
          alCerrar={cerrarAsistente}
          caloriasObjetivo={caloriasObjetivo}
          alCambiarCalorias={cambiarCaloriasObjetivo}
          alGenerar={generarSugerencias}
          cargandoMenu={cargandoMenu}
          pacientes={pacientes}
          idPacienteSeleccionado={idPacienteSeleccionado}
          alSeleccionarPaciente={seleccionarPaciente}
          cargandoPacientes={cargandoPacientes}
          alGuardarCalorias={guardarCaloriasPaciente}
          guardandoCalorias={guardandoCalorias}
          mensajeGuardado={mensajeGuardado}
          error={error}
          nutrientes={nutrientesDiarios}
          comidas={comidasSugeridas}
        />
      )}

      <button
        type="button"
        onClick={alternarAsistente}
        className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-[0_10px_30px_rgba(6,182,212,0.4)] transition-transform hover:scale-105"
        aria-label={abierto ? 'Cerrar asistente de menú' : 'Abrir asistente de menú'}
      >
        {abierto ? <X size={24} /> : <ChefHat size={24} />}
      </button>
    </>
  );
}
