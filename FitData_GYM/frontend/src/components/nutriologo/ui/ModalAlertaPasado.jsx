import React from 'react';

export function ModalAlertaPasado({ onClose }) {
  return (
    <div className="fixed inset-0 z-70 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-slate-900 p-6 shadow-2xl">
        <h3 className="text-lg font-black text-red-300 mb-2">No se puede agendar días pasados</h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          Selecciona una fecha de hoy en adelante para registrar una nueva cita.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-400 text-white font-semibold transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}