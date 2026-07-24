import React, { useState } from 'react';
import TarjetaProducto from './TarjetaProducto';
import CentroFacturacion from './CentroFacturacion';
import HistorialCompras from './HistorialCompras';
import { useTiendaData } from './useTiendaData';

const SECTION_TABS = [
  { id: 'productos', label: 'Catálogo' },
  { id: 'historial', label: 'Historial' },
  { id: 'facturacion', label: 'Centro Facturación' },
];

function Tienda() {
  const [activeSection, setActiveSection] = useState('productos');
  const { products, sales, loading, error } = useTiendaData();

  if (loading) {
    return <div className="text-slate-400">Cargando tienda...</div>;
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-2 rounded-full bg-slate-900/80 border border-slate-700 p-1">
        {SECTION_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveSection(tab.id)}
            className={`rounded-full text-sm font-semibold py-2 transition-colors ${
              activeSection === tab.id
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
        {activeSection === 'productos' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <TarjetaProducto key={product.id} {...product} />
            ))}
            {products.length === 0 && (
              <div className="col-span-full text-slate-400">
                No hay productos disponibles.
              </div>
            )}
          </div>
        )}

        {activeSection === 'historial' && <HistorialCompras sales={sales} />}

        {activeSection === 'facturacion' && (
          <CentroFacturacion ventasIniciales={sales} />
        )}
      </div>
    </div>
  );
}

export default Tienda;
