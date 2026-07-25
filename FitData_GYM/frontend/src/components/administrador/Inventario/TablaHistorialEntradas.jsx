const dateFormatter = new Intl.DateTimeFormat('es-MX', {
  dateStyle: 'short',
  timeStyle: 'short',
});

const formatEntryDate = (value) => {
  if (!value) return 'Fecha no disponible';

  const date = value?.toDate?.() || new Date(value);
  return Number.isNaN(date.getTime()) ? 'Fecha no disponible' : dateFormatter.format(date);
};

function TablaHistorialEntradas({ historial, isLoading }) {
  return (
    <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        📋 Historial de Entradas
      </h2>
      <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-200 uppercase bg-slate-700 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3">Fecha</th>
              <th scope="col" className="px-4 py-3">Producto</th>
              <th scope="col" className="px-4 py-3 text-right">Cant.</th>
              <th scope="col" className="px-4 py-3">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="4" className="text-center py-4">Cargando historial...</td></tr>
            ) : historial.length === 0 ? (
              <tr><td colSpan="4" className="text-center py-4 italic">No hay registros aún.</td></tr>
            ) : historial.map((item) => (
              <tr key={item.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-4 py-3 text-xs">{formatEntryDate(item.fecha)}</td>
                <td className="px-4 py-3 text-white">{item.producto_nombre}</td>
                <td className="px-4 py-3 text-right text-emerald-400 font-bold">+{item.cantidad}</td>
                <td className="px-4 py-3 text-xs text-slate-500 uppercase">{item.usuario_nombre || 'Sistema'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TablaHistorialEntradas;
