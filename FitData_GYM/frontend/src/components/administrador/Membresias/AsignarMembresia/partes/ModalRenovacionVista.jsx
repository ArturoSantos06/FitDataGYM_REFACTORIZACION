import { memo } from 'react';
import ContenedorModal from '../../../partes/reutilizables/ContenedorModal';
import BotonAccionModal from '../../../partes/reutilizables/BotonAccionModal';

function ModalRenovacionVista({ datos, onConfirmar, onCancelar }) {
  return (
    <ContenedorModal abierto={Boolean(datos)} className="border-slate-600">
      <div className="mb-4 flex justify-center">
        <span className="bg-amber-500/20 text-amber-400 p-3 rounded-full text-3xl">⚠️</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Atención</h3>
      <p className="text-lg text-slate-200 mb-2 font-semibold">{datos?.message}</p>
      <p className="text-sm text-gray-400 mb-6 bg-slate-800 p-3 rounded-lg border border-slate-700">
        {datos?.detail}
        <br /><br />
        <span className="text-amber-400 font-bold">Nota: Esto reemplazará la membresía anterior.</span>
      </p>
      <div className="flex gap-3 justify-center">
        <BotonAccionModal variante="cancelar" onClick={onCancelar} />
        <BotonAccionModal variante="confirmar" onClick={onConfirmar}>Sí, Actualizar</BotonAccionModal>
      </div>
    </ContenedorModal>
  );
}

export default memo(ModalRenovacionVista);
