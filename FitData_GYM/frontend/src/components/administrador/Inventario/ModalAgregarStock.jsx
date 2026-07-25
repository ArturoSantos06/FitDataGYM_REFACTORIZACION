import { useEffect } from 'react';

function ModalAgregarStock({ product, quantity, isSaving, onChange, onClose, onSubmit }) {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && !isSaving) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isSaving, onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        className="bg-slate-900 border border-slate-600 rounded-xl p-6 w-full max-w-sm shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="agregar-stock-titulo"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <h3 id="agregar-stock-titulo" className="text-lg font-bold text-white mb-4">
          Agregar Stock a:<br />
          <span className="text-blue-400">{product.nombre}</span>
        </h3>

        <form onSubmit={onSubmit}>
          <label htmlFor="cantidad-stock" className="block text-sm text-gray-400 mb-2">
            Cantidad a ingresar:
          </label>
          <input
            id="cantidad-stock"
            type="number"
            min="1"
            step="1"
            required
            className="w-full p-3 bg-slate-800 border border-slate-500 rounded text-white focus:ring-2 focus:ring-blue-500 outline-none mb-6"
            value={quantity}
            onChange={onChange}
            autoFocus
            disabled={isSaving}
          />
          <div className="flex gap-3">
            <button type="button" onClick={onClose} disabled={isSaving} className="flex-1 py-2 bg-slate-700 text-white rounded hover:bg-slate-600 disabled:opacity-50">
              Cancelar
            </button>
            <button type="submit" disabled={isSaving} className="flex-1 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 font-bold disabled:opacity-50">
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalAgregarStock;
