import { memo } from 'react';

function PanelEscanerVista({
  scanning,
  onIniciarEscaneo,
  onDetenerEscaneo,
  manualCode,
  onCambioManualCode,
  onEnviarManual,
  mensaje,
  error,
}) {
  return (
    <div className="lg:col-span-1 bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/30 shadow-xl shadow-blue-500/10">
      <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">📷</span> Scanner QR
      </h2>

      <div className="mb-4 bg-blue-500/20 border border-blue-400/40 rounded-lg p-3">
        <p className="text-blue-200 text-xs text-center leading-relaxed">
          <strong>🤖 Detección Automática</strong>
          <br />
        </p>
      </div>

      {!scanning ? (
        <button
          onClick={onIniciarEscaneo}
          className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white py-3 rounded-xl font-bold text-base shadow-lg hover:shadow-blue-500/50 transition-all hover:scale-105"
        >
          📷 Iniciar Escáner
        </button>
      ) : (
        <div className="mb-4">
          <div id="qr-reader" className="rounded-xl overflow-hidden border-2 border-blue-500"></div>
          <button
            onClick={onDetenerEscaneo}
            className="w-full mt-3 bg-red-600 text-white py-2.5 rounded-xl font-bold hover:bg-red-700 transition-all"
          >
            ❌ Cerrar Escáner
          </button>
        </div>
      )}

      <div className="mt-4">
        <h3 className="text-white font-semibold mb-2 text-sm">Código manual:</h3>
        <form onSubmit={onEnviarManual} className="flex gap-2">
          <input
            type="text"
            value={manualCode}
            onChange={onCambioManualCode}
            placeholder="FD-XXXXXXXXXXXX"
            className="flex-1 bg-slate-700/50 text-white px-3 py-2.5 rounded-lg border border-slate-600 focus:border-blue-400 focus:outline-none text-sm"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-all text-sm"
          >
            ✓
          </button>
        </form>
      </div>

      {mensaje && (
        <div className="mt-4 bg-green-500/20 border border-green-400 text-green-200 p-3 rounded-lg text-sm">
          ✅ {mensaje}
        </div>
      )}
      {error && (
        <div className="mt-4 bg-red-500/20 border border-red-400 text-red-200 p-3 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

export default memo(PanelEscanerVista);
