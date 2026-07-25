import { Stethoscope } from 'lucide-react';
import TablaNutricionistas from './TablaNutricionistas';

const CONFIGURACION_INACTIVOS = {
  title: 'Nutriólogos Inactivos',
  emptyMessage: 'No hay nutriólogos inactivos.',
  showClientsCount: false,
  actionLabel: 'Recontratar',
  processingLabel: 'Recontratando...',
  buttonClassName: 'bg-emerald-600 hover:bg-emerald-700',
};

function NutriologosInactivos({
  nutritionists = [],
  processingId = '',
  onReactivate,
}) {
  return (
    <section className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Stethoscope size={22} className="text-yellow-300" aria-hidden="true" />
          {CONFIGURACION_INACTIVOS.title} ({nutritionists.length})
        </h2>
      </div>
      <TablaNutricionistas
        nutritionists={nutritionists}
        config={CONFIGURACION_INACTIVOS}
        processingId={processingId}
        onAction={onReactivate}
      />
    </section>
  );
}

export default NutriologosInactivos;
