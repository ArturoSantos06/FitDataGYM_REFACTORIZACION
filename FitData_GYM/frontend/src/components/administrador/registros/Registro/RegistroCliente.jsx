import useRegistroCliente from './hooks/useRegistroCliente';
import ContenedorRegistro from './partes/ContenedorRegistro';
import FormularioClienteVista from './partes/FormularioClienteVista';
import FormularioSaludAdmin from '../FormularioSaludAdmin/FormularioSaludAdmin';
import ModalExito from '../../../modales/ModalExito';
import { SUBTITULOS_REGISTRO } from './contenido';

export default function RegistroCliente({ onUserRegistered, tipoRegistro, onCambioTipoRegistro }) {
  const {
    estado,
    formData,
    membresias,
    montoRecibido,
    cambio,
    mostrarFormularioSalud,
    emailReciente,
    manejarCambio,
    manejarCambioMonto,
    manejarEnvio,
    cerrarModalExito,
    onFichaSaludGuardada,
    onFichaSaludCerrar,
  } = useRegistroCliente(onUserRegistered);

  return (
    <ContenedorRegistro
      estado={estado}
      subtitulo={SUBTITULOS_REGISTRO.cliente}
      tipoRegistro={tipoRegistro}
      onCambioTipoRegistro={onCambioTipoRegistro}
    >
      <ModalExito
        isOpen={estado.mostrarModalExito}
        onClose={cerrarModalExito}
        title="¡Registro Exitoso!"
        message={estado.mensajeExito}
        subMessage={estado.mensajeSubExito}
      >
        {mostrarFormularioSalud && (
          <div className="mt-2">
            <p className="text-xs text-slate-400 mb-2">
              Completa ahora la ficha médica inicial del cliente antes de su primer acceso.
            </p>
            <FormularioSaludAdmin miembroEmail={emailReciente} onClose={onFichaSaludCerrar} onSaved={onFichaSaludGuardada} />
          </div>
        )}
      </ModalExito>

      <FormularioClienteVista
        formData={formData}
        onCambio={manejarCambio}
        membresias={membresias}
        montoRecibido={montoRecibido}
        onCambioMonto={manejarCambioMonto}
        cambio={cambio}
        cargando={estado.cargando}
        onEnviar={manejarEnvio}
      />
    </ContenedorRegistro>
  );
}
