import { ClipboardEdit, User, X } from 'lucide-react';

export default function PanelLateralPaciente({
  miembro,
  notaPrevia,
  alCambiarNota,
  alCerrar,
}) {
  return (
    <div className="flex w-full flex-col border-r border-slate-800/50 bg-[#101827] p-6 md:w-72">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight text-white uppercase italic">
          FIT<span className="text-cyan-400">DATA</span>
        </h2>
        <button
          type="button"
          onClick={alCerrar}
          className="rounded-xl bg-slate-800 p-2 text-slate-400 transition-colors hover:text-white"
          aria-label="Cerrar expediente"
        >
          <X size={20} />
        </button>
      </div>

      <div className="mb-6 flex flex-col items-center rounded-3xl border border-slate-800 bg-slate-900/50 p-5 text-center shadow-inner">
        <div className={`mb-3 flex h-16 w-16 items-center justify-center rounded-xl text-white shadow-xl ${miembro?.claseColorAvatar || 'bg-cyan-500'}`}>
          <User size={30} />
        </div>
        <div className="text-base leading-tight font-black text-white uppercase">
          {miembro?.nombre} <br />
          <span className="text-xs font-bold text-cyan-400 opacity-80">
            {miembro?.apellido}
          </span>
        </div>
        <div className="mt-2 rounded-full border border-slate-700 bg-slate-800/80 px-3 py-1 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          {miembro?.edad ? `${miembro.edad} AÑOS` : 'EDAD N/A'}
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-3">
        <label className="ml-1 flex items-center gap-2 text-[10px] font-black tracking-[0.2em] text-cyan-500 uppercase">
          <ClipboardEdit size={12} />
          Notas de seguimiento
        </label>
        <textarea
          value={notaPrevia}
          onChange={(evento) => alCambiarNota(evento.target.value)}
          placeholder="Escribe las notas antes de agendar..."
          className="min-h-[220px] w-full flex-1 resize-none rounded-2xl border border-slate-800 bg-[#0f172a] p-4 text-sm font-medium text-slate-200 shadow-inner outline-none transition-all focus:border-cyan-500/50"
        />
      </div>
    </div>
  );
}
