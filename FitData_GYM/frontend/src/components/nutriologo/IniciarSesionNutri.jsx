import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useNutriSesion } from './hooks/useNutriSesion';
import { EncabezadoLogo } from './ui/EncabezadoLogo';
import { EntradaTexto } from './ui/EntradaTexto';
import { BotonPrincipal } from './ui/BotonPrincipal';

function IniciarSesionNutri({ onLogin }) {
  const navigate = useNavigate();
  const {
    email, setEmail,
    password, setPassword,
    error, isLoading,
    showPassword, togglePassword,
    handleLogin
  } = useNutriSesion(onLogin);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        {/* Usamos tu nuevo componente modular */}
        <EncabezadoLogo 
          titulo="Portal de Nutriólogos" 
          subtitulo="Ingresa con tu cuenta profesional" 
        />

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Input Modular de Email */}
            <EntradaTexto
              label="Correo Electrónico"
              icono={Mail}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />

            {/* Input Modular de Contraseña con elemento derecho */}
            <EntradaTexto
              label="Contraseña"
              icono={Lock}
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              elementoDerecha={
                <button
                  type="button"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  onClick={togglePassword}
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />

            {/* Error */}
            {error && (
              <div className="bg-red-900/20 border border-red-500 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Botón Modular */}
            <BotonPrincipal
              type="submit"
              estaCargando={isLoading}
              textoCarga="Ingresando..."
              icono={LogIn}
            >
              Iniciar Sesión
            </BotonPrincipal>

          </form>

          {/* Volver */}
          <div className="mt-6 text-center">
            <button
              onClick={() => navigate('/')}
              className="text-slate-400 hover:text-white flex items-center justify-center gap-2 mx-auto transition-colors"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </button>
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

export default IniciarSesionNutri;