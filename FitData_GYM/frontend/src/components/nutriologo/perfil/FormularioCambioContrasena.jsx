import { ArrowLeft, Lock } from 'lucide-react';
import useCambioContrasena from '../hooks/useCambioContrasena';
import CampoPerfil from './CampoPerfil';

export default function FormularioCambioContrasena({ alRegresar }) {
  const {
    formulario,
    cargando,
    error,
    exito,
    manejarCambio,
    manejarEnvio,
  } = useCambioContrasena();

  return (
    <div className="w-full max-w-2xl animate-in rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl fade-in slide-in-from-bottom-4 duration-300 md:p-8">
      <div className="mb-8 flex items-center gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={alRegresar}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          type="button"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Cambiar contraseña</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-6">
        <CampoPerfil
          etiqueta="Contraseña actual"
          Icono={Lock}
          tipo="password"
          nombre="contrasenaActual"
          valor={formulario.contrasenaActual}
          alCambiar={manejarCambio}
        />
        <CampoPerfil
          etiqueta="Nueva contraseña"
          Icono={Lock}
          tipo="password"
          nombre="nuevaContrasena"
          valor={formulario.nuevaContrasena}
          alCambiar={manejarCambio}
        />
        <CampoPerfil
          etiqueta="Confirmar nueva contraseña"
          Icono={Lock}
          tipo="password"
          nombre="confirmacion"
          valor={formulario.confirmacion}
          alCambiar={manejarCambio}
        />

        {error && (
          <div className="rounded-lg border border-red-700 bg-red-900/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        {exito && (
          <div className="rounded-lg border border-emerald-700 bg-emerald-900/20 p-3 text-sm text-emerald-400">
            {exito}
          </div>
        )}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={alRegresar}
            className="w-1/3 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-all hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            disabled={cargando}
            type="submit"
            className="w-2/3 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500 active:scale-95 disabled:opacity-50"
          >
            {cargando ? 'Actualizando...' : 'Actualizar contraseña'}
          </button>
        </div>
      </form>
    </div>
  );
}
