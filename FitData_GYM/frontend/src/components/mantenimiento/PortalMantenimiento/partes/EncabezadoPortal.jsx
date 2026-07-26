import { memo } from 'react';
import { Wrench } from 'lucide-react';

function EncabezadoPortal({ vista, onCambioVista, mostrarSelector }) {
  return (
    <header className="rounded-2xl border border-cyan-500/20 bg-slate-900/90 px-4 py-4 text-white shadow-xl md:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-cyan-300" />
          <h1 className="text-2xl font-black">Mantenimiento FitData</h1>
        </div>

        {mostrarSelector && (
          <div className="inline-flex rounded-xl bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => onCambioVista('usuario')}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${vista === 'usuario' ? 'bg-cyan-600 text-white' : 'text-slate-200'}`}
            >
              Vista Usuario
            </button>
            <button
              type="button"
              onClick={() => onCambioVista('admin')}
              className={`rounded-lg px-4 py-2 text-sm font-bold transition ${vista === 'admin' ? 'bg-cyan-600 text-white' : 'text-slate-200'}`}
            >
              Vista Admin
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default memo(EncabezadoPortal);
