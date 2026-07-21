import { memo } from 'react';
import EnlaceNavegacion from './EnlaceNavegacion';
import GrupoDesplegableMovilVista from './GrupoDesplegableMovilVista';
import BotonCerrarSesion from './reutilizables/BotonCerrarSesion';

function MenuMovilVista({ enlaces, pathname, gruposAbiertos, onToggleGrupo, onNavigate, onLogout }) {
  return (
    <div className="lg:hidden mt-2 bg-slate-900/95 border border-white/10 rounded-2xl px-4 pt-2 pb-4 space-y-2 shadow-xl backdrop-blur-xl">
      {enlaces.map((item) =>
        item.tipo === 'grupo' ? (
          <GrupoDesplegableMovilVista
            key={item.id}
            id={item.id}
            label={item.label}
            emoji={item.emoji}
            enlaces={item.enlaces}
            pathname={pathname}
            abierto={gruposAbiertos.has(item.id)}
            onToggle={onToggleGrupo}
            onNavigate={onNavigate}
          />
        ) : (
          <EnlaceNavegacion
            key={item.to}
            variante="movil"
            to={item.to}
            label={item.label}
            emoji={item.emoji}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        )
      )}

      <div className="pt-4 border-t border-gray-700 mt-2">
        <BotonCerrarSesion variante="movil" onClick={onLogout} />
      </div>
    </div>
  );
}

export default memo(MenuMovilVista);
