import { memo } from 'react';

function TarjetaPerfilVista({ perfil, onVerDetalle }) {
  const fecha = perfil.updatedAt?.toDate?.() || perfil.createdAt?.toDate?.() || new Date();
  const fechaStr = fecha.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  const condiciones = [];
  if (perfil.heart_condition) condiciones.push('❤️ Corazón');
  if (perfil.high_blood_pressure) condiciones.push('🩸 Presión');
  if (perfil.recent_injuries) condiciones.push('🤕 Lesiones');
  if (perfil.medications) condiciones.push('💊 Medicamentos');

  return (
    <div className="bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700 rounded-lg p-4 flex items-center justify-between transition-all group">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <p className="text-white font-semibold text-lg">{perfil.memberName || 'Sin nombre'}</p>
          {perfil.userIdDisplay && (
            <span className="text-xs font-mono bg-slate-700 text-cyan-400 px-2.5 py-1 rounded-full border border-slate-600">
              ID: {perfil.userIdDisplay}
            </span>
          )}
          {perfil.age && (
            <span className="text-xs font-semibold bg-slate-700 text-violet-300 px-2.5 py-1 rounded-full">
              {perfil.age} años
            </span>
          )}
        </div>
        {condiciones.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {condiciones.map((c) => (
              <span key={c} className="text-xs px-2 py-1 bg-red-950/40 text-red-300 rounded-full border border-red-800/30">
                {c}
              </span>
            ))}
          </div>
        )}
        <p className="text-xs text-slate-400">Actualizado: {fechaStr}</p>
      </div>
      <button
        onClick={onVerDetalle}
        className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all"
      >
        Ver Detalle
      </button>
    </div>
  );
}

export default memo(TarjetaPerfilVista);
