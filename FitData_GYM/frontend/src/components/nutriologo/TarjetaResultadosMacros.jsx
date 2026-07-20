import React from 'react';
import { FilaNutriente } from './ui/FilaNutriente';
import { MensajeVacio } from './ui/MensajeVacio';

function TarjetaResultadosMacros({ result }) {
  if (!result) {
    return (
      <MensajeVacio 
        titulo="Resultados del paciente"
        descripcion="Completa los datos y ejecuta el cálculo para obtener los requerimientos exactos de carbohidratos, proteína y grasas."
      />
    );
  }

  return (
    <div className="rounded-2xl border border-cyan-500/30 bg-slate-900/70 p-6 shadow-xl shadow-cyan-950/20">
      <h3 className="text-lg font-bold text-white">Objetivo diario calculado</h3>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <FilaNutriente
          etiqueta="Carbohidratos"
          gramos={result.carbGrams}
          porcentaje={result.split.carbsPercent}
          claseColor="text-amber-300"
        />
        <FilaNutriente
          etiqueta="Proteína"
          gramos={result.proteinGrams}
          porcentaje={result.split.proteinPercent}
          claseColor="text-emerald-300"
        />
        <FilaNutriente
          etiqueta="Grasas"
          gramos={result.fatGrams}
          porcentaje={result.split.fatPercent}
          claseColor="text-fuchsia-300"
        />
      </div>

      <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-300">
        <p>
          Calorías objetivo: <span className="font-bold text-white">{result.kcal} kcal</span>
        </p>
        <p>
          Tasa metabólica basal (BMR): <span className="font-bold text-white">{result.bmr} kcal</span>
        </p>
        <p>
          Calorías de mantenimiento: <span className="font-bold text-white">{result.maintenanceKcal} kcal</span>
        </p>
      </div>
    </div>
  );
}

export default TarjetaResultadosMacros;