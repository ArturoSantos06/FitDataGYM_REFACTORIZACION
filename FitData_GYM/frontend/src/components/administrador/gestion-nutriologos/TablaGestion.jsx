const CELL_HEADER_CLASS_NAME = 'text-left py-4 px-6 text-gray-300 font-semibold text-sm';

function TablaGestion({
  caption,
  columnHeaders,
  rows = [],
  emptyMessage,
  renderRow,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-gray-900/80">
          <tr>
            {columnHeaders.map((header) => (
              <th key={header} scope="col" className={CELL_HEADER_CLASS_NAME}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columnHeaders.length} className="text-center py-8 text-gray-400">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default TablaGestion;
