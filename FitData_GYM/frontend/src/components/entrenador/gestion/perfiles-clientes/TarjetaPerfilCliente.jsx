import {
  formatearFechaPerfil,
  obtenerNombreMiembro,
} from './perfilesClientesUtils';

function TarjetaPerfilCliente({ perfil, onSeleccionar }) {
  const requiereAtencion =
    perfil.recent_injuries || perfil.heart_condition;

  return (
    <div className="flex items-center justify-between rounded-lg border border-slate-700 bg-slate-800/50 p-4 transition-colors hover:bg-slate-800">
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="font-semibold text-white">
            {obtenerNombreMiembro(perfil)}
          </p>

          {perfil.userIdDisplay && (
            <span className="rounded border border-slate-600 bg-slate-700 px-2 py-0.5 font-mono text-xs text-cyan-400">
              ID: {perfil.userIdDisplay}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-3">
          <p className="text-[11px] text-slate-400">
            Actualizado: {formatearFechaPerfil(perfil)}
          </p>

          {requiereAtencion && (
            <span className="rounded-full border border-red-800/50 bg-red-900/50 px-2 py-0.5 text-[10px] font-medium uppercase text-red-300">
              ⚠️ Atención
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onSeleccionar(perfil)}
        className="rounded-lg bg-purple-600 px-3 py-1.5 text-sm font-bold text-white shadow-lg shadow-purple-900/20 transition-all hover:bg-purple-500"
      >
        Ver ficha
      </button>
    </div>
  );
}

export default TarjetaPerfilCliente;