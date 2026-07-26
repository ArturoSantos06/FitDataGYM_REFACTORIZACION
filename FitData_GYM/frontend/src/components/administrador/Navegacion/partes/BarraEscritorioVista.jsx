import { memo } from 'react';
import EnlaceNavegacion from './EnlaceNavegacion';
import GrupoDesplegableEscritorioVista from './GrupoDesplegableEscritorioVista';
import BotonCerrarSesion from './reutilizables/BotonCerrarSesion';

function BarraEscritorioVista({ enlaces, pathname, onNavigate, onLogout }) {
  return (
    <>
      <div className="hidden lg:flex flex-1 items-center justify-center gap-1.5 xl:gap-2 min-w-0 py-1">
        {enlaces.map((item) =>
          item.tipo === 'grupo' ? (
            <GrupoDesplegableEscritorioVista key={item.label} label={item.label} enlaces={item.enlaces} onNavigate={onNavigate} />
          ) : (
            <EnlaceNavegacion key={item.to} to={item.to} label={item.label} pathname={pathname} onNavigate={onNavigate} />
          )
        )}
      </div>

      <div className="hidden lg:flex shrink-0 pl-2">
        <BotonCerrarSesion variante="escritorio" onClick={onLogout} />
      </div>
    </>
  );
}

export default memo(BarraEscritorioVista);
