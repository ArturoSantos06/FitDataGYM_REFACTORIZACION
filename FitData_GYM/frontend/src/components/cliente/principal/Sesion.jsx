import { Link } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useSesionCliente } from '../../../hooks/useSesionCliente';

function Sesion() {
  const {
    email,
    password,
    error,
    isLoading,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
  } = useSesionCliente();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="/fitdata-logo.png" alt="FitData Logo" className="h-20 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl font-bold text-white mb-2">Portal de Clientes</h1>
          <p className="text-slate-400">Ingresa con tu cuenta de miembro</p>
        </div>

        {/* Formulario */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 pr-12 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-2.5 p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div role="alert" className="bg-red-900/20 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-sm text-center">{error}</p>
              </div>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={isLoading}
              aria-busy={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Ingresando...
                </>
              ) : (
                <>
                  <LogIn size={20} />
                  Ingresar al Portal
                </>
              )}
            </button>
          </form>

          {/* Enlace de regreso */}
          <div className="mt-6 text-center">
            <Link
              to="/"
              className="text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </Link>
          </div>
        </div>

        {/* Nota informativa */}
        <div className="mt-6 text-center">
          <p className="text-slate-500 text-sm">
            ¿No tienes cuenta? Regístrate en recepción del gimnasio
          </p>
        </div>
      </div>
    </div>
  );
}

export default Sesion;
