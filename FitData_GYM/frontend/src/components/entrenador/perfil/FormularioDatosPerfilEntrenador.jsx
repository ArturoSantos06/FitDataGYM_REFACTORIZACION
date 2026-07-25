import ContenidoFormularioPerfil from './formulario-datos-perfil/ContenidoFormularioPerfil';
import EncabezadoFormularioPerfil from './formulario-datos-perfil/EncabezadoFormularioPerfil';
import useFormularioDatosPerfilEntrenador from './formulario-datos-perfil/useFormularioDatosPerfilEntrenador';

function FormularioDatosPerfilEntrenador({
  usuario = {},
  codigoEntrenador = '',
  onGuardar,
  onVolver,
}) {
  const {
    form,
    guardando,
    mensajeError,
    mensajeExito,
    cambiarCampo,
    guardarFormulario,
  } = useFormularioDatosPerfilEntrenador({
    usuario,
    onGuardar,
  });

  const volver = () => {
    if (!guardando) {
      onVolver?.();
    }
  };

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl duration-300 md:p-8">
      <EncabezadoFormularioPerfil
        guardando={guardando}
        onVolver={volver}
      />

      <ContenidoFormularioPerfil
        form={form}
        codigoEntrenador={codigoEntrenador}
        guardando={guardando}
        mensajeError={mensajeError}
        mensajeExito={mensajeExito}
        onCambiarCampo={cambiarCampo}
        onGuardar={guardarFormulario}
        onCancelar={volver}
      />
    </section>
  );
}

export default FormularioDatosPerfilEntrenador;