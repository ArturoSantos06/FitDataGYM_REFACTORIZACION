function TablaProductosInventario({ productos, isLoading, onAgregar }) {
  return (
    <section className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-xl">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        📦 Stock Actual
      </h2>
      <div className="overflow-x-auto max-h-[500px] custom-scrollbar">
        <table className="w-full text-sm text-left text-gray-400">
          <thead className="text-xs text-gray-200 uppercase bg-slate-700 sticky top-0">
            <tr>
              <th scope="col" className="px-4 py-3">Producto</th>
              <th scope="col" className="px-4 py-3 text-center">Stock</th>
              <th scope="col" className="px-4 py-3 text-center">Acción</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan="3" className="text-center py-4">Cargando productos...</td></tr>
            ) : productos.length === 0 ? (
              <tr><td colSpan="3" className="text-center py-4 italic">No hay productos registrados.</td></tr>
            ) : productos.map((product) => (
              <tr key={product.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                <td className="px-4 py-3 font-medium text-white">{product.nombre}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock < 5 ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {product.stock ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    type="button"
                    onClick={() => onAgregar(product)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-bold transition-colors"
                  >
                    + Agregar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default TablaProductosInventario;
