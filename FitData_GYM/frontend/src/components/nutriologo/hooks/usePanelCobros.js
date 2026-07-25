import { useCallback, useEffect, useMemo, useState } from 'react';
import { createMembershipSale, getCurrentUser } from '../../../firebase';
import { consultarClientesAsignados } from '../servicios/clientesCobro';
import {
  filtrarYOrdenarClientes,
  obtenerNombreCompleto,
} from '../utils/utilidadesCobros';
import useValorDemorado from './useValorDemorado';

const MONTO_PREDETERMINADO = '500';
const MENSAJE_INICIAL = { texto: '', tipo: 'exito' };

export default function usePanelCobros(alCrearCobro) {
  const [clientes, setClientes] = useState([]);
  const [cargandoClientes, setCargandoClientes] = useState(true);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('recientes');
  const [idClienteSeleccionado, setIdClienteSeleccionado] = useState('');
  const [monto, setMonto] = useState(MONTO_PREDETERMINADO);
  const [metodoPago, setMetodoPago] = useState('EFECTIVO');
  const [guardandoCobro, setGuardandoCobro] = useState(false);
  const [mensaje, setMensaje] = useState(MENSAJE_INICIAL);
  const busquedaDemorada = useValorDemorado(busqueda);

  useEffect(() => {
    let activo = true;

    consultarClientesAsignados()
      .then((clientesAsignados) => {
        if (activo) setClientes(clientesAsignados);
      })
      .catch((error) => {
        if (!activo) return;
        setClientes([]);
        setMensaje({
          texto: error?.message || 'No se pudo cargar la lista de clientes.',
          tipo: 'error',
        });
      })
      .finally(() => {
        if (activo) setCargandoClientes(false);
      });

    return () => {
      activo = false;
    };
  }, []);

  const clientesVisibles = useMemo(
    () => filtrarYOrdenarClientes(clientes, busquedaDemorada, orden),
    [busquedaDemorada, clientes, orden],
  );

  const clienteSeleccionado = useMemo(
    () => clientes.find(
      (cliente) => String(cliente.id) === String(idClienteSeleccionado),
    ) || null,
    [clientes, idClienteSeleccionado],
  );

  const registrarCobro = useCallback(async () => {
    if (guardandoCobro) return;

    const total = Number(monto || 0);
    if (!clienteSeleccionado) {
      setMensaje({ texto: 'Selecciona un cliente para registrar el cobro.', tipo: 'error' });
      return;
    }
    if (!Number.isFinite(total) || total <= 0) {
      setMensaje({ texto: 'Ingresa un monto válido mayor a cero.', tipo: 'error' });
      return;
    }

    setGuardandoCobro(true);
    setMensaje(MENSAJE_INICIAL);

    try {
      const usuarioActual = getCurrentUser();
      const correoVendedor = usuarioActual?.email
        || localStorage.getItem('nutritionist_username')
        || '';
      const resultado = await createMembershipSale({
        cliente_id: String(clienteSeleccionado.userId || '').trim() || null,
        metodo_pago: metodoPago,
        total,
        monto_recibido: total,
        membership_name: 'Plan Nutricional',
        tipo_venta: 'PLAN_NUTRICIONAL',
        sellerId: usuarioActual?.uid || '',
        sellerEmail: correoVendedor,
        vendedorId: usuarioActual?.uid || '',
        vendedorEmail: correoVendedor,
        cliente_auth_uid: clienteSeleccionado.authUid || '',
        cliente_nombre_override: obtenerNombreCompleto(clienteSeleccionado),
        cliente_email_override: clienteSeleccionado.email || '',
      });

      if (!resultado.success) {
        throw new Error(resultado.error || 'No se pudo registrar el cobro.');
      }

      setMensaje({
        texto: `Cobro registrado correctamente. Folio: ${resultado.folio}`,
        tipo: 'exito',
      });

      if (typeof alCrearCobro === 'function') {
        await alCrearCobro();
      }
    } catch (error) {
      setMensaje({
        texto: error?.message || 'No se pudo registrar el cobro.',
        tipo: 'error',
      });
    } finally {
      setGuardandoCobro(false);
    }
  }, [alCrearCobro, clienteSeleccionado, guardandoCobro, metodoPago, monto]);

  return {
    busqueda,
    cambiarBusqueda: setBusqueda,
    cambiarMetodoPago: setMetodoPago,
    cambiarMonto: setMonto,
    cambiarOrden: setOrden,
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
    seleccionarCliente: setIdClienteSeleccionado,
  };
}
