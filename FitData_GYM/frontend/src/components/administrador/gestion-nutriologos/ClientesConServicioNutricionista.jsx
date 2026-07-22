import { Users } from 'lucide-react';
import ServicioNutricionRow from './ServicioNutricionRow';
import TablaGestion from './TablaGestion';

const COLUMN_HEADERS = ['Cliente', 'Nutriólogo', 'Estado', 'Fecha de asignación', 'Acciones'];

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

      <TablaGestion
        caption="Clientes con Servicio de Nutriólogo"
        columnHeaders={COLUMN_HEADERS}
        rows={serviciosNutricion}
        emptyMessage="No hay clientes con servicio de nutriólogo."
        renderRow={(servicio) => (
          <ServicioNutricionRow
            key={servicio.id}
            servicio={servicio}
            idClienteDesvinculando={idClienteDesvinculando}
            onDesvincularCliente={onDesvincularCliente}
          />
        )}
      />
    </section>
  );
}

export default ClientesConServicioNutricionista;
