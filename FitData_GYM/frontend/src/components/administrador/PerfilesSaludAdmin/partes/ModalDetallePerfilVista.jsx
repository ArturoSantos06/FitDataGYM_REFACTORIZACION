import { memo } from 'react';
import Dato from './DatoVista';

function ModalDetallePerfilVista({ perfil, onCerrar }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-xl p-6 relative">
        <button onClick={onCerrar} className="absolute top-3 right-3 text-slate-400 hover:text-white text-2xl">
          ✕
        </button>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white">{perfil.memberName || 'Sin nombre'}</h2>
          {perfil.userIdDisplay && <p className="text-sm text-slate-400 mt-1 font-mono">ID: {perfil.userIdDisplay}</p>}
        </div>
        <div className="space-y-3 text-sm">
          <div className="grid grid-cols-2 gap-3">
            <Dato etiqueta="Edad">{perfil.age ?? '—'}</Dato>
            <Dato etiqueta="Condición del Corazón">{perfil.heart_condition ? '✓ Sí' : '✗ No'}</Dato>
            <Dato etiqueta="Presión Alta">{perfil.high_blood_pressure ? '✓ Sí' : '✗ No'}</Dato>
            <Dato etiqueta="Lesiones Físicas Recientes">{perfil.recent_injuries ? '✓ Sí' : '✗ No'}</Dato>
            <Dato etiqueta="Medicamentos">{perfil.medications ? '✓ Sí' : '✗ No'}</Dato>
          </div>
          <div>
            <p className="text-slate-400 text-xs mb-2">Información adicional</p>
            <div className="bg-purple-950/40 border border-purple-700/40 rounded-lg p-3 text-purple-200 whitespace-pre-wrap text-xs max-h-40 overflow-y-auto">
              {perfil.additional_info || 'Sin información adicional'}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onCerrar}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-semibold transition-all"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(ModalDetallePerfilVista);
