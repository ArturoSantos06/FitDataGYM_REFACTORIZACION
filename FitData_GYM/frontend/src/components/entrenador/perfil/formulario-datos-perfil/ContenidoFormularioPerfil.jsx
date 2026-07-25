import SeccionDatosBasicosPerfil from '../SeccionDatosBasicosPerfil';
import SeccionFiscalBancariaPerfil from '../SeccionFiscalBancariaPerfil';
import SeccionServiciosPerfil from '../SeccionServiciosPerfil';

import AccionesFormularioPerfil from './AccionesFormularioPerfil';
import MensajesFormularioPerfil from './MensajesFormularioPerfil';

import {
  CLASE_INPUT,
  CLASE_LABEL,
} from './formularioDatosPerfilUtils';

function ContenidoFormularioPerfil({
  form,
  codigoEntrenador = '',
  guardando = false,
  mensajeError = '',
  mensajeExito = '',
  onCambiarCampo,
  onGuardar,
  onCancelar,
}) {
  return (
    <form
      onSubmit={onGuardar}
      className="space-y-6"
    >
      <fieldset
        disabled={guardando}
        className="space-y-6"
      >
        <SeccionDatosBasicosPerfil
          form={form}
          trainerCode={codigoEntrenador}
          inputClass={CLASE_INPUT}
          labelClass={CLASE_LABEL}
          onChange={onCambiarCampo}
        />

        <SeccionServiciosPerfil
          form={form}
          onChange={onCambiarCampo}
        />

        <SeccionFiscalBancariaPerfil
          form={form}
          inputClass={CLASE_INPUT}
          labelClass={CLASE_LABEL}
          onChange={onCambiarCampo}
        />
      </fieldset>

      <MensajesFormularioPerfil
        error={mensajeError}
        exito={mensajeExito}
      />

      <AccionesFormularioPerfil
        guardando={guardando}
        onCancelar={onCancelar}
      />
    </form>
  );
}

export default ContenidoFormularioPerfil;