import {
  ChevronRight,
  Link2,
  UserRound,
} from 'lucide-react';
import { obtenerPartesNombre } from './agendaClientesUtils';

function TarjetaClienteAgenda({ cliente, onSeleccionar }) {
  const { nombre, apellidos } = obtenerPartesNombre(
    cliente.miembro_nombre,
  );

  return (
    <article className="relative flex min-h-60 h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-cyan-800/50 hover:shadow-cyan-900/20">
      <div className="absolute right-4 top-4 flex flex-col items-end text-[10px] font-black uppercase tracking-widest text-cyan-400">
        <span>ID: {cliente.id}</span>
        <Link2
          size={12}
          aria-hidden="true"
          className="mt-1 text-slate-600"
        />
      </div>

      <div className="flex-1">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-cyan-500 to-blue-600 shadow-inner">
          <UserRound
            size={24}
            aria-hidden="true"
            className="text-white"
          />
        </div>

        <h3 className="mb-1 text-lg font-black uppercase leading-none tracking-wide text-white">
          {nombre}
        </h3>

        <p className="mb-3 truncate text-xs font-medium uppercase text-slate-400">
          {apellidos}
        </p>

        <span className="mb-4 inline-block rounded border border-slate-700 bg-slate-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
          Sin edad
        </span>
      </div>

      <button
        type="button"
        onClick={() => onSeleccionar(cliente)}
        className="mt-auto flex w-full items-center justify-center gap-2 rounded-xl bg-[#007bff] py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
      >
        Planificar
        <ChevronRight size={17} aria-hidden="true" />
      </button>
    </article>
  );
}

export default TarjetaClienteAgenda;