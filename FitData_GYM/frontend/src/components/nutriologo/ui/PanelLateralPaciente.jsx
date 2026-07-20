import React from 'react';
import { X, User, ClipboardEdit } from 'lucide-react';

export function PanelLateralPaciente({ miembro, notaPrevia, setNotaPrevia, onClose }) {
  return (
    <div className="w-full md:w-72 p-6 bg-[#101827] border-r border-slate-800/50 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-black text-xl tracking-tight italic text-white uppercase">
          FIT<span className="text-cyan-400">DATA</span>
        </h2>
        <button onClick={onClose} className="p-2 bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center text-center mb-6 p-5 bg-slate-900/50 rounded-3xl border border-slate-800 shadow-inner">
        <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white mb-3 shadow-xl" style={{ backgroundColor: miembro?.displayColor }}>
          <User size={30} />
        </div>
        <div className="text-base font-black text-white uppercase leading-tight">
          {miembro?.nombre} <br />
          <span className="text-cyan-400 text-xs font-bold opacity-80">{miembro?.apellido}</span>
        </div>
        <div className="mt-2 px-3 py-1 bg-slate-800/80 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-700">
          {miembro?.edad ? `${miembro.edad} AÑOS` : "EDAD N/A"}
        </div>
      </div>

      <div className="flex-1 flex flex-col space-y-3">
        <label className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.2em] flex items-center gap-2 ml-1">
          <ClipboardEdit size={12} /> Notas de seguimiento
        </label>
        <textarea
          value={notaPrevia}
          onChange={(e) => setNotaPrevia(e.target.value)}
          placeholder="Escribe las notas antes de agendar..."
          className="w-full flex-1 min-h-[220px] bg-[#0f172a] border border-slate-800 rounded-2xl p-4 text-slate-200 text-sm outline-none focus:border-cyan-500/50 transition-all resize-none shadow-inner font-medium"
        />
      </div>
    </div>
  );
}