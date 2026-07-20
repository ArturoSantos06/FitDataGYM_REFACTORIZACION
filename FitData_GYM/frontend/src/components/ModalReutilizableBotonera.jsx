import React from 'react';
import { RefreshCw, ClipboardList, Layers } from 'lucide-react';
import ModalBotonSecundario from './ModalBotonSecundario';
import ModalBotonAceptacion from './ModalBotonAceptacion';

/** Modal reutilizable con botonera de confirmación */
export function ModalReutilizableBotonera({ estaModalAbierta, establecerModalAbierta, alCancelarServicio }) {
  if (!estaModalAbierta) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-white mb-3">¿Deseas desvincular a tu entrenador?</h3>
        <p className="text-slate-400 mb-6 font-medium">
          Perderás acceso a tus rutinas personalizadas, seguimiento y chat directo con el entrenador asignado. Esta acción no se puede deshacer.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <ModalBotonSecundario alHacer={() => establecerModalAbierta(false)} etiqueta="Mantener entrenador" />
          <ModalBotonAceptacion alHacer={alCancelarServicio} etiqueta="Sí, desvincular" />
        </div>
      </div>
    </div>
  );
}