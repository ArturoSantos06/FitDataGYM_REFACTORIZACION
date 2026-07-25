import TarjetaInformativa from './inicio/TarjetaInformativa';

export default function InicioNutri() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center text-gray-100 animate-fade-in">
      <div className="mb-10 mt-4">
        <img
          src="/fitdata-logo.png"
          alt="Logotipo de FitData Nutrición"
          className="mx-auto mb-6 h-24 drop-shadow-lg md:h-32"
        />
        <h1 className="mb-2 bg-linear-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-5xl font-extrabold leading-tight tracking-tight text-transparent md:text-6xl">
          Portal del Nutriólogo
        </h1>
        <p className="mt-3 text-xl font-medium uppercase tracking-wide text-gray-400 md:text-2xl">
          Transforma vidas a través de la nutrición
        </p>
      </div>
      <div className="grid w-full max-w-5xl gap-10 md:grid-cols-2">
        <TarjetaInformativa
          tema="esmeralda"
          etiqueta="Misión"
          titulo="Nuestro Propósito"
          descripcion="Guiar a cada paciente hacia sus objetivos de bienestar mediante planes de alimentación personalizados, basados en evidencia científica y adaptados a su estilo de vida."
        />
        <TarjetaInformativa
          tema="teal"
          etiqueta="Visión"
          titulo="Nuestra Meta"
          descripcion="Ser el laboratorio de nutrición referente en FitData GYM, destacando por la educación nutricional, el seguimiento preciso y la salud integral a largo plazo."
        />
      </div>
    </div>
  );
}
