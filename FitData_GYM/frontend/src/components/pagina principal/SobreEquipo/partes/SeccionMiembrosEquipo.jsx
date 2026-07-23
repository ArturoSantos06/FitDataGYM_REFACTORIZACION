import { memo } from 'react';
import TarjetaMiembro from './TarjetaMiembro';
import { TEAM_MEMBERS } from '../contenido';

function SeccionMiembrosEquipo() {
  return (
    <section className="mb-24">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Nuestro <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-600">Equipo</span>
        </h2>
        <div className="w-20 h-1 bg-cyan-500 mx-auto rounded-full shadow-[0_0_10px_#22d3ee]"></div>
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Estudiantes apasionados por la tecnología, dedicados a crear soluciones innovadoras.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {TEAM_MEMBERS.map((miembro) => (
          <TarjetaMiembro key={miembro.name} miembro={miembro} />
        ))}
      </div>
    </section>
  );
}

export default memo(SeccionMiembrosEquipo);
