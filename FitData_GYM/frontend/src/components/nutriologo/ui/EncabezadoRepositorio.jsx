import React from 'react';

export default function EncabezadoRepositorio({ totalPacientes, totalArchivos }) {
  return (
    <section className="rounded-3xl border border-slate-700/70 bg-linear-to-br from-slate-900 via-slate-850 to-slate-900 p-6 shadow-2xl shadow-cyan-950/20">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Repositorio Digital de Dietas</h1>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-cyan-200">Pacientes</p>
            <p className="mt-1 text-2xl font-bold text-white">{totalPacientes}</p>
          </div>
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3">
            <p className="text-xs uppercase tracking-wide text-emerald-200">Archivos</p>
            <p className="mt-1 text-2xl font-bold text-white">{totalArchivos}</p>
          </div>
        </div>
      </div>
    </section>
  );
}