import { Stethoscope } from 'lucide-react';
import TablaNutricionistas from './TablaNutricionistas';

const CONFIGURACION_CONTRATADOS = {
  title: 'Nutriólogos Contratados',
  emptyMessage: 'No hay nutriólogos contratados.',
  showClientsCount: true,
  actionLabel: 'Descontratar',
  processingLabel: 'Descontratando...',
  buttonClassName: 'bg-red-600 hover:bg-red-700',
};

function NutriologosContratados({
  nutritionists = [],
  processingId = '',
  onDeactivate,
}) {
  return (
    <section className="bg-gray-800/50 rounded-xl border border-gray-700 shadow-xl overflow-hidden">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Stethoscope size={22} className="text-blue-300" aria-hidden="true" />
          {CONFIGURACION_CONTRATADOS.title} ({nutritionists.length})
        </h2>
      </div>
      <TablaNutricionistas
        nutritionists={nutritionists}
        config={CONFIGURACION_CONTRATADOS}
        processingId={processingId}
        onAction={onDeactivate}
      />
    </section>
  );
}

export default NutriologosContratados;
