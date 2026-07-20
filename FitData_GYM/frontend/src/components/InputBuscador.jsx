import React from 'react';
import { Search } from 'lucide-react';

/** Entrada de búsqueda para alumnos en la vista del entrenador */
export function InputBuscador({ terminoBusqueda, establecerTerminoBusqueda }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 mb-6">
      <label className="block text-sm text-slate-300 mb-2">Buscar por matrícula o nombre completo</label>
      <div className="relative">
        <Search size={18} className="absolute left-3 top-3.5 text-slate-500" />
        <input type="text" value={terminoBusqueda} onChange={(e) => establecerTerminoBusqueda(e.target.value)} placeholder="Ej. 1024 o Juan Pérez" className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" />
      </div>
    </div>
  );
}
