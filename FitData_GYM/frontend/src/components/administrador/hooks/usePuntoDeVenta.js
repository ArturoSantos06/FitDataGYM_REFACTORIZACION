import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createSale, deleteProduct, getProducts, getUsers } from '../../../firebase';

const formatClient = user => ({
    id: user.id, username: user.username || user.email, email: user.email,
    first_name: user.first_name || '', last_name: user.last_name || ''
});

export function usePuntoDeVenta() {
    const [listaProductos, setListaProductos] = useState([]);
    const [listaClientes, setListaClientes] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [metodoPago, setMetodoPago] = useState('EFECTIVO');
    const [montoRecibido, setMontoRecibido] = useState('');
    const [cambio, setCambio] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [recargarHistorial, setRecargarHistorial] = useState(0);
    const [busquedaCliente, setBusquedaCliente] = useState('');
    const [mostrarDropdown, setMostrarDropdown] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [productToDeleteDB, setProductToDeleteDB] = useState(null);
    const [itemToDeleteCart, setItemToDeleteCart] = useState(null);
    const [messages, setMessages] = useState({ success: '', subSuccess: '', error: '', errorTitle: '' });
    const [modals, setModals] = useState({ deleteProduct: false, deleteCart: false, success: false, error: false });
    const dropdownRef = useRef(null);

    const toggleModal = useCallback((name, value) => {
        setModals(current => ({ ...current, [name]: value }));
    }, []);
    const showError = useCallback((errorTitle, error) => {
        setMessages(current => ({ ...current, errorTitle, error }));
        toggleModal('error', true);
    }, [toggleModal]);
    const cargarDatos = useCallback(async () => {
        try {
            const [products, users] = await Promise.all([getProducts(), getUsers()]);
            if (products.success) setListaProductos(products.data);
            if (users.success) setListaClientes(users.data.map(formatClient));
        } catch (error) { console.error('Error cargando datos', error); }
    }, []);
    const handleClickOutside = useCallback(event => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) setMostrarDropdown(false);
    }, []);

    useEffect(() => {
        cargarDatos();
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [cargarDatos, handleClickOutside]);

    const total = useMemo(() => carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0), [carrito]);
    useEffect(() => setCambio((parseFloat(montoRecibido) || 0) - total), [montoRecibido, total]);

    const clientesFiltrados = useMemo(() => {
        const query = busquedaCliente.toLowerCase();
        return listaClientes.filter(client => `${client.first_name} ${client.last_name} ${client.username}`.toLowerCase().includes(query));
    }, [busquedaCliente, listaClientes]);

    const agregarAlCarrito = useCallback((producto, cantidad) => {
        const existente = carrito.find(item => item.id === producto.id);
        if ((existente?.cantidad || 0) + cantidad > producto.stock) {
            showError('Stock Insuficiente', 'No hay suficientes productos en el inventario.');
            return;
        }
        setCarrito(current => existente
            ? current.map(item => item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item)
            : [...current, { id: producto.id, nombre: producto.nombre, precio: parseFloat(producto.precio), cantidad }]
        );
    }, [carrito, showError]);
    const abrirEditar = useCallback(producto => { setProductoAEditar(producto); toggleModal('edit', true); }, [toggleModal]);
    const confirmarEliminacionDB = useCallback(id => { setProductToDeleteDB(id); toggleModal('deleteProduct', true); }, [toggleModal]);
    const ejecutarEliminacionDB = useCallback(async () => {
        if (!productToDeleteDB) return;
        try {
            const result = await deleteProduct(productToDeleteDB);
            if (!result.success) return alert(`Error al eliminar: ${result.error}`);
            toggleModal('deleteProduct', false); setProductToDeleteDB(null); await cargarDatos();
        } catch { alert('Error al eliminar'); }
    }, [cargarDatos, productToDeleteDB, toggleModal]);
    const pedirConfirmacionCarrito = useCallback(id => { setItemToDeleteCart(id); toggleModal('deleteCart', true); }, [toggleModal]);
    const confirmarBorrarCarrito = useCallback(() => {
        setCarrito(current => current.filter(item => item.id !== itemToDeleteCart));
        setItemToDeleteCart(null); toggleModal('deleteCart', false);
    }, [itemToDeleteCart, toggleModal]);
    const seleccionarCliente = useCallback((id, nombre) => {
        setClienteSeleccionado(id); setBusquedaCliente(nombre); setMostrarDropdown(false);
    }, []);
    const procesarVenta = useCallback(async () => {
        if (!carrito.length) return showError('Carrito Vacío', 'Agrega productos antes de cobrar.');
        if (!clienteSeleccionado) return showError('Cliente Requerido', 'Debes seleccionar un cliente para registrar la venta.');
        if (metodoPago === 'EFECTIVO' && (!montoRecibido || parseFloat(montoRecibido) < total)) {
            return showError('Pago Insuficiente', 'El monto recibido es menor al total.');
        }
        setIsLoading(true);
        const data = { cliente_id: clienteSeleccionado, metodo_pago: metodoPago, total,
            productos: carrito.map(item => ({ id: item.id, cantidad: item.cantidad, nombre: item.nombre, precio: item.precio })),
            monto_recibido: metodoPago === 'EFECTIVO' ? parseFloat(montoRecibido) : metodoPago === 'PUNTOS' ? 0 : total };
        try {
            const result = await createSale(data);
            if (!result.success) return showError('Error', result.error || 'Error desconocido al procesar venta.');
            setMessages({ success: '¡Venta registrada correctamente!\n📧 Ticket enviado.', subSuccess: metodoPago === 'EFECTIVO' ? `💰 Cambio: $${cambio.toFixed(2)}` : `Folio: ${result.folio}`, error: '', errorTitle: '' });
            toggleModal('success', true); setCarrito([]); setMontoRecibido(''); setClienteSeleccionado(''); setBusquedaCliente('');
            setRecargarHistorial(current => current + 1); await cargarDatos();
        } catch (error) { console.error(error); showError('Error', 'Error al conectar con el servidor.'); }
        finally { setIsLoading(false); }
    }, [cargarDatos, carrito, cambio, clienteSeleccionado, metodoPago, montoRecibido, showError, toggleModal, total]);

    return { listaProductos, listaClientes, clientesFiltrados, carrito, total, clienteSeleccionado, setClienteSeleccionado,
        busquedaCliente, setBusquedaCliente, mostrarDropdown, setMostrarDropdown, dropdownRef, metodoPago, setMetodoPago,
        montoRecibido, setMontoRecibido, cambio, isLoading, recargarHistorial, productoAEditar, messages, modals,
        toggleModal, cargarDatos, agregarAlCarrito, abrirEditar, confirmarEliminacionDB, ejecutarEliminacionDB,
        pedirConfirmacionCarrito, confirmarBorrarCarrito, seleccionarCliente, procesarVenta };
}


