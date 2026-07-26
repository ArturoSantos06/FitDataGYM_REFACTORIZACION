import { memo } from 'react';
import { DIRECCION_GYM, FOOTER_NAV_ITEMS } from '../contenido';

function PiePagina() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6 tracking-wide uppercase">Sobre Nosotros</h3>
            <p className="text-gray-400 leading-relaxed text-sm mb-4">
              Somos FitData GYM, tu aliado en el camino hacia una vida más saludable y activa.
            </p>
            <p className="text-gray-400 leading-relaxed text-sm">
              Nos apasiona ayudarte a alcanzar tus objetivos de fitness con instalaciones de primera clase y un ambiente
              motivador. ¡Únete a nuestra comunidad y transforma tu vida hoy mismo!
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6 tracking-wide uppercase">Información de Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-gray-400 text-sm">
                <span className="text-cyan-400 mr-3 mt-1">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span>{DIRECCION_GYM}</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="text-cyan-400 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                  </svg>
                </span>
                <span>fitdatagym@gmail.com</span>
              </li>
              <li className="flex items-center text-gray-400 text-sm">
                <span className="text-cyan-400 mr-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                  </svg>
                </span>
                <span>+52 (981) 185-2169</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold text-cyan-400 mb-6 tracking-wide uppercase">Navegación</h3>
            <ul className="space-y-3 text-sm">
              {FOOTER_NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 flex items-center group"
                  >
                    <span className="text-cyan-500 mr-2 text-xs group-hover:mr-3 transition-all">❯</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-xs">
            &copy; 2025 <span className="text-white font-bold">FitData GYM</span>. Todos los derechos reservados.
            <span className="mx-2">|</span>
            <a
              href="/equipo"
              className="text-cyan-600 hover:text-cyan-400 transition-colors cursor-pointer underline decoration-transparent hover:decoration-cyan-400"
            >
              Designed by FitData Team
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default memo(PiePagina);
