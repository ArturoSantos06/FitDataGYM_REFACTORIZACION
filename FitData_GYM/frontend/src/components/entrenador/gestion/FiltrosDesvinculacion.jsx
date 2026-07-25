import { Search } from 'lucide-react';

function FiltrosDesvinculacion({
  terminoBusqueda,
  onCambiarBusqueda,
  mostrandoArchivados,
  onAlternarArchivados,
}) {
  const textoBoton = mostrandoArchivados
    ? 'Mostrar Activos'
    : 'Mostrar Archivados';

  const estiloBoton = mostrandoArchivados
    ? 'border-teal-500/50 bg-teal-900/40 text-teal-400'
    : 'border-transparent bg-slate-700 text-gray-300 hover:bg-slate-600';

  return (
    <div className="mt-4 mb-6 flex flex-col gap-4 md:flex-row">
      <div className="relative w-full md:w-64">
        <label htmlFor="buscar-cliente" className="sr-only">
          Buscar cliente por nombre
        </label>

        <input
          id="buscar-cliente"
          type="search"
          placeholder="Buscar por nombre..."
          value={terminoBusqueda}
          onChange={(evento) => onCambiarBusqueda(evento.target.value)}
          className="w-full rounded-lg border border-slate-600 bg-slate-900 py-2 pr-4 pl-10 text-sm text-white transition-all focus:border-teal-500 focus:outline-none"
        />

        <Search
          size={18}
          aria-hidden="true"
          className="absolute top-2.5 left-3 text-slate-500"
        />
      </div>

      <button
        type="button"
        onClick={onAlternarArchivados}
        aria-pressed={mostrandoArchivados}
        className={`rounded-lg border px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${estiloBoton}`}
      >
        {textoBoton}
      </button>
    </div>
  );
}

export default FiltrosDesvinculacion;