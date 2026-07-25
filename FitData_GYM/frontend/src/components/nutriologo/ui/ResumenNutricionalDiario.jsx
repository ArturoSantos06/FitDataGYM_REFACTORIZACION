import React from 'react';

export default function ResumenNutricionalDiario({ calorias, proteina, carbohidratos, grasas }) {
  return (
    <div className="mb-4 rounded-xl border border-slate-700 bg-slate-800/50 p-3">
      <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
        Resumen Diario
      </h4>
      <div className="grid grid-cols-2 gap-2 text-center text-xs">
        <div className="rounded border border-slate-700 bg-slate-800 p-2">
          <span className="block text-slate-400">Calorías</span>
          <span className="font-bold text-cyan-400">{calorias}</span>
        </div>
        <div className="rounded border border-slate-700 bg-slate-800 p-2">
          <span className="block text-slate-400">Proteína</span>
          <span className="font-bold text-white">{proteina}g</span>
        </div>
        <div className="rounded border border-slate-700 bg-slate-800 p-2">
          <span className="block text-slate-400">Carbs</span>
          <span className="font-bold text-white">{carbohidratos}g</span>
        </div>
        <div className="rounded border border-slate-700 bg-slate-800 p-2">
          <span className="block text-slate-400">Grasas</span>
          <span className="font-bold text-white">{grasas}g</span>
        </div>
      </div>
    </div>
  );
}