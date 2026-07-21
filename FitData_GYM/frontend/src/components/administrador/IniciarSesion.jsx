import { useAutenticacion } from './hooks/useAutenticacion';
import FormularioAccesoVista from './partes/FormularioAccesoVista';

function IniciarSesion({ onLogin }) {
  const { error, isLoading, handleSubmit, volver } = useAutenticacion(onLogin);

  return (
    <FormularioAccesoVista
      error={error}
      isLoading={isLoading}
      onSubmit={handleSubmit}
      onVolver={volver}
    />
  );
}

export default IniciarSesion;
