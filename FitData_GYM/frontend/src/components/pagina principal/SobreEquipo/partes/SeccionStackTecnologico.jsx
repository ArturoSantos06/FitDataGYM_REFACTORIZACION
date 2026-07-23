import { memo } from 'react';
import BloqueTecnologia from './BloqueTecnologia';
import BloqueBaseDatos from './BloqueBaseDatos';
import { TECNOLOGIAS } from '../contenido';

function SeccionStackTecnologico() {
  return (
    <section className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Stack <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Tecnológico</span>
        </h2>
        <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full shadow-[0_0_10px_#22d3ee]"></div>
      </div>

      <BloqueTecnologia tecnologia={TECNOLOGIAS.frontend} className="mb-16" />
      <BloqueTecnologia tecnologia={TECNOLOGIAS.backend} className="mb-16" />
      <BloqueBaseDatos tecnologia={TECNOLOGIAS.database} />
      <BloqueTecnologia tecnologia={TECNOLOGIAS.libraries} columnasItems="md:grid-cols-2 lg:grid-cols-3" className="mb-16" />
      <BloqueTecnologia tecnologia={TECNOLOGIAS.apis} className="mb-16" />
      <BloqueTecnologia tecnologia={TECNOLOGIAS.security} columnasConceptos="md:grid-cols-2" className="mb-16" />
      <BloqueTecnologia tecnologia={TECNOLOGIAS.deployment} />
    </section>
  );
}

export default memo(SeccionStackTecnologico);
