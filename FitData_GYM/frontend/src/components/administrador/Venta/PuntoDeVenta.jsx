import React, { useState } from 'react';
import TarjetaProducto from '../partes/TarjetaProducto/TarjetaProducto';
import TicketVenta from './TicketVenta';
import { usePuntoDeVenta } from '../hooks/usePuntoDeVenta';
import ModalNuevoProducto from '../../modales/ModalNuevoProducto';
import ModalEditarProducto from '../../modales/ModalEditarProducto';
import HistorialVentas from '../HistorialVentas/HistorialVentas';
import ModalConfirmacion from '../../modales/ModalConfirmacion';
import ModalExito from '../../modales/ModalExito';
import ErrorModal from '../../modales/ErrorModal';

function PuntoDeVenta() {
    const venta = usePuntoDeVenta();
    const [mostrarNuevoProducto, setMostrarNuevoProducto] = useState(false);
    const { listaProductos, productoAEditar, messages, modals, toggleModal, cargarDatos,
        confirmarEliminacionDB, ejecutarEliminacionDB, confirmarBorrarCarrito, recargarHistorial } = venta;

    return <div className="p-4 md:p-8 bg-slate-900 min-h-screen text-white">
        <ModalConfirmacion isOpen={modals.deleteProduct} onClose={() => toggleModal('deleteProduct', false)} onConfirm={ejecutarEliminacionDB}
            title="¿Eliminar Producto?" message="Esta acción eliminará el producto del inventario permanentemente." />
        <ModalConfirmacion isOpen={modals.deleteCart} onClose={() => toggleModal('deleteCart', false)} onConfirm={confirmarBorrarCarrito}
            title="¿Quitar del carrito?" message="¿Estás seguro de que quieres quitar este producto de la venta actual?" />
        <ModalExito isOpen={modals.success} onClose={() => toggleModal('success', false)} title="¡Venta Exitosa!"
            message={messages.success} subMessage={messages.subSuccess} />
        <ErrorModal isOpen={modals.error} onClose={() => toggleModal('error', false)} title={messages.errorTitle} message={messages.error} />

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500 uppercase">Punto de Venta</h1>
        <div className="text-center mb-8"><button onClick={() => setMostrarNuevoProducto(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg font-bold shadow-lg transition-all">+ NUEVO PRODUCTO</button></div>
        <ModalNuevoProducto isOpen={mostrarNuevoProducto} onClose={() => setMostrarNuevoProducto(false)} onProductoCreado={cargarDatos} />
        <ModalEditarProducto isOpen={modals.edit} onClose={() => toggleModal('edit', false)} producto={productoAEditar} onProductoActualizado={cargarDatos} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2"><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {listaProductos.map(producto => <TarjetaProducto key={producto.id} producto={producto} onAgregar={venta.agregarAlCarrito} onEditar={venta.abrirEditar} onEliminar={confirmarEliminacionDB} />)}
            </div>{!listaProductos.length && <p className="text-center text-slate-500 mt-10 text-xl italic">No hay productos disponibles.</p>}</div>
            <TicketVenta venta={venta} />
        </div>
        <HistorialVentas reloadTrigger={recargarHistorial} />
    </div>;
}

export default PuntoDeVenta;
