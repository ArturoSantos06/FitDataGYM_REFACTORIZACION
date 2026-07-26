import { memo } from 'react';
import TarjetaTecnologia from './TarjetaTecnologia';
import BloqueConceptos from './BloqueConceptos';

function BloqueBaseDatos({ tecnologia }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{tecnologia.icon}</span>
        <h3 className="text-3xl font-bold text-cyan-400">{tecnologia.title}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Base de Datos Local</h4>
          {tecnologia.local.map((tech) => (
            <TarjetaTecnologia key={tech.name} nombre={tech.name} descripcion={tech.description} tamañoTitulo="text-xl" />
          ))}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white mb-4">Base de Datos en la Nube</h4>
          <div className="space-y-4">
            {tecnologia.cloud.map((tech) => (
              <TarjetaTecnologia key={tech.name} nombre={tech.name} descripcion={tech.description} tamañoTitulo="text-xl" />
            ))}
          </div>
        </div>
      </div>

      <BloqueConceptos titulo={tecnologia.conceptsTitle} conceptos={tecnologia.concepts} />
    </div>
  );
}

export default memo(BloqueBaseDatos);
