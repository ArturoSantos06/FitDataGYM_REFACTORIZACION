import { memo } from 'react';

function BloqueConceptos({ titulo, conceptos, columnas = 'md:grid-cols-2 lg:grid-cols-3' }) {
  return (
    <div className="bg-gray-900/50 border border-cyan-500/30 rounded-lg p-8">
      <h4 className="text-xl font-bold text-cyan-400 mb-6">{titulo}</h4>
      <div className={`grid grid-cols-1 ${columnas} gap-4`}>
        {conceptos.map((concepto) => (
          <div key={concepto} className="flex items-start gap-3">
            <span className="text-cyan-400 mt-1">▹</span>
            <span className="text-gray-300 text-sm">{concepto}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(BloqueConceptos);
