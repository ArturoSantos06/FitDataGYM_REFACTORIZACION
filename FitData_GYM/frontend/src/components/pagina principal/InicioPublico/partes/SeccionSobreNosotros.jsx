import { memo } from 'react';

function SeccionSobreNosotros() {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide uppercase">
            Sobre <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Nosotros</span>
          </h2>
          <div className="w-20 h-1 bg-cyan-500 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-1 bg-linear-to-r from-cyan-400 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>

              <img
                src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070"
                alt="Zona de pesas y equipamiento"
                className="relative rounded-xl shadow-2xl w-full h-64 md:h-[500px] object-cover transition-all duration-500"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 space-y-8 md:space-y-10">
            <div className="flex gap-4 md:gap-6 items-start group">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-cyan-400 transition-colors">
                  <svg className="w-6 h-6 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 8h3v8H3zM18 8h3v8h-3z" />
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 12h10" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  Equipamiento de Última Generación
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Contamos con una amplia zona de peso libre, máquinas biomecánicas y equipos de cardio con monitoreo de
                  rendimiento para potenciar tu entrenamiento.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-start group">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-purple-400 transition-colors">
                  <svg className="w-6 h-6 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4z" />
                    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  Tu Seguridad y Confort
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Entrena con tranquilidad gracias a nuestro sistema de cámaras y guardia 24/7, además de duchas privadas con
                  agua caliente siempre disponibles.
                </p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 items-start group">
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center border border-gray-700 group-hover:border-blue-400 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" strokeWidth="2" />
                    <line x1="3" y1="9" x2="21" y2="9" strokeWidth="2" />
                    <rect x="6" y="12" width="6" height="4" strokeWidth="2" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  Membresías a tu Medida
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                  Elige cómo entrenar con planes flexibles como FitData Flex, pases de día o el descuento especial para
                  estudiantes FitData Study.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(SeccionSobreNosotros);
