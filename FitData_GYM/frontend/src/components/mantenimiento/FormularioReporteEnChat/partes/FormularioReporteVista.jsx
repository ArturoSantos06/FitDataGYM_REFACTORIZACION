import { memo } from 'react';
import { TIPOS_IMAGEN_ACEPTADOS } from '../contenido';

function FormularioReporteVista({
  maquinas,
  maquinaId,
  onCambioMaquina,
  descripcion,
  onCambioDescripcion,
  onCambioArchivo,
  error,
  enviando,
  onCancel,
  onSubmit,
}) {
  return (
    <form onSubmit={onSubmit} className="mb-2 space-y-2 rounded-xl border border-slate-600 bg-slate-900/70 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-cyan-200">Reportar maquina descompuesta</p>

      <select
        value={maquinaId}
        onChange={onCambioMaquina}
        className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none"
      >
        <option value="">Selecciona una maquina</option>
        {maquinas.map((maquina) => (
          <option key={maquina.id} value={maquina.id}>
            {maquina.nombre}
          </option>
        ))}
      </select>

      <textarea
        value={descripcion}
        onChange={onCambioDescripcion}
        rows={3}
        placeholder="Describe la falla..."
        className="w-full rounded-lg border border-slate-600 bg-slate-950 px-3 py-2 text-sm text-slate-100 outline-none placeholder:text-slate-400"
      />

      <input
        type="file"
        accept={TIPOS_IMAGEN_ACEPTADOS}
        onChange={onCambioArchivo}
        className="w-full rounded-lg border border-dashed border-slate-600 bg-slate-950 px-3 py-2 text-xs text-slate-300"
      />

      {error && <p className="rounded-lg border border-rose-400/30 bg-rose-500/15 px-2 py-1 text-xs text-rose-200">{error}</p>}

      <div className="flex items-center justify-end gap-2">
        {typeof onCancel === 'function' && (
          <button type="button" onClick={onCancel} className="rounded-lg border border-slate-500 px-3 py-1.5 text-xs font-semibold text-slate-200">
            Cancelar
          </button>
        )}
        <button
          type="submit"
          disabled={enviando}
          className="rounded-lg bg-cyan-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {enviando ? 'Enviando...' : 'Enviar reporte'}
        </button>
      </div>
    </form>
  );
}

export default memo(FormularioReporteVista);
