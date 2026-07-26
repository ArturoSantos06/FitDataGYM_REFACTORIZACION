import { createPortal } from 'react-dom';

function ContenedorModal({ abierto, anchoMaximo = 'max-w-md', className = '', children }) {
  if (!abierto) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className={`bg-slate-900 border rounded-2xl p-6 ${anchoMaximo} w-full shadow-2xl text-center ${className}`}>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default ContenedorModal;
