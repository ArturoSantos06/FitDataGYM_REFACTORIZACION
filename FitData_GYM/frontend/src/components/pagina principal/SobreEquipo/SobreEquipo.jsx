import EncabezadoEquipo from './partes/EncabezadoEquipo';
import SeccionMiembrosEquipo from './partes/SeccionMiembrosEquipo';
import SeccionStackTecnologico from './partes/SeccionStackTecnologico';
import PiePaginaEquipo from './partes/PiePaginaEquipo';

function AboutTeam() {
  return (
    <div className="min-h-screen bg-black text-white">
      <EncabezadoEquipo />

      <div className="container mx-auto px-6 py-16">
        <SeccionMiembrosEquipo />
        <SeccionStackTecnologico />
        <PiePaginaEquipo />
      </div>
    </div>
  );
}

export default AboutTeam;
