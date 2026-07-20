import React from 'react';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useEntrenadorLogin } from '../../../hooks/useEntrenadorLogin';
import { InputCorreo, InputContraseña } from '../../InputsLogin';

function EntrenadorLogin() {
  /** Instancia del hook para la lógica de login del entrenador */
  const { email, setEmail, password, setPassword, showPassword, setShowPassword, error, isLoading, handleSubmit } = useEntrenadorLogin();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/fitdata-logo.png" alt="FitData Logo" className="h-20 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl font-bold text-white mb-2">Portal de Entrenador</h1>
          <p className="text-slate-400">Inicia sesión con tu usuario y contraseña</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputCorreo correo={email} establecerCorreo={setEmail} />
            <InputContraseña contraseña={password} establecerContraseña={setPassword} mostrarContraseña={showPassword} establecerMostrarContraseña={setShowPassword} estaCargando={isLoading} />

            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
              {isLoading ? (<><div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>Ingresando...</>) : (<><LogIn size={20} />Ingresar al Portal</>)}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-slate-400 hover:text-white transition-colors text-sm flex items-center justify-center gap-2"><ArrowLeft size={16} />Volver al inicio</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntrenadorLogin;
