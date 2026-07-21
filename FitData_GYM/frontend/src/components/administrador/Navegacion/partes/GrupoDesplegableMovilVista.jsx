import { memo } from 'react';
import { ChevronDown } from 'lucide-react';
import EnlaceNavegacion from './EnlaceNavegacion';

function GrupoDesplegableMovilVista({ id, label, emoji, enlaces, pathname, abierto, onToggle, onNavigate }) {
  return (
    <div>
      <button
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold text-gray-200 hover:bg-gray-700 hover:text-white"
      >
        <span>{emoji} {label}</span>
        <ChevronDown size={18} className={`transition-transform ${abierto ? 'rotate-180' : ''}`} />
      </button>
      {abierto && (
        <div className="pl-4 space-y-2 mt-2 border-l-2 border-gray-700">
          {enlaces.map((enlace) => (
            <EnlaceNavegacion
              key={enlace.to}
              variante="movil"
              to={enlace.to}
              label={enlace.label}
              pathname={pathname}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(GrupoDesplegableMovilVista);
