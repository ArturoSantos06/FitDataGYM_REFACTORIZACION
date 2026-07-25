import BotonDiaEntrenamiento from './componentes/BotonDiaEntrenamiento';

function SelectorDiasRutina({ diasSemana, activeDays: diasActivos, toggleDay: alAlternarDia, errorDias }) {
  const dias = Array.isArray(diasSemana) ? diasSemana : [];
  const seleccionados = Array.isArray(diasActivos) ? diasActivos : [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6">
      <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-semibold">Días de entrenamiento</p>
      <div className="flex flex-wrap gap-2">
        {dias.map((dia) => <BotonDiaEntrenamiento key={dia} dia={dia}
          activo={seleccionados.includes(dia)} alAlternar={alAlternarDia} />)}
      </div>
      {errorDias && <p className="text-red-400 text-xs mt-3">{errorDias}</p>}
    </div>
  );
}

export default SelectorDiasRutina;
