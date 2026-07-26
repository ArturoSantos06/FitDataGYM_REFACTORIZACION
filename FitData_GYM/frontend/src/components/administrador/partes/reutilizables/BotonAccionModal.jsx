const CLASES = {
  cancelar: 'px-5 py-2.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors',
  confirmar: 'px-5 py-2.5 bg-linear-to-r from-green-600 to-teal-500 hover:from-green-500 hover:to-teal-400 text-white rounded-lg font-bold shadow-lg transition-transform hover:scale-105',
};

function BotonAccionModal({ variante = 'confirmar', onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={CLASES[variante]}>
      {children ?? (variante === 'cancelar' ? 'Cancelar' : null)}
    </button>
  );
}

export default BotonAccionModal;
