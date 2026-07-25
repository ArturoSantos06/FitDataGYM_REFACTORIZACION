import { ArrowLeft, Eye, EyeOff, Lock, LogIn, User } from 'lucide-react';

function CampoCorreo({ correo, establecerCorreo }) {
  return <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">Correo</label>
    <div className="relative">
      <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
      <input type="email" value={correo} onChange={(evento) => establecerCorreo(evento.target.value)}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder="entrenador@fitdata.gym" required />
    </div>
  </div>;
}

function CampoContrasena({ contrasena, establecerContrasena, mostrarContrasena, establecerMostrarContrasena, cargando }) {
  return <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">Contraseña</label>
    <div className="relative">
      <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
      <input type={mostrarContrasena ? 'text' : 'password'} value={contrasena}
        onChange={(evento) => establecerContrasena(evento.target.value)}
        className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 pr-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        placeholder="••••••••" required />
      <button type="button" onClick={() => establecerMostrarContrasena((actual) => !actual)} disabled={cargando}
        className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-500 hover:text-slate-300 disabled:opacity-50"
        aria-label={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        title={mostrarContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
        {mostrarContrasena ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  </div>;
}

function FormularioInicioSesionEntrenador({ iniciarSesion, ...estado }) {
  return <form onSubmit={iniciarSesion} className="space-y-6">
    <CampoCorreo {...estado} />
    <CampoContrasena {...estado} />
    {estado.error && <div className="bg-red-900/20 border border-red-500 rounded-lg p-3"><p className="text-red-400 text-sm">{estado.error}</p></div>}
    <button type="submit" disabled={estado.cargando}
      className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
      {estado.cargando ? <><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />Ingresando...</> : <><LogIn size={20} />Ingresar al Portal</>}
    </button>
    <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"><ArrowLeft size={16} />Volver al inicio</a>
  </form>;
}

export default FormularioInicioSesionEntrenador;
