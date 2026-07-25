import FormularioDatosMacros from './calculadora/FormularioDatosMacros';
import TarjetaResultadosMacros from './TarjetaResultadosMacros';
import { useFormularioMacros } from './hooks/useFormularioMacros';

export default function FormularioMacros() {
  const {
    formulario,
    resultado,
    error,
    manejarCambio,
    manejarEnvio,
  } = useFormularioMacros();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <FormularioDatosMacros
        formulario={formulario}
        error={error}
        alCambiar={manejarCambio}
        alEnviar={manejarEnvio}
      />
      <TarjetaResultadosMacros resultado={resultado} />
    </div>
  );
}
