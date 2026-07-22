import { useCatalogoMembresias } from './useCatalogoMembresias';
import { useBuscadorCliente } from './useBuscadorCliente';
import { usePagoMembresia } from './usePagoMembresia';
import { useEnvioAsignacion } from './useEnvioAsignacion';

const obtenerUrlImagen = (rutaImagen) =>
  rutaImagen || 'https://placehold.co/400x250/1e293b/ffffff?text=Sin+Imagen';

// Compone los 4 hooks de la fase y arma los grupos que consume cada parte de
// la vista. La logica en si vive en cada hook; este solo cablea.
export function useAsignarMembresia(onSuccess) {
  const { clientes, tiposMembresia } = useCatalogoMembresias();
  const buscador = useBuscadorCliente(clientes);
  const pagoState = usePagoMembresia(tiposMembresia);

  const envio = useEnvioAsignacion({
    clienteSeleccionado: buscador.clienteSeleccionado,
    membresiaSeleccionada: pagoState.membresiaSeleccionada,
    metodoPago: pagoState.metodoPago,
    montoRecibido: pagoState.montoRecibido,
    precioSeleccionado: pagoState.precioSeleccionado,
    cambio: pagoState.cambio,
    onExito: () => {
      buscador.reiniciar();
      pagoState.reiniciar();
      onSuccess?.();
    },
  });

  return {
    buscador: {
      dropdownRef: buscador.dropdownRef,
      busqueda: buscador.busquedaCliente,
      onBusquedaChange: buscador.cambiarBusqueda,
      onFocus: buscador.abrirDropdown,
      dropdownAbierto: buscador.dropdownAbierto,
      clientes: buscador.clientesFiltrados,
      onSeleccionar: buscador.seleccionarCliente,
    },
    seleccionMembresia: {
      tipos: tiposMembresia,
      seleccionado: pagoState.membresiaSeleccionada,
      onSeleccionar: pagoState.setMembresiaSeleccionada,
      obtenerUrlImagen,
    },
    pago: {
      metodoPago: pagoState.metodoPago,
      onMetodoPagoChange: pagoState.setMetodoPago,
      precio: pagoState.precioSeleccionado,
      montoRecibido: pagoState.montoRecibido,
      onMontoRecibidoChange: pagoState.setMontoRecibido,
      cambio: pagoState.cambio,
    },
    conflicto: {
      datos: envio.datosConflicto,
      onCancelar: envio.cerrarConflicto,
      onConfirmar: () => envio.enviarAsignacion(true),
    },
    exito: {
      isOpen: envio.modalExitoAbierto,
      onClose: envio.cerrarModalExito,
      message: envio.mensajeExito,
      subMessage: envio.subMensajeExito,
    },
    error: envio.error,
    cargando: envio.cargando,
    enviarFormulario: (e) => {
      e.preventDefault();
      envio.enviarAsignacion(false);
    },
  };
}
