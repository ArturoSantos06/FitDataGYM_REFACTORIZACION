import { memo } from 'react';

function TarjetaServicio({ servicio, volteada, onToggle }) {
  return (
    <div onClick={onToggle} className="group relative h-64 cursor-pointer" style={{ perspective: '1000px' }}>
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${volteada ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d', transform: volteada ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        <div
          className="absolute w-full h-full bg-gray-900 border border-gray-700 p-8 rounded-xl hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 flex flex-col items-center justify-center text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className={`mb-4 transition-colors duration-300 ${servicio.color} text-gray-400 group-hover:scale-110 transform`}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={servicio.icon}></path>
            </svg>
          </div>

          <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-3 group-hover:text-white transition-colors">
            {servicio.title}
          </h3>

          <div className="w-8 h-0.5 bg-gray-600 group-hover:bg-cyan-400 transition-all duration-300 group-hover:w-12"></div>

          <p className="text-xs text-gray-500 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">Click para más info</p>
        </div>

        <div
          className="absolute w-full h-full bg-linear-to-br from-cyan-900/80 to-gray-900 border border-cyan-500/50 p-6 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.2)] flex flex-col items-center justify-center text-center backface-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h3 className="text-lg font-bold text-cyan-400 uppercase tracking-wider mb-4">{servicio.title}</h3>
          {servicio.esLista ? (
            <div className="text-gray-200 text-sm leading-relaxed text-left">
              <ul className="space-y-1 list-disc list-inside">
                {servicio.description.map((item) => (
                  <li key={item.destacado}>
                    <strong>{item.destacado}</strong> {item.texto}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-200 text-sm leading-relaxed">{servicio.description}</p>
          )}
          <p className="text-xs text-gray-400 mt-4">Click para regresar</p>
        </div>
      </div>
    </div>
  );
}

export default memo(TarjetaServicio);
