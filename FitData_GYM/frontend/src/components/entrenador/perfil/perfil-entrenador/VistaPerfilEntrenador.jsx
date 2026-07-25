import FormularioCambioContrasenaEntrenador from '../FormularioCambioContrasenaEntrenador';
import FormularioDatosPerfilEntrenador from '../FormularioDatosPerfilEntrenador';
import MenuPerfilEntrenador from '../MenuPerfilEntrenador';

function VistaPerfilEntrenador({
  vistaActual,
  usuario,
  codigoEntrenador,
  onGuardar,
  onCambiarVista,
}) {
  const volverAlMenu = () => {
    onCambiarVista('menu');
  };

  if (vistaActual === 'edit-personal') {
    return (
      <FormularioDatosPerfilEntrenador
        usuario={usuario}
        codigoEntrenador={codigoEntrenador}
        onGuardar={onGuardar}
        onVolver={volverAlMenu}
      />
    );
  }

  if (vistaActual === 'change-password') {
    return (
      <FormularioCambioContrasenaEntrenador
        onBack={volverAlMenu}
      />
    );
  }

  return (
    <MenuPerfilEntrenador
      usuario={usuario}
      onNavigate={onCambiarVista}
    />
  );
}

export default VistaPerfilEntrenador;