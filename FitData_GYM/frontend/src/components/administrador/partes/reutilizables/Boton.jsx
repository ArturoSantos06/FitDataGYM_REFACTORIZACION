import { memo } from 'react';

function Boton({
  variante = 'primario',
  type,
  isLoading = false,
  loadingText = 'Cargando...',
  disabled = false,
  className = '',
  children,
  ...props
}) {
  const tipoBoton = type || (variante === 'fantasma' ? 'button' : 'submit');

  if (variante === 'fantasma') {
    return (
      <button
        type={tipoBoton}
        disabled={disabled}
        className={`flex items-center gap-1 text-gray-400 hover:text-white transition-colors disabled:opacity-50 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      type={tipoBoton}
      disabled={isLoading || disabled}
      className={`px-6 py-3 text-lg text-white font-bold rounded-lg shadow-lg w-full flex justify-center items-center gap-3 transition-all ${isLoading
          ? 'bg-gray-600 cursor-not-allowed opacity-70'
          : 'bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default memo(Boton);
