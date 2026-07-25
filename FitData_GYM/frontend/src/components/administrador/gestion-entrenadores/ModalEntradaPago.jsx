import { useEffect, useId } from 'react';
import BotonModal from './BotonModal';

const ModalEntradaPago = ({
  isOpen,
  title,
  subtitle,
  value,
  onChange,
  onClose,
  onConfirm,
  confirmLabel = 'Guardar pago',
  disabled = false,
}) => {
  const inputId = useId();
  const titleId = `${inputId}-title`;
  const subtitleId = `${inputId}-subtitle`;

  useEffect(() => {
    if (!isOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape' && !disabled) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [disabled, isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!disabled) onConfirm();
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={subtitle ? subtitleId : undefined}
        className="bg-slate-900 border border-slate-600 rounded-2xl p-6 max-w-md w-full shadow-2xl"
      >
        <h3 id={titleId} className="text-xl font-bold text-white mb-2">{title}</h3>
        {subtitle ? <p id={subtitleId} className="text-gray-400 mb-5 text-sm">{subtitle}</p> : null}

        <label htmlFor={inputId} className="block text-sm text-gray-300 mb-2">Monto a pagar</label>
        <input
          id={inputId}
          type="number"
          min="0"
          step="0.01"
          value={value ?? ''}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          autoFocus
          className="w-full bg-gray-900 border border-gray-600 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          placeholder="0.00"
        />

        <div className="flex gap-3 justify-end mt-6">
          <BotonModal
            onClick={onClose}
            disabled={disabled}
            variant="secondary"
          >
            Cancelar
          </BotonModal>
          <BotonModal
            type="submit"
            disabled={disabled}
          >
            {confirmLabel}
          </BotonModal>
        </div>
      </form>
    </div>
  );
};

export default ModalEntradaPago;
