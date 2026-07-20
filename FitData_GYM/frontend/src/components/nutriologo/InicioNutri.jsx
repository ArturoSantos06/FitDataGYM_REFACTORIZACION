import React from 'react';
import TarjetaInformativa from './ui/TarjetaInformativa';

function InicioNutri() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center p-6 text-gray-100 animate-fade-in">
      
      {/* Logo y Bienvenida */}
      <div className="mb-10 mt-4">
        <img 
          src="/fitdata-logo.png" 
          alt="FitData Nutrition Logo" 
          className="mx-auto h-24 md:h-32 mb-6 drop-shadow-lg" 
        />
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 tracking-tight leading-tight mb-2">
          Portal del Nutriólogo
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mt-3 tracking-wide uppercase font-medium">
          Transforma vidas a través de la nutrición
        </p>
      </div>

      {/* Tarjetas de Misión y Visión */}
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl w-full">
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

export default InicioNutri;