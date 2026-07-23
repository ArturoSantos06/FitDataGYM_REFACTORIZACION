import { memo } from 'react';
import TarjetaEvento from './TarjetaEvento';
import { AVISOS_IMPORTANTES, EVENTOS } from '../contenido';

function SeccionNoticias() {
  return (
    <section id="news" className="py-24 bg-gray-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide uppercase">
            Noticias y <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Eventos</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-1/3">
            <h3 className="text-2xl font-bold mb-6 text-white">Avisos importantes</h3>
            <div className="bg-linear-to-b from-cyan-900/40 to-blue-900/20 border border-cyan-500/30 p-8 rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.1)] h-full">
              <ul className="space-y-6">
                {AVISOS_IMPORTANTES.map((item) => (
                  <li key={item} className="flex items-start group cursor-default">
                    <span className="mr-3 mt-1 text-cyan-400 group-hover:text-white transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </span>
                    <span className="text-gray-300 text-sm font-medium group-hover:text-cyan-200 transition-colors border-b border-transparent group-hover:border-cyan-500/50 pb-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-2/3 space-y-12">
            {EVENTOS.map((evento) => (
              <TarjetaEvento key={evento.titulo} evento={evento} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SeccionNoticias);
