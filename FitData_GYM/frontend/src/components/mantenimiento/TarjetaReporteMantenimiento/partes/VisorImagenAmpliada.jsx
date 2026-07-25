import { memo } from 'react';

function VisorImagenAmpliada({ url, onCerrar }) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4" onClick={onCerrar}>
      <div className="relative max-h-[90vh] max-w-5xl" onClick={(event) => event.stopPropagation()}>
        <button
          type="button"
          onClick={onCerrar}
          className="absolute right-2 top-2 rounded-lg bg-black/60 px-3 py-1 text-sm font-semibold text-white"
        >
          Cerrar
        </button>
        <img src={url} alt="Vista ampliada" className="max-h-[90vh] max-w-full rounded-xl object-contain" />
      </div>
    </div>
  );
}

export default memo(VisorImagenAmpliada);
