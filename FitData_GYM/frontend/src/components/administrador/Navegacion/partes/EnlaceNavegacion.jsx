import { memo } from 'react';
import { Link } from 'react-router-dom';

const CLASES_BASE = {
  escritorio: 'inline-flex h-8 items-center px-2 rounded-full text-[11px] xl:text-[12px] 2xl:text-sm font-semibold whitespace-nowrap box-border transition-all duration-200',
  movil: 'block px-3 py-2 rounded-lg text-base font-semibold',
};

function EnlaceNavegacion({ variante = 'escritorio', to, label, emoji, pathname, onNavigate }) {
  const activo = pathname === to;
  const claseActivo = activo
    ? 'bg-linear-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20 border border-cyan-300/30'
    : 'bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white';

  return (
    <Link to={to} onClick={onNavigate} className={`${CLASES_BASE[variante]} ${claseActivo}`}>
      {emoji ? `${emoji} ` : ''}{label}
    </Link>
  );
}

export default memo(EnlaceNavegacion);
