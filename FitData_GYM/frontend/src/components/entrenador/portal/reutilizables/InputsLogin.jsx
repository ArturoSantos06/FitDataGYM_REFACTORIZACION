import React from 'react';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

/** aqui maestro esta el input de email */
export function InputEmail({ email, setEmail }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Correo</label>
      <div className="relative">
        <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="entrenador@fitdata.gym" required />
      </div>
    </div>
  );
}

/** esto sirve para el input de password reusado */
export function InputPassword({ password, setPassword, showPassword, setShowPassword, isLoading }) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
      <div className="relative">
        <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
        <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" placeholder="••••••••" required />
        <button type="button" onClick={() => setShowPassword((prev) => !prev)} disabled={isLoading} className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-300 disabled:opacity-50" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'} title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}
