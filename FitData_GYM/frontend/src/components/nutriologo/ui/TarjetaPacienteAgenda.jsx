import React from 'react';
import { User, Activity, ChevronRight } from 'lucide-react';

export default function TarjetaPacienteAgenda({ 
  id, 
  nombre, 
  apellido, 
  edad, 
  colorFondo, 
  alAbrirExpediente 
}) {
  return (
    <div className="bg-[#122033] rounded-3xl border border-slate-800 p-6 hover:border-cyan-500/30 transition-all group shadow-lg relative flex flex-col h-full min-h-[260px]">
      <div className="absolute top-4 right-6">
        <span className="text-[11px] font-mono font-black text-cyan-300 block uppercase">
          ID: {id.slice(0, 8).toUpperCase()}
        </span>
      </div>

      <div className="flex justify-between items-start mb-6 pt-2">
        <div 
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl" 
          style={{ backgroundColor: colorFondo }}
        >
          <User size={28} strokeWidth={2.5} />
        </div>
        <Activity size={22} className="text-slate-700 group-hover:text-cyan-400/60 transition-colors" />
      </div>

      <h3 className="text-xl font-bold mb-1 truncate uppercase leading-none flex-1">
        {nombre} <br />
        <span className="text-sm opacity-60 font-medium">
          {apellido ? apellido : "SIN APELLIDO"}
        </span>
      </h3>

      <div className="mb-6 mt-2">
        <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase tracking-widest">
          {edad ? `${edad} AÑOS` : "SIN EDAD"}
        </span>
      </div>

      <button
        onClick={alAbrirExpediente}
        className="mt-auto w-full py-4 rounded-2xl bg-linear-to-r from-purple-500 to-blue-400 font-black text-[10px] tracking-[0.2em] uppercase transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2"
      >
        EXPEDIENTE <ChevronRight size={14} />
      </button>
    </div>
  );
}