import {
  ChevronRight,
  Dumbbell,
  User,
} from 'lucide-react';

function TarjetaClienteAgenda({
  cliente,
  onPlanificar,
}) {
  const idVisible = String(cliente.id ?? '')
    .slice(0, 8)
    .toUpperCase();

  return (
    <article className="group relative flex min-h-65 h-full flex-col rounded-3xl border border-slate-800 bg-[#122033] p-6 shadow-lg transition-all hover:border-cyan-500/30">
      <div className="absolute right-6 top-4">
        <span className="block font-mono text-[11px] font-black uppercase text-cyan-300">
          ID: {idVisible || 'N/D'}
        </span>
      </div>

      <div className="mb-6 flex items-start justify-between pt-2">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-xl"
          style={{
            backgroundColor: cliente.colorMostrado,
          }}
        >
          <User
            size={28}
            strokeWidth={2.5}
            aria-hidden="true"
          />
        </div>

        <Dumbbell
          size={22}
          aria-hidden="true"
          className="text-slate-700 transition-colors group-hover:text-cyan-400/60"
        />
      </div>

      <h3 className="mb-1 flex-1 truncate text-xl font-bold uppercase leading-none">
        {cliente.nombre || 'Sin nombre'}
        <br />

        <span className="text-sm font-medium opacity-60">
          {cliente.apellido || 'Sin apellido'}
        </span>
      </h3>

      <div className="mb-6 mt-2">
        <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-slate-400">
          {cliente.edad
            ? `${cliente.edad} años`
            : 'Sin edad'}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onPlanificar(cliente)}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-purple-500 to-blue-400 py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:brightness-110 active:scale-95"
      >
        Planificar
        <ChevronRight size={14} aria-hidden="true" />
      </button>
    </article>
  );
}

export default TarjetaClienteAgenda;