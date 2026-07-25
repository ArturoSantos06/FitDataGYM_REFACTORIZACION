import {
  INFORMACION_FORMULA,
  OPCIONES_ACTIVIDAD,
  OPCIONES_OBJETIVO,
} from '../utils/calculosNutricionales';
import {
  CampoNumericoMacros,
  CampoSeleccionMacros,
} from './CamposFormularioMacros';

export default function FormularioDatosMacros({
  formulario,
  error,
  alCambiar,
  alEnviar,
}) {
  return (
    <form
      onSubmit={alEnviar}
      className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl"
    >
      <h2 className="text-xl font-bold text-white">Datos del paciente</h2>
      <p className="mt-1 text-sm text-slate-400">{INFORMACION_FORMULA}</p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CampoSeleccionMacros
          nombre="sexo"
          etiqueta="Sexo"
          valor={formulario.sexo}
          opciones={[
            { valor: 'hombre', etiqueta: 'Hombre' },
            { valor: 'mujer', etiqueta: 'Mujer' },
          ]}
          alCambiar={alCambiar}
        />
        <CampoNumericoMacros
          nombre="edad"
          etiqueta="Edad"
          valor={formulario.edad}
          minimo="10"
          maximo="100"
          ejemplo="32"
          alCambiar={alCambiar}
        />
        <CampoNumericoMacros
          nombre="pesoKg"
          etiqueta="Peso (kg)"
          valor={formulario.pesoKg}
          minimo="30"
          maximo="250"
          paso="0.1"
          ejemplo="78.5"
          alCambiar={alCambiar}
        />
        <CampoNumericoMacros
          nombre="alturaCm"
          etiqueta="Altura (cm)"
          valor={formulario.alturaCm}
          minimo="120"
          maximo="240"
          ejemplo="175"
          alCambiar={alCambiar}
        />
        <CampoSeleccionMacros
          nombre="nivelActividad"
          etiqueta="Nivel de actividad"
          valor={formulario.nivelActividad}
          opciones={OPCIONES_ACTIVIDAD}
          alCambiar={alCambiar}
          anchoCompleto
        />
        <CampoSeleccionMacros
          nombre="objetivo"
          etiqueta="Objetivo nutricional"
          valor={formulario.objetivo}
          opciones={OPCIONES_OBJETIVO}
          alCambiar={alCambiar}
          anchoCompleto
        />
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-red-500 bg-red-900/20 p-3 text-sm text-red-300">
          {error}
        </div>
      )}
      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-cyan-600 py-3 font-bold text-white transition-colors hover:bg-cyan-500"
      >
        Ejecutar algoritmo de macronutrientes
      </button>
    </form>
  );
}
