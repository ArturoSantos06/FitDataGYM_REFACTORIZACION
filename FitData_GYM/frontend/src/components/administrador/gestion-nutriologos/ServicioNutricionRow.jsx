import { Unlink } from 'lucide-react';
import {
  formatAssignedDate,
  getStatusClassName,
  getStatusLabel,
} from './utilidadesClientesNutricion';

function ServicioNutricionRow({
  servicio,
  idClienteDesvinculando,
  onDesvincularCliente,
}) {
  const {
    clientId,
    clientName,
    clientEmail,
    nutritionistName,
    status,
    assignedAt,
  } = servicio;
  const estaDesvinculando = idClienteDesvinculando === clientId;

  return (
    <tr className="hover:bg-gray-700/20 transition-colors">
      <td className="py-4 px-6">
        <p className="text-white font-semibold">{clientName}</p>
        <p className="text-gray-400 text-xs">{clientEmail}</p>
      </td>
      <td className="py-4 px-6 text-cyan-300 font-medium text-sm">
        {nutritionistName}
      </td>
      <td className="py-4 px-6">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusClassName(status)}`}>
          {getStatusLabel(status)}
        </span>
      </td>
      <td className="py-4 px-6 text-gray-300 text-sm">
        {formatAssignedDate(assignedAt)}
      </td>
      <td className="py-4 px-6">
        <button
          type="button"
          onClick={() => onDesvincularCliente(servicio)}
          disabled={!clientId || estaDesvinculando}
          aria-label={`Desvincular a ${clientName || 'este cliente'}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Unlink size={16} aria-hidden="true" />
          {estaDesvinculando ? 'Desvinculando...' : 'Desvincular'}
        </button>
      </td>
    </tr>
  );
}

export default ServicioNutricionRow;
