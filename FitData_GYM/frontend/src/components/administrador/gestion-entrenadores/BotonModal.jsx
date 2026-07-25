const VARIANT_CLASSES = {
  primary: 'bg-green-600 hover:bg-green-700 font-bold',
  secondary: 'bg-slate-700 hover:bg-slate-600 font-medium',
};

const BotonModal = ({
  children,
  type = 'button',
  variant = 'primary',
  disabled = false,
  onClick,
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant] || VARIANT_CLASSES.primary}`}
  >
    {children}
  </button>
);

export default BotonModal;
