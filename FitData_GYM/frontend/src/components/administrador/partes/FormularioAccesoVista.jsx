import { memo, useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import Boton from './reutilizables/Boton';
import Etiqueta from './reutilizables/Etiqueta';

function FormularioAccesoVista({ error, isLoading, onSubmit, onVolver }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="px-8 py-8 mt-4 text-left bg-gray-800 shadow-2xl rounded-xl max-w-md w-full border border-gray-700 relative">

      <Boton
        variante="fantasma"
        onClick={onVolver}
        className="absolute top-4 left-4 text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Volver
      </Boton>

      <div className="text-center mb-6 mt-6">
        <img src="/fitdata-logo.png" alt="FitData GYM Logo" className="mx-auto h-24 w-auto mb-4 drop-shadow-lg" />
        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">Iniciar Sesión</h3>
        <p className="text-gray-400 mt-2">Acceso al Panel de Administración</p>
      </div>

      <form onSubmit={onSubmit}>
        <div className="mt-4">
          <Etiqueta>Email</Etiqueta>
          <input
            type="email"
            name="email"
            placeholder="tu@email.com"
            className="w-full px-4 py-2 mt-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            disabled={isLoading}
            required
          />
        </div>
        <div className="mt-4">
          <Etiqueta>Contraseña</Etiqueta>
          <div className="relative mt-2">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••"
              className="w-full px-4 py-2 pr-11 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isLoading}
              required
            />
            <Boton
              variante="fantasma"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isLoading}
              className="absolute inset-y-0 right-0 px-3"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </Boton>
          </div>
        </div>

        {error && <p className="text-red-400 text-sm mt-3 text-center animate-pulse">{error}</p>}

        <div className="flex items-baseline justify-between mt-6">
          <Boton isLoading={isLoading} loadingText="Entrando...">
            Entrar
          </Boton>
        </div>
      </form>
    </div>
  );
}

export default memo(FormularioAccesoVista);
