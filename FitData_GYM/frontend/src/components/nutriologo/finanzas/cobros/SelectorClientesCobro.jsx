import { Search, UserRound } from 'lucide-react';
import TablaClientesCobro from './TablaClientesCobro';
import { obtenerNombreCompleto } from '../../utils/utilidadesCobros';

export default function SelectorClientesCobro({
  busqueda,
  alCambiarBusqueda,
  orden,
  alCambiarOrden,
  clientes,
  cargando,
  idSeleccionado,
  alSeleccionar,
  clienteSeleccionado,
}) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-700 bg-slate-950/80 p-3">
        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">
            Clientes para Cobro
          </h4>
          <select
            value={orden}
            onChange={(evento) => alCambiarOrden(evento.target.value)}
            className="rounded-lg border border-slate-700 bg-slate-950 px-2 py-1.5 text-xs text-slate-200 outline-none focus:border-cyan-500"
            aria-label="Ordenar clientes"
          >
            <option value="recientes">Más recientes</option>
            <option value="nombre">Nombre A-Z</option>
          </select>
        </div>

        <div className="relative mb-3">
          <Search size={14} className="absolute top-2.5 left-2.5 text-slate-500" />
          <input
            value={busqueda}
            onChange={(evento) => alCambiarBusqueda(evento.target.value)}
            placeholder="Buscar cliente..."
            className="w-full rounded-lg border border-slate-700 bg-slate-950 py-2 pr-2 pl-8 text-xs text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <TablaClientesCobro
          clientes={clientes}
          cargando={cargando}
          idSeleccionado={idSeleccionado}
          alSeleccionar={alSeleccionar}
        />
      </div>

      {clienteSeleccionado && (
        <div className="rounded-xl border border-cyan-500/25 bg-cyan-500/10 p-3 text-xs text-cyan-100">
          <div className="mb-1 flex items-center gap-2 font-semibold">
            <UserRound size={13} />
            Cliente seleccionado
          </div>
          <p>{obtenerNombreCompleto(clienteSeleccionado)}</p>
          <p className="text-cyan-200/80">{clienteSeleccionado.email || 'Sin correo'}</p>
        </div>
      )}
    </div>
  );
}
