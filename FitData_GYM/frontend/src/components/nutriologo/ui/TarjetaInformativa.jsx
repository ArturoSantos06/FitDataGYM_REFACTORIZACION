import React from 'react';

function TarjetaInformativa({ etiqueta, titulo, descripcion, tema = 'esmeralda' }) {
  const estilosTema = {
    esmeralda: {
      borde: 'border-emerald-800/40',
      sombraHover: 'hover:shadow-emerald-900/20',
      textoEtiqueta: 'text-emerald-300',
    },
    teal: {
      borde: 'border-teal-800/40',
      sombraHover: 'hover:shadow-teal-900/20',
      textoEtiqueta: 'text-teal-300',
    }
  };

  const clasesActivas = estilosTema[tema] || estilosTema.esmeralda;

  return (
    <div className={`bg-slate-800 p-8 rounded-xl shadow-xl border ${clasesActivas.borde} hover:shadow-2xl ${clasesActivas.sombraHover} transition-all duration-300 transform hover:-translate-y-1`}>
      <p className={`text-sm uppercase tracking-[0.2em] ${clasesActivas.textoEtiqueta} font-bold mb-2`}>
        {etiqueta}
      </p>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        {titulo}
      </h2>
      <p className="text-gray-300 leading-relaxed text-lg">
        {descripcion}
      </p>
    </div>
  );
}

export default TarjetaInformativa;