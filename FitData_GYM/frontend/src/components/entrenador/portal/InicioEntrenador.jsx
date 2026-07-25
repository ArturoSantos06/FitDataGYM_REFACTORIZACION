import TarjetaInformativaEntrenador from './componentes/TarjetaInformativaEntrenador';

const tarjetasInformativas = [
  {
    etiqueta: 'Misión',
    titulo: 'Nuestro Propósito',
    descripcion: 'Acompañar a cada alumno con planes de entrenamiento personalizados, seguimiento constante y una atención profesional que impulse resultados reales de forma segura.',
    claseBorde: 'border-cyan-800/40',
    claseSombra: 'hover:shadow-cyan-900/20',
  },
  {
    etiqueta: 'Visión',
    titulo: 'Nuestra Meta',
    descripcion: 'Ser el equipo de entrenamiento referente en FitData GYM, destacando por disciplina, innovación y transformación integral de nuestros alumnos.',
    claseBorde: 'border-blue-800/40',
    claseSombra: 'hover:shadow-blue-900/20',
  },
];

function InicioEntrenador() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 text-gray-100 animate-fade-in">
      <div className="mb-10 mt-4">
        <img src="/fitdata-logo.png" alt="FitData GYM Logo" className="mx-auto h-24 md:h-32 mb-6 drop-shadow-lg" />
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-blue-400 to-teal-400 tracking-tight leading-tight mb-2">
          Portal del Entrenador
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-3">GESTIONA Y POTENCIA A TUS ALUMNOS</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
        {tarjetasInformativas.map((tarjeta) => (
          <TarjetaInformativaEntrenador key={tarjeta.etiqueta} {...tarjeta} />
        ))}
      </div>
    </div>
  );
}

export default InicioEntrenador;
