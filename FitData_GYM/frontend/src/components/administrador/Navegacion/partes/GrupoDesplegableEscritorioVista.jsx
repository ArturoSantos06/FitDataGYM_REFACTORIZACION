import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

function GrupoDesplegableEscritorioVista({ label, enlaces, onNavigate }) {
  return (
    <div className="relative group">
      <button className="inline-flex h-8 items-center px-2 rounded-full text-[11px] xl:text-[12px] 2xl:text-sm font-semibold whitespace-nowrap box-border transition-all duration-200 gap-1 bg-white/5 text-gray-200 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white">
        {label}
        <ChevronDown size={15} className="group-hover:rotate-180 transition-transform" />
      </button>
      <div className="absolute left-0 top-[calc(100%-2px)] hidden group-hover:block bg-slate-950/95 border border-white/10 rounded-xl shadow-2xl py-2 min-w-max z-50 backdrop-blur-xl">
        {enlaces.map((enlace) => (
          <Link
            key={enlace.to}
            to={enlace.to}
            onClick={onNavigate}
            className="block w-full px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-white/10 hover:text-white"
          >
            {enlace.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default memo(GrupoDesplegableEscritorioVista);
