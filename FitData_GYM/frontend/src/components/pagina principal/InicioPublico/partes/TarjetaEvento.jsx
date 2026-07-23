import { memo } from 'react';
import { COLORES_EVENTO } from '../contenido';

function TarjetaEvento({ evento }) {
  const color = COLORES_EVENTO[evento.color];

  return (
    <div className={`flex flex-col md:flex-row${evento.invertido ? '-reverse' : ''} items-center gap-8 group`}>
      <div className="w-40 h-40 shrink-0 relative">
        <div className={`absolute inset-0 ${color.blur} rounded-full blur opacity-20 group-hover:opacity-50 transition duration-500`}></div>
        <img
          src={evento.imagen}
          alt={evento.alt}
          className={`w-full h-full object-cover rounded-full border-4 border-gray-800 ${color.borde} transition-all duration-500 relative z-10`}
        />
      </div>
      <div className={`text-center ${evento.invertido ? 'md:text-right' : 'md:text-left'}`}>
        <h4 className={`text-2xl font-bold text-white ${color.texto} transition-colors`}>{evento.titulo}</h4>
        <p className={`${color.fechaTexto} font-bold text-sm mb-3 mt-1 uppercase tracking-wider`}>{evento.fecha}</p>
        <p className="text-gray-400 leading-relaxed text-sm">{evento.descripcion}</p>
      </div>
    </div>
  );
}

export default memo(TarjetaEvento);
