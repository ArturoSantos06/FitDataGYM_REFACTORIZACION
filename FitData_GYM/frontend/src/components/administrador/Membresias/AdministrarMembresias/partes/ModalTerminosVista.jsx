import { memo } from 'react';
import ContenedorModal from '../../../partes/reutilizables/ContenedorModal';
import BotonAccionModal from '../../../partes/reutilizables/BotonAccionModal';

function ModalTerminosVista({ abierto, onCerrar }) {
  return (
    <ContenedorModal abierto={abierto} anchoMaximo="max-w-2xl" className="text-left">
      <button onClick={onCerrar} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition-colors">
        ✕
      </button>

      <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 mb-6">
        Términos y Condiciones
      </h3>

      <div className="space-y-6 text-gray-300 text-sm leading-relaxed">
        {TERMINOS.map((seccion, i) => (
          <div key={i} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
            <h4 className="text-lg font-bold text-white mb-2">{seccion.titulo}</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              {seccion.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <BotonAccionModal variante="confirmar" onClick={onCerrar}>
          Cerrar
        </BotonAccionModal>
      </div>
    </ContenedorModal>
  );
}

export default memo(ModalTerminosVista);