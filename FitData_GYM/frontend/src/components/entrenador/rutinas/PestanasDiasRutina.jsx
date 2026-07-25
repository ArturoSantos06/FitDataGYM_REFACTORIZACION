import PestanaDiaRutina from './componentes/PestanaDiaRutina';

function PestanasDiasRutina({ diaActivo, diasActivos, ejerciciosPorDia, onCambiarDia }) {
  const dias = Array.isArray(diasActivos) ? diasActivos : [];
  const ejercicios = ejerciciosPorDia || {};

  return <div className="flex overflow-x-auto border-b border-slate-800 bg-slate-950 shrink-0">
    {dias.map((dia) => <PestanaDiaRutina key={dia} dia={dia} activa={diaActivo === dia}
      cantidadEjercicios={ejercicios[dia]?.length || 0} alSeleccionar={onCambiarDia} />)}
  </div>;
}

export default PestanasDiasRutina;
