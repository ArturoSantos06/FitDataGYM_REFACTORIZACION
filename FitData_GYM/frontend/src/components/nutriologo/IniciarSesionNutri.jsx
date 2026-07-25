import { ArrowLeft, Eye, EyeOff, Lock, LogIn, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BotonAcceso from './acceso/BotonAcceso';
import EncabezadoAcceso from './acceso/EncabezadoAcceso';
import { useNutriSesion } from './hooks/useNutriSesion';
import { EntradaTexto } from './ui/EntradaTexto';

export default function IniciarSesionNutri({ onLogin: alIniciarSesion }) {
  const navegar = useNavigate();
  const {
    correo,
    contrasena,
    error,
    cargando,
    mostrarContrasena,
    manejarCorreo,
    manejarContrasena,
    alternarContrasena,
    manejarInicioSesion,
  } = useNutriSesion(alIniciarSesion);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4">
      <div className="w-full max-w-md">
        <EncabezadoAcceso
          titulo="Portal de Nutriólogos"
          subtitulo="Ingresa con tu cuenta profesional"
        />
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
          <form onSubmit={manejarInicioSesion} className="space-y-6">
            <EntradaTexto
              etiqueta="Correo electrónico"
              icono={Mail}
              type="email"
              value={correo}
              onChange={manejarCorreo}
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />
            <EntradaTexto
              etiqueta="Contraseña"
              icono={Lock}
              type={mostrarContrasena ? 'text' : 'password'}
              value={contrasena}
              onChange={manejarContrasena}
              placeholder="••••••••"
              autoComplete="current-password"
              required
              elementoDerecha={
                <button
                  type="button"
                  aria-label={
                    mostrarContrasena
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                  onClick={alternarContrasena}
                  className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
                >
                  {mostrarContrasena
                    ? <EyeOff size={18} />
                    : <Eye size={18} />}
                </button>
              }
            />
            {error && (
              <div className="rounded-lg border border-red-500 bg-red-900/20 p-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}
            <BotonAcceso
              type="submit"
              cargando={cargando}
              textoCarga="Ingresando..."
              icono={LogIn}
            >
              Iniciar sesión
            </BotonAcceso>
          </form>
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navegar('/')}
              className="mx-auto flex items-center justify-center gap-2 text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft size={16} />
              Volver al inicio
            </button>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            ¿No tienes cuenta? Regístrate en recepción del gimnasio
          </p>
        </div>
      </div>
    </div>
  );
}
