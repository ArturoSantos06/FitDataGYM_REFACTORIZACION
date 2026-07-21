import { Users } from 'lucide-react';
import ServicioNutricionRow from './ServicioNutricionRow';

const COLUMN_HEADERS = [
  'Cliente',
  'Nutriólogo',
  'Estado',
  'Fecha de asignación',
  'Acciones',
];

function ClientesConServicioNutricionista({
  serviciosNutricion = [],
  idClienteDesvinculando,
  onDesvincularCliente,
}) {
  return (
    <section className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl overflow-hidden" aria-labelledby="clientes-nutricion-titulo">
      <div className="p-6 border-b border-gray-700">
        <h2 id="clientes-nutricion-titulo" className="text-xl font-bold text-white flex items-center gap-2">
          <Users size={22} className="text-cyan-300" aria-hidden="true" />
          Clientes con Servicio de Nutriólogo ({serviciosNutricion.length})
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              {COLUMN_HEADERS.map((header) => (
                <th key={header} scope="col" className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {serviciosNutricion.length === 0 ? (
              <tr>
                <td colSpan={COLUMN_HEADERS.length} className="text-center py-8 text-gray-400">
                  No hay clientes con servicio de nutriólogo.
                </td>
              </tr>
            ) : (
              serviciosNutricion.map((servicio) => (
                <ServicioNutricionRow
                  key={servicio.id}
                  servicio={servicio}
                  idClienteDesvinculando={idClienteDesvinculando}
                  onDesvincularCliente={onDesvincularCliente}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default ClientesConServicioNutricionista;
