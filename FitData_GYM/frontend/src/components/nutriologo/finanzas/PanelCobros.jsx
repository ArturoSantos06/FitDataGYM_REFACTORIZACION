import usePanelCobros from '../hooks/usePanelCobros';
import FormularioCobro from './cobros/FormularioCobro';
import SelectorClientesCobro from './cobros/SelectorClientesCobro';

export default function PanelCobros({ alCrearCobro }) {
  const {
    busqueda,
    cambiarBusqueda,
    cambiarMetodoPago,
    cambiarMonto,
    cambiarOrden,
    cargandoClientes,
    clienteSeleccionado,
    clientesVisibles,
    guardandoCobro,
    idClienteSeleccionado,
    mensaje,
    metodoPago,
    monto,
    orden,
    registrarCobro,
    seleccionarCliente,
  } = usePanelCobros(alCrearCobro);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
        Cobrar Plan Nutricional
      </h3>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <SelectorClientesCobro
          busqueda={busqueda}
          alCambiarBusqueda={cambiarBusqueda}
          orden={orden}
          alCambiarOrden={cambiarOrden}
          clientes={clientesVisibles}
          cargando={cargandoClientes}
          idSeleccionado={idClienteSeleccionado}
          alSeleccionar={seleccionarCliente}
          clienteSeleccionado={clienteSeleccionado}
        />
        <FormularioCobro
          monto={monto}
          alCambiarMonto={cambiarMonto}
          metodoPago={metodoPago}
          alCambiarMetodoPago={cambiarMetodoPago}
          alCobrar={registrarCobro}
          guardando={guardandoCobro}
          deshabilitado={cargandoClientes}
          mensaje={mensaje}
        />
      </div>
    </section>
  );
}
