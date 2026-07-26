import { memo } from 'react';
import TarjetaServicio from './TarjetaServicio';
import useTarjetasVolteadas from '../hooks/useTarjetasVolteadas';
import { SERVICIOS } from '../contenido';

function SeccionServicios() {
  const { flippedCards, toggleFlip } = useTarjetasVolteadas();

  return (
    <section id="services" className="py-24 bg-gray-800 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-wide uppercase">
            Nuestros <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Servicios</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICIOS.map((servicio, index) => (
            <TarjetaServicio
              key={servicio.title}
              servicio={servicio}
              volteada={flippedCards.includes(index)}
              onToggle={() => toggleFlip(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(SeccionServicios);
