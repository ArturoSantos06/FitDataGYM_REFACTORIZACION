import { memo } from 'react';
import { TIPOS_IMAGEN_ACEPTADOS } from '../../contenido';

function FormularioAltaMaquinaVista({ totalPendientes, nombreMaquina, onCambioNombre, onCambioArchivo, guardando, error, ok, onSubmit }) {
  return (
    <div className="rounded-2xl border border-cyan-500/20 bg-slate-900/70 p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-xl font-black text-slate-100">Catalogo de maquinas</h3>
        <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-200">
          Pendientes: {totalPendientes}
        </span>
      </div>

      <form className="grid gap-3 md:grid-cols-3" onSubmit={onSubmit}>
        <input
          value={nombreMaquina}
          onChange={onCambioNombre}
          placeholder="Ej. Caminadora #3"
          className="rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400"
        />

        <input
          type="file"
          accept={TIPOS_IMAGEN_ACEPTADOS}
          onChange={onCambioArchivo}
          className="rounded-xl border border-dashed border-slate-600 bg-slate-950 px-4 py-3 text-sm text-slate-300"
        />

        <button
          type="submit"
          disabled={guardando}
          className="rounded-xl bg-cyan-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {guardando ? 'Subiendo...' : 'Agregar maquina'}
        </button>
      </form>

      {error && <p className="mt-3 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm font-medium text-rose-200">{error}</p>}
      {ok && <p className="mt-3 rounded-xl border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-sm font-medium text-emerald-200">{ok}</p>}
    </div>
  );
}

export default memo(FormularioAltaMaquinaVista);
