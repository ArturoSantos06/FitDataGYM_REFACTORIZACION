import { ArrowLeft } from 'lucide-react';

function EncabezadoFormularioPerfil({
  guardando = false,
  onVolver,
}) {
  return (
    <header className="mb-8 flex items-center gap-4 border-b border-slate-800 pb-4">
      <button
        type="button"
        onClick={onVolver}
        disabled={guardando}
        aria-label="Volver al menú del perfil"
        className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ArrowLeft
          size={24}
          aria-hidden="true"
        />
      </button>

      <div>
        <h2 className="text-2xl font-bold text-white">
          Datos del entrenador
        </h2>

        <p className="text-sm text-slate-400">
          Actualiza tu perfil y tu información de acceso
        </p>
      </div>
    </header>
  );
}

export default EncabezadoFormularioPerfil;