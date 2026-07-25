import { AlertCircle, Unlink } from 'lucide-react';
import { normalizarEtiquetaTipoServicio } from '../utilidadesGestionEntrenadores';

function formatearFecha(value) {
  if (!value) return 'N/A';
  const date = typeof value?.toDate === 'function' ? value.toDate() : new Date(value);
  return Number.isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString('es-MX');
}

function obtenerMontoServicio(service) {
  const amount = Number(service.price ?? service.monto ?? service.amount ?? 0);
  return Number.isFinite(amount) ? amount : 0;
}

function TablaServiciosEntrenamiento({
  servicios,
  obtenerEtiquetaEstado,
  onDesvincularCliente,
  idClienteDesvinculando,
}) {
  return (
    <div className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <AlertCircle size={24} className="text-blue-400" />
          Servicios de Entrenamiento Contratados ({servicios.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Cliente</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Entrenador</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Tipo de Servicio</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Asignado</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Estado</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Monto</th>
              <th scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {servicios.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12">
                  <div className="flex flex-col items-center gap-3 text-gray-400">
                    <AlertCircle size={48} />
                    <p className="text-lg font-semibold">No hay servicios de entrenamiento registrados</p>
                  </div>
                </td>
              </tr>
            ) : servicios.map((service) => (
              <tr key={service.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="py-4 px-6">
                  <p className="text-white font-semibold">{service.clientName || 'Cliente'}</p>
                  <p className="text-gray-400 text-xs">{service.clientEmail || 'Sin correo'}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="text-purple-300 font-medium text-sm">{service.trainerName || 'Entrenador'}</span>
                </td>
                <td className="py-4 px-6">
                  <span className="text-blue-300 font-medium text-sm">
                    {normalizarEtiquetaTipoServicio(service.serviceType, 'N/D')}
                  </span>
                </td>
                <td className="py-4 px-6 text-gray-300 text-sm font-mono">
                  {formatearFecha(service.assignedAt || service.createdAt || service.updatedAt)}
                </td>
                <td className="py-4 px-6">{obtenerEtiquetaEstado(service)}</td>
                <td className="py-4 px-6 text-green-400 font-bold">
                  ${obtenerMontoServicio(service).toLocaleString('es-MX')} MXN
                </td>
                <td className="py-4 px-6">
                  <button
                    type="button"
                    aria-label={`Desvincular a ${service.clientName || 'cliente'}`}
                    onClick={() => onDesvincularCliente?.(service)}
                    disabled={!service.clientId || idClienteDesvinculando === service.clientId}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Unlink size={16} />
                    {idClienteDesvinculando === service.clientId ? 'Desvinculando...' : 'Desvincular'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaServiciosEntrenamiento;
