import React from 'react';
import { ShoppingBag } from 'lucide-react';

const FALLBACK_IMAGE = 'https://placehold.co/300x300/0f172a/64748b?text=Sin+Imagen';

const formatPrice = (price) => {
  const numericPrice = Number.parseFloat(price);

  return Number.isFinite(numericPrice) ? numericPrice.toFixed(2) : '0.00';
};

const TarjetaProducto = ({ title, price, stock, image }) => {
  const normalizedStock = Number(stock) || 0;
  const hasStock = normalizedStock > 0;
  const displayTitle = title || 'Producto sin nombre';
  const displayPrice = formatPrice(price);

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <article className="group relative bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-slate-600 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1">
      <div className="absolute top-3 right-3 z-10">
        {hasStock ? (
          <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/20 backdrop-blur-md">
            {normalizedStock} DISPONIBLES
          </span>
        ) : (
          <span className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2 py-1 rounded-full border border-red-500/20 backdrop-blur-md">
            AGOTADO
          </span>
        )}
      </div>

      <div className="aspect-square relative overflow-hidden">
        <img
          src={image || FALLBACK_IMAGE}
          alt={displayTitle}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110 ${!hasStock ? 'grayscale opacity-50' : ''}`}
        />

        {!image && (
          <div className="absolute inset-0 flex items-center justify-center text-slate-700 pointer-events-none">
            <div className="w-16 h-16 opacity-20"><ShoppingBag size={64} /></div>
          </div>
        )}

      </div>

      <div className="p-4">
        <h2 className="text-slate-200 font-bold text-sm mb-1 line-clamp-2 group-hover:text-cyan-400 transition-colors min-h-10">{displayTitle}</h2>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Precio</span>
            <span className="text-lg font-black text-white">${displayPrice}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default TarjetaProducto;
