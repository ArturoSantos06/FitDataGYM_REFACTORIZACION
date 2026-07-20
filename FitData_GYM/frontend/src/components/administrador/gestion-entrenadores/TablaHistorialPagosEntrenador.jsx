import { ReceiptText } from 'lucide-react';
import { useMemo } from 'react';
import { obtenerEstadoVenta, obtenerMetodoPagoVenta, obtenerMontoVenta } from './utilidadesGestionEntrenadores';

function formatearFecha(value) {
  if (!value) return 'Sin fecha';
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? 'Sin fecha' : date.toLocaleDateString('es-MX');
}

function TablaHistorialPagosEntrenador({
  ventas,
  servicios,
  onCompletarVentaServicio,
  idVentaServicioCompletando,
}) {
  const clientesPorClave = useMemo(() => {
    const clientes = new Map();
    servicios.forEach((service) => {
      if (service.clientId) clientes.set(String(service.clientId).trim().toLowerCase(), service);
      if (service.clientEmail) clientes.set(String(service.clientEmail).trim().toLowerCase(), service);
    });
    return clientes;
  }, [servicios]);

  const obtenerCliente = (sale) => {
    const id = sale?.clientId || sale?.cliente_id || sale?.cliente || sale?.cliente_auth_uid;
    const email = sale?.clientEmail || sale?.cliente_email || sale?.clienteEmail || sale?.cliente_email_override;
    const service = clientesPorClave.get(String(id || '').trim().toLowerCase())
      || clientesPorClave.get(String(email || '').trim().toLowerCase());
    const nameFromEmail = String(email || '').split('@')[0];

    return {
      name: sale?.clientName || sale?.clienteNombre || sale?.cliente_nombre_override
        || sale?.cliente_username || service?.clientName || nameFromEmail || 'Cliente',
      email: email || service?.clientEmail || 'Sin correo',
    };
  };

  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ReceiptText size={22} className="text-cyan-300" />
          Historial de Pagos de Clientes ({ventas.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Fecha</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Cliente</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Entrenador</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Método</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Monto</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Estado</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {ventas.length === 0 ? (
              <tr><td colSpan="7" className="text-center py-8 text-gray-400">No hay pagos de servicios de entrenamiento registrados.</td></tr>
            ) : ventas.map((sale) => {
              const status = obtenerEstadoVenta(sale);
              const client = obtenerCliente(sale);
              const amount = obtenerMontoVenta(sale);
              return (
                <tr key={sale.id} className="hover:bg-gray-700/20 transition-colors">
                  <td className="py-4 px-6 text-gray-300 text-sm">{formatearFecha(sale.createdAt || sale.fecha || sale.assignedAt)}</td>
                  <td className="py-4 px-6"><p className="text-white font-semibold">{client.name}</p><p className="text-gray-400 text-xs">{client.email}</p></td>
                  <td className="py-4 px-6 text-purple-300 text-sm font-medium">{sale.trainer_name || sale.trainerName || 'Entrenador'}</td>
                  <td className="py-4 px-6 text-gray-300 text-sm">{obtenerMetodoPagoVenta(sale)}</td>
                  <td className="py-4 px-6 text-emerald-400 font-bold">${amount.toLocaleString('es-MX')} MXN</td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${status === 'completed' ? 'bg-green-900/50 text-green-300 border border-green-600' : 'bg-yellow-900/50 text-yellow-300 border border-yellow-600'}`}>
                      {status === 'completed' ? 'Completado' : 'Pendiente'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {status === 'pending' ? (
                      <button
                        type="button"
                        onClick={() => onCompletarVentaServicio?.(sale)}
                        disabled={idVentaServicioCompletando === sale.id}
                        className="px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {idVentaServicioCompletando === sale.id ? 'Completando...' : 'Marcar completado'}
                      </button>
                    ) : <span className="text-xs text-gray-400">Sin acción</span>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaHistorialPagosEntrenador;
