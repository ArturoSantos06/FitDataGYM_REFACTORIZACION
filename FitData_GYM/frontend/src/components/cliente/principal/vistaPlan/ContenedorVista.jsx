import { ArrowLeft } from 'lucide-react';

function ContenedorVista({ backTarget, backLabel, onNavigate, children }) {
  return (
    <div className="w-full animate-fade-in">
      <button
        type="button"
        onClick={() => onNavigate(backTarget)}
        className="mb-6 flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={20} />
        <span className="font-bold">{backLabel}</span>
      </button>
      {children}
    </div>
  );
}

export default ContenedorVista;
