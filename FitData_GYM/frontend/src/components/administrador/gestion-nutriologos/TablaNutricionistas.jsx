import TablaGestion from './TablaGestion';

const CELL_CLASS_NAME = 'py-4 px-6';
const ACTION_BUTTON_CLASS_NAME = 'px-4 py-2 rounded-lg font-semibold text-sm transition-all text-white disabled:opacity-50 disabled:cursor-not-allowed';

function FilaNutricionista({ nutritionist, config, isProcessing, onAction }) {
  const actionLabel = isProcessing ? config.processingLabel : config.actionLabel;

  return (
    <tr className="hover:bg-gray-700/20 transition-colors">
      <td className={CELL_CLASS_NAME}>
        <p className="text-white font-semibold">{nutritionist.name}</p>
        <p className="text-gray-400 text-xs">{nutritionist.email}</p>
      </td>
      <td className={`${CELL_CLASS_NAME} text-blue-300 text-sm`}>
        {nutritionist.specialty || 'Nutrición general'}
      </td>
      {config.showClientsCount && (
        <td className={`${CELL_CLASS_NAME} text-cyan-300 font-bold text-lg`}>
          {nutritionist.clientsCount ?? 0}
        </td>
      )}
      <td className={CELL_CLASS_NAME}>
        <button
          type="button"
          onClick={() => onAction(nutritionist)}
          disabled={isProcessing}
          className={`${ACTION_BUTTON_CLASS_NAME} ${config.buttonClassName}`}
        >
          {actionLabel}
        </button>
      </td>
    </tr>
  );
}

function TablaNutricionistas({ nutritionists = [], config, processingId, onAction }) {
  const columnHeaders = [
    'Nutriólogo',
    'Especialidad',
    ...(config.showClientsCount ? ['Clientes Asignados'] : []),
    'Acciones',
  ];

  return (
    <TablaGestion
      caption={config.title}
      columnHeaders={columnHeaders}
      rows={nutritionists}
      emptyMessage={config.emptyMessage}
      renderRow={(nutritionist) => (
        <FilaNutricionista
          key={nutritionist.id}
          nutritionist={nutritionist}
          config={config}
          isProcessing={processingId === nutritionist.id}
          onAction={onAction}
        />
      )}
    />
  );
}

export default TablaNutricionistas;
