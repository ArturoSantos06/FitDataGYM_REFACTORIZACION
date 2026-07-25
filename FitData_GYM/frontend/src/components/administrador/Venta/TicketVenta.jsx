import React from 'react';

function TicketVenta({ venta }) {
    const { carrito, total, clientesFiltrados, clienteSeleccionado, busquedaCliente, setBusquedaCliente,
        mostrarDropdown, setMostrarDropdown, dropdownRef, seleccionarCliente, metodoPago, setMetodoPago,
        montoRecibido, setMontoRecibido, cambio, pedirConfirmacionCarrito, procesarVenta, isLoading } = venta;

    return <div className="lg:col-span-1"><div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl lg:sticky lg:top-6">
        <h3 className="text-xl font-bold text-indigo-400 border-b border-slate-700 pb-4 mb-6">Ticket de Venta</h3>
        <div className="relative mb-4" ref={dropdownRef}>
            <label className="block text-sm font-bold text-slate-400 mb-2">Cliente:</label>
            <input type="text" placeholder="Buscar cliente..." value={busquedaCliente}
                onChange={event => { setBusquedaCliente(event.target.value); setMostrarDropdown(true); if (!event.target.value) venta.setClienteSeleccionado(''); }}
                onFocus={() => setMostrarDropdown(true)} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-500" />
            {mostrarDropdown && <ul className="absolute z-50 w-full bg-slate-800 border border-slate-600 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-2xl">
                {clientesFiltrados.map(client => { const name = client.first_name ? `${client.first_name} ${client.last_name}` : client.username;
                    return <li key={client.id} onClick={() => seleccionarCliente(client.id, name)} className="p-3 hover:bg-slate-700 cursor-pointer text-white border-b border-slate-700 last:border-0"><div className="font-bold">{name}</div><div className="text-xs text-gray-400">Usuario: {client.username}</div></li>; })}
            </ul>}
        </div>
        <label className="block text-sm font-bold text-slate-400 mb-2">Pago:</label>
        <select value={metodoPago} onChange={event => setMetodoPago(event.target.value)} className="w-full p-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 outline-none">
            <option value="EFECTIVO">Efectivo</option><option value="TARJETA">Tarjeta</option><option value="TRANSFERENCIA">Transferencia</option><option value="PUNTOS">GYM-Points</option>
        </select>
        {metodoPago === 'EFECTIVO' && <div className="mt-4 p-4 bg-slate-900 rounded-lg border border-slate-600">
            <label className="block text-sm text-gray-400 mb-1 font-bold">Recibido ($):</label><input type="number" value={montoRecibido} onChange={event => setMontoRecibido(event.target.value)} placeholder="0.00" className="w-full p-2 bg-slate-800 border border-slate-500 rounded text-white text-right font-mono text-lg focus:ring-2 focus:ring-green-500 outline-none" />
            <div className="flex justify-between mt-3 pt-3 border-t border-slate-600"><span className="text-gray-300 font-bold">Cambio:</span><span className={`text-xl font-bold ${cambio < 0 ? 'text-red-400' : 'text-yellow-400'}`}>${cambio.toFixed(2)}</span></div>
        </div>}
        <div className="mt-6 border-t border-slate-700 pt-4 max-h-64 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
            {carrito.map(item => <div key={item.id} className="flex justify-between items-center bg-slate-700/30 p-3 rounded-lg border border-slate-700/50"><div><span className="font-bold text-white mr-2">{item.cantidad}x</span><span className="text-slate-300 text-sm">{item.nombre}</span></div><div className="flex items-center gap-3"><span className="font-bold text-emerald-400">${(item.precio * item.cantidad).toFixed(2)}</span><button onClick={() => pedirConfirmacionCarrito(item.id)} className="text-red-400 hover:text-red-200 font-bold">✕</button></div></div>)}
            {!carrito.length && <p className="text-center text-slate-500 py-4 italic">Carrito vacío</p>}
        </div>
        <div className="text-2xl text-right text-green-400 font-bold my-5">Total: ${total.toFixed(2)}</div>
        {metodoPago === 'PUNTOS' && <div className="text-right text-yellow-400 font-bold mb-2 text-lg">Costo en GYM-Points: {total * 2} Pts</div>}
        {metodoPago !== 'PUNTOS' && clienteSeleccionado && <div className="text-right text-emerald-400 text-sm mb-2 font-semibold">+ Ganará {Math.floor(total * 0.1)} GYM-Points</div>}
        <p className="text-right text-slate-400 text-xs mb-4">(IVA Incluido)</p>
        <button onClick={procesarVenta} disabled={isLoading || !clienteSeleccionado} className={`${isLoading || !clienteSeleccionado ? 'opacity-70 cursor-not-allowed' : ''} w-full p-4 bg-linear-to-r from-blue-600 to-cyan-500 rounded-lg text-white text-lg font-bold flex justify-center items-center gap-2`}>
            {isLoading ? 'Procesando...' : 'COBRAR'}
        </button>
    </div></div>;
}

export default TicketVenta;
