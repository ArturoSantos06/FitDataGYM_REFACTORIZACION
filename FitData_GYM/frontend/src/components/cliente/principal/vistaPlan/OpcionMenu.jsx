import { ChevronRight } from 'lucide-react';

import { BASE_OPTION_CLASS } from './configuracionVistaPlan';

function OpcionMenu({ option, onNavigate }) {
  const Icon = option.icon;

  return (
    <button
      type="button"
      onClick={() => onNavigate(option.view)}
      className={`${BASE_OPTION_CLASS} ${option.hoverClass}`}
    >
      <div className="flex items-center gap-5 text-left">
        <div className={`rounded-xl p-3.5 shadow-inner transition-all ${option.iconClass}`}>
          <Icon size={28} />
        </div>
        <div className="flex flex-col">
          <span className={`${option.titleClass} text-lg font-bold`}>{option.title}</span>
          <span className="mt-0.5 text-sm text-slate-400">{option.description}</span>
        </div>
      </div>
      <ChevronRight className={`text-slate-500 ${option.arrowClass}`} size={24} />
    </button>
  );
}

export default OpcionMenu;
