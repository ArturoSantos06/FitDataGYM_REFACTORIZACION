import { memo } from 'react';

function FilaAsistenciaVista({ asistencia }) {
  return (
    <div className="bg-slate-700/40 hover:bg-slate-700/60 p-3 rounded-lg border border-slate-600/50 transition-all">
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shrink-0 border border-slate-700"
          style={{ backgroundColor: asistencia.miembro_avatar_color || '#1D4ED8' }}
        >
          {asistencia.miembro_nombre.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{asistencia.miembro_nombre}</h3>
          <div className="text-xs text-slate-400 space-y-0.5 mt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span>
                🕐 {new Date(asistencia.fecha_hora_entrada).toLocaleDateString('es-MX')}{' '}
                {new Date(asistencia.fecha_hora_entrada).toLocaleTimeString('es-MX', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {asistencia.fecha_hora_salida ? (
                <span>
                  → 🚪{' '}
                  {new Date(asistencia.fecha_hora_salida).toLocaleTimeString('es-MX', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              ) : (
                <span className="text-green-400 font-medium">● En el gym</span>
              )}
            </div>
            <p className="text-blue-400 font-semibold text-xs">⏱ {asistencia.tiempo_en_gym}</p>
          </div>
        </div>

        <div className="shrink-0">
          {asistencia.acceso_permitido ? (
            <span className="inline-block bg-green-500/30 text-green-300 px-2 py-1 rounded-md text-xs font-bold border border-green-500/50">
              ✓
            </span>
          ) : (
            <span className="inline-block bg-red-500/30 text-red-300 px-2 py-1 rounded-md text-xs font-bold border border-red-500/50">
              ✗
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(FilaAsistenciaVista);
