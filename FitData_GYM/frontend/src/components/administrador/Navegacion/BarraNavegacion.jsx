import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BarraEscritorioVista from './partes/BarraEscritorioVista';
import MenuMovilVista from './partes/MenuMovilVista';
import { NAV_DESKTOP, NAV_MOVIL } from './contenido';

function BarraNavegacion({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [gruposAbiertos, setGruposAbiertos] = useState(() => new Set());
  const { pathname } = useLocation();

  const closeMenu = () => setIsOpen(false);

  const toggleGrupo = (id) => {
    setGruposAbiertos((actuales) => {
      const siguientes = new Set(actuales);
      if (siguientes.has(id)) siguientes.delete(id);
      else siguientes.add(id);
      return siguientes;
    });
  };

  return (
    <nav className="sticky top-3 z-50 px-3 md:px-4">
      <div className="w-full max-w-screen-2xl mx-auto rounded-2xl border border-white/10 bg-slate-900/85 text-white shadow-[0_18px_50px_-22px_rgba(0,0,0,0.75)] backdrop-blur-xl overflow-visible">
        <div className="flex items-center justify-between gap-3 h-16 px-4 lg:px-5">
          <Link
            to="/admin"
            onClick={closeMenu}
            className="flex items-center gap-2 text-lg font-bold tracking-wider text-transparent bg-clip-text bg-linear-to-r from-purple-400 via-blue-400 to-teal-400 shrink-0"
          >
            <img src="/fitdata-logo.png" alt="Logo" className="h-7 w-auto" />
            <span className="whitespace-nowrap leading-none text-sm lg:text-base">FitData GYM</span>
          </Link>

          <BarraEscritorioVista enlaces={NAV_DESKTOP} pathname={pathname} onNavigate={closeMenu} onLogout={onLogout} />

          <div className="lg:hidden flex items-center shrink-0">
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <MenuMovilVista
          enlaces={NAV_MOVIL}
          pathname={pathname}
          gruposAbiertos={gruposAbiertos}
          onToggleGrupo={toggleGrupo}
          onNavigate={closeMenu}
          onLogout={() => { closeMenu(); onLogout(); }}
        />
      )}
    </nav>
  );
}

export default BarraNavegacion;
