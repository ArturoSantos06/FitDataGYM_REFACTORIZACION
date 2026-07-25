import {
  ArrowLeft,
  Lock,
} from 'lucide-react';

import CampoContrasena from './cambio-contrasena/CampoContrasena';
import useCambioContrasena from './cambio-contrasena/useCambioContrasena';

function FormularioCambioContrasenaEntrenador({
  onBack,
}) {
  const {
    formulario,
    cargando,
    error,
    exito,
    actualizarCampo,
    cambiarContrasena,
  } = useCambioContrasena();

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl duration-300 md:p-8">
      <header className="mb-6 flex items-center gap-4">
        <button
          type="button"
          onClick={() => onBack?.()}
          disabled={cargando}
          aria-label="Volver al menú del perfil"
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft
            size={22}
            aria-hidden="true"
          />
        </button>

        <h2 className="flex items-center gap-2 text-xl font-bold text-white">
          <Lock
            size={18}
            aria-hidden="true"
            className="text-emerald-400"
          />

          Cambiar contraseña
        </h2>
      </header>

      <div aria-live="polite">
        {error && (
          <div
            role="alert"
            className="mb-4 rounded-lg border border-red-700 bg-red-900/20 p-3 text-sm text-red-400"
          >
            {error}
          </div>
        )}

        {exito && (
          <div className="mb-4 rounded-lg border border-emerald-700 bg-emerald-900/20 p-3 text-sm text-emerald-400">
            {exito}
          </div>
        )}
      </div>

      <form
        onSubmit={cambiarContrasena}
        className="space-y-4"
      >
        <CampoContrasena
          id="password-actual"
          label="Contraseña actual"
          value={formulario.passwordActual}
          autoComplete="current-password"
          disabled={cargando}
          onChange={(valor) =>
            actualizarCampo(
              'passwordActual',
              valor,
            )
          }
        />

        <CampoContrasena
          id="password-nueva"
          label="Nueva contraseña"
          value={formulario.passwordNueva}
          autoComplete="new-password"
          disabled={cargando}
          minLength={6}
          onChange={(valor) =>
            actualizarCampo(
              'passwordNueva',
              valor,
            )
          }
        />

        <CampoContrasena
          id="confirmar-password"
          label="Confirmar nueva contraseña"
          value={formulario.confirmacion}
          autoComplete="new-password"
          disabled={cargando}
          minLength={6}
          onChange={(valor) =>
            actualizarCampo(
              'confirmacion',
              valor,
            )
          }
        />

        <button
          type="submit"
          disabled={cargando}
          className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {cargando
            ? 'Actualizando...'
            : 'Guardar contraseña'}
        </button>
      </form>
    </section>
  );
}

export default FormularioCambioContrasenaEntrenador;