import React from 'react';
import PestanaDiaUnico from '../../PestanaDiaUnico';

function PestanasDiasRutina({ diaActivo, diasActivos, ejerciciosPorDia, onCambiarDia }) {
  return (
    <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950 shrink-0">
      {diasActivos.map((dia) => (
        <PestanaDiaUnico key={dia} dia={dia} diaActivo={diaActivo} onCambiarDia={onCambiarDia} ejerciciosPorDia={ejerciciosPorDia} />
      ))}
    </div>
  );
}

export default PestanasDiasRutina;
