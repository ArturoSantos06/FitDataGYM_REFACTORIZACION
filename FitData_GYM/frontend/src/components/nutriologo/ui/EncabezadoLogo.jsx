import React from 'react';

export function EncabezadoLogo({ titulo, subtitulo }) {
  return (
    <div className="text-center mb-8">
      <img src="/fitdata-logo.png" alt="FitData Logo" className="h-20 mx-auto mb-4 opacity-90" />
      <h1 className="text-3xl font-bold text-white mb-2">{titulo}</h1>
      {subtitulo && <p className="text-slate-400">{subtitulo}</p>}
    </div>
  );
}