import { memo } from 'react';

function BotonEnviarRegistro({ cargando, textoCargando, texto }) {
  return (
    <button
      type="submit"
      disabled={cargando}
      className={`w-full rounded-lg bg-linear-to-r from-fuchsia-600 via-violet-600 to-cyan-600 px-5 py-3.5 text-white font-black tracking-wide shadow-xl transition-all hover:brightness-110 active:scale-[0.99] flex justify-center items-center gap-2 ${cargando ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {cargando ? (
        <>
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>{textoCargando}</span>
        </>
      ) : (
        texto
      )}
    </button>
  );
}

export default memo(BotonEnviarRegistro);
