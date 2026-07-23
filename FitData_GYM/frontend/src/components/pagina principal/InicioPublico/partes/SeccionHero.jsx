import { memo } from 'react';
import BarraSuperior from './BarraSuperior';
import useMenuMovil from '../hooks/useMenuMovil';
import { NAV_ITEMS } from '../contenido';

function SeccionHero({ onOpenModal }) {
  const { mobileNavOpen, toggleMobileNav, handleNavClick } = useMenuMovil();

  return (
    <header id="home" className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transform scale-105"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070)' }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90"></div>
      </div>

      <BarraSuperior />

      <div className="relative z-10 text-center px-4 flex flex-col items-center animate-fade-in-up">
        <div className="mb-6">
          <img src="/fitdata-logo.png" alt="FitData Logo" className="h-32 md:h-40 mx-auto mb-4 drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2 drop-shadow-lg">
          FitData <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">GYM</span>
        </h1>

        <div className="w-24 h-1 bg-cyan-400 my-6 rounded-full shadow-[0_0_15px_#22d3ee]"></div>

        <p className="text-gray-200 text-sm md:text-lg tracking-[0.2em] uppercase mb-10 font-light drop-shadow-md">
          PROCESANDO TU TRANSFORMACIÓN
        </p>

        <button
          onClick={onOpenModal}
          className="bg-white text-black hover:bg-cyan-400 hover:text-black font-bold py-4 px-12 rounded-full text-sm md:text-base uppercase tracking-widest transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Empezar Ahora
        </button>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/5 bg-black/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="hidden sm:block">
            <ul className="flex flex-wrap justify-center items-center gap-8 md:gap-16 py-5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="cursor-pointer text-xs md:text-sm font-bold text-gray-300 hover:text-cyan-400 hover:shadow-[0_2px_0_#22d3ee] transition-all duration-300 tracking-widest uppercase pb-1"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:hidden flex items-center justify-center py-4">
            <button
              aria-label={mobileNavOpen ? 'Cerrar menú' : 'Abrir menú'}
              onClick={toggleMobileNav}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-700 bg-gray-900/60 text-gray-200 hover:text-cyan-400 hover:border-cyan-500 transition-colors"
            >
              <svg className={`w-6 h-6 ${mobileNavOpen ? 'hidden' : 'block'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg className={`w-6 h-6 ${mobileNavOpen ? 'block' : 'hidden'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
              <span className="text-xs font-bold tracking-widest uppercase">Menú</span>
            </button>
          </div>

          {mobileNavOpen && (
            <div className="sm:hidden pb-4">
              <ul className="grid grid-cols-1 gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="block w-full text-center px-4 py-3 rounded-lg border border-gray-700 bg-gray-900/70 text-gray-200 hover:text-cyan-400 hover:border-cyan-500 transition-colors text-xs font-bold tracking-widest uppercase cursor-pointer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(SeccionHero);
