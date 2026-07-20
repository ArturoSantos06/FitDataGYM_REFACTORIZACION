import React from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

/** Entrada de correo electrónico */
export function InputCorreo({ correo, establecerCorreo }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Correo</label>
      <div className="relative">
        <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
        <input type="email" value={correo} onChange={(e) => establecerCorreo(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="entrenador@fitdata.gym" required />
      </div>
    </div>
  );
}

/** Entrada de contraseña reutilizable */
export function InputContraseña({ contraseña, establecerContraseña, mostrarContraseña, establecerMostrarContraseña, estaCargando }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
      <div className="relative">
        <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
        <input type={mostrarContraseña ? 'text' : 'password'} value={contraseña} onChange={(e) => establecerContraseña(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" required />
        <button type="button" onClick={() => establecerMostrarContraseña((prev) => !prev)} disabled={estaCargando} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-300 disabled:opacity-50" aria-label={mostrarContraseña ? 'Ocultar contraseña' : 'Mostrar contraseña'} title={mostrarContraseña ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
          {mostrarContraseña ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
