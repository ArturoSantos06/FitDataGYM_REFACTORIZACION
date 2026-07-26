import { memo } from 'react';
import TarjetaTecnologia from './TarjetaTecnologia';
import BloqueConceptos from './BloqueConceptos';

function BloqueTecnologia({ tecnologia, columnasItems = 'md:grid-cols-2', columnasConceptos, className }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{tecnologia.icon}</span>
        <h3 className="text-3xl font-bold text-cyan-400">{tecnologia.title}</h3>
      </div>

      <div className={`grid grid-cols-1 ${columnasItems} gap-6 ${tecnologia.concepts ? 'mb-8' : ''}`}>
        {tecnologia.items.map((tech) => (
          <TarjetaTecnologia key={tech.name} nombre={tech.name} descripcion={tech.description} />
        ))}
      </div>

      {tecnologia.concepts && (
        <BloqueConceptos titulo={tecnologia.conceptsTitle} conceptos={tecnologia.concepts} columnas={columnasConceptos} />
      )}
    </div>
  );
}

export default memo(BloqueTecnologia);
