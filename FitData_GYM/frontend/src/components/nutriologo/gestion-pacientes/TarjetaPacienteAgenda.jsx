import { Activity, ChevronRight, User } from 'lucide-react';

export default function TarjetaPacienteAgenda({ miembro, alAbrirExpediente }) {
  const idVisible = String(miembro.id || '').slice(0, 8).toUpperCase();

  return (
    <div className="group relative flex h-full min-h-[260px] flex-col rounded-3xl border border-slate-800 bg-[#122033] p-6 shadow-lg transition-all hover:border-cyan-500/30">
      <div className="absolute top-4 right-6">
        <span className="block font-mono text-[11px] font-black text-cyan-300 uppercase">
          ID: {idVisible}
        </span>
      </div>

      <div className="mb-6 flex items-start justify-between pt-2">
        <div className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl ${miembro.claseColorAvatar}`}>
          <User size={28} strokeWidth={2.5} />
        </div>
        <Activity
          size={22}
          className="text-slate-700 transition-colors group-hover:text-cyan-400/60"
        />
      </div>

      <h3 className="mb-1 flex-1 truncate text-xl leading-none font-bold uppercase">
        {miembro.nombre} <br />
        <span className="text-sm font-medium opacity-60">
          {miembro.apellido || 'SIN APELLIDO'}
        </span>
      </h3>
      <div className="mt-2 mb-6">
        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-black tracking-widest text-slate-400 uppercase">
          {miembro.edad ? `${miembro.edad} AÑOS` : 'SIN EDAD'}
        </span>
      </div>

      <button
        type="button"
        onClick={alAbrirExpediente}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-purple-500 to-blue-400 py-4 text-[10px] font-black tracking-[0.2em] uppercase transition-all hover:brightness-110 active:scale-95"
      >
        Expediente <ChevronRight size={14} />
      </button>
    </div>
  );
}
