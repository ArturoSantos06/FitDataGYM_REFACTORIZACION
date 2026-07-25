import { FilaNutriente } from './ui/FilaNutriente';
import { MensajeVacio } from './ui/MensajeVacio';

function TarjetaResultadosMacros({ resultado }) {
  if (!resultado) {
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
          gramos={resultado.carbohidratosGramos}
          porcentaje={resultado.distribucion.carbohidratos}
          claseColor="text-amber-300"
        />
        <FilaNutriente
          etiqueta="Proteína"
          gramos={resultado.proteinaGramos}
          porcentaje={resultado.distribucion.proteina}
          claseColor="text-emerald-300"
        />
        <FilaNutriente
          etiqueta="Grasas"
          gramos={resultado.grasaGramos}
          porcentaje={resultado.distribucion.grasa}
          claseColor="text-fuchsia-300"
        />
      </div>

      <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950/70 p-4 text-sm text-slate-300">
        <p>
          Calorías objetivo:{' '}
          <span className="font-bold text-white">{resultado.calorias} kcal</span>
        </p>
        <p>
          Tasa metabólica basal:{' '}
          <span className="font-bold text-white">
            {resultado.tasaMetabolicaBasal} kcal
          </span>
        </p>
        <p>
          Calorías de mantenimiento:{' '}
          <span className="font-bold text-white">
            {resultado.caloriasMantenimiento} kcal
          </span>
        </p>
      </div>
    </div>
  );
}

export default TarjetaResultadosMacros;
