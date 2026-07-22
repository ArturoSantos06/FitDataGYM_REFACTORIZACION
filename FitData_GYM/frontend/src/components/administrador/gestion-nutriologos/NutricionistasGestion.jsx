import NutriologosContratados from './NutriologosContratados';
import NutriologosInactivos from './NutriologosInactivos';

function NutricionistasGestion({
  nutriologos = [],
  nutriologosInactivos = [],
  idNutriologoDesactivando = '',
  idNutriologoReactivando = '',
  onDesactivarNutriologo,
  onReactivarNutriologo,
}) {
  return (
    <div className="space-y-6">
      <NutriologosContratados
        nutritionists={nutriologos}
        processingId={idNutriologoDesactivando}
        onDeactivate={onDesactivarNutriologo}
      />
      <NutriologosInactivos
        nutritionists={nutriologosInactivos}
        processingId={idNutriologoReactivando}
        onReactivate={onReactivarNutriologo}
      />
    </div>
  );
}

export default NutricionistasGestion;
