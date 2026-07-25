import FormularioNotaBitacora from './panel-notas-bitacora/FormularioNotaBitacora';
import HistorialNotasBitacora from './panel-notas-bitacora/HistorialNotasBitacora';

function EstadoVacioBitacora() {
  return (
    <div className="flex min-h-100 h-full flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900 p-12 text-center shadow-xl">
      <div
        aria-hidden="true"
        className="mb-6 text-6xl opacity-80"
      >
        👈
      </div>

      <h3 className="mb-2 text-2xl font-bold text-white">
        Selecciona un cliente
      </h3>

      <p className="mx-auto max-w-sm text-slate-400">
        Selecciona un cliente de la lista lateral
        para ver y gestionar sus notas privadas.
      </p>
    </div>
  );
}

function EncabezadoCliente({
  cliente,
  totalNotas,
}) {
  const nombre =
    cliente.nombre || 'Cliente sin nombre';

  const email =
    cliente.email || 'Sin correo registrado';

  return (
    <header className="flex flex-col justify-between gap-5 rounded-xl border border-purple-500/30 bg-linear-to-r from-purple-900/40 to-blue-900/40 p-6 shadow-xl sm:flex-row sm:items-center">
      <div className="min-w-0">
        <h2 className="mb-1 truncate text-2xl font-bold text-white">
          {nombre}
        </h2>

        <p className="truncate text-sm text-slate-300">
          {email}
        </p>

        {cliente.telefono && (
          <p className="mt-1 text-sm text-slate-400">
            <span aria-hidden="true">📞 </span>
            {cliente.telefono}
          </p>
        )}
      </div>

      <div className="shrink-0 rounded-lg border border-white/10 bg-black/20 px-6 py-3 shadow-inner">
        <p className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-300">
          Total de notas
        </p>

        <p className="text-center text-3xl font-black text-white">
          {totalNotas}
        </p>
      </div>
    </header>
  );
}

function PanelNotasBitacora({
  miembroSeleccionado = null,
  notas = [],
  cargando = false,
  textoNota = '',
  notaEditando = null,
  onCambiarTexto,
  onGuardar,
  onCancelarEdicion,
  onEditar,
  onEliminar,
}) {
  if (!miembroSeleccionado) {
    return <EstadoVacioBitacora />;
  }

  return (
    <div className="lg:col-span-2">
      <div className="space-y-6">
        <EncabezadoCliente
          cliente={miembroSeleccionado}
          totalNotas={notas.length}
        />

        <FormularioNotaBitacora
          textoNota={textoNota}
          notaEditando={notaEditando}
          onCambiarTexto={onCambiarTexto}
          onGuardar={onGuardar}
          onCancelarEdicion={onCancelarEdicion}
        />

        <HistorialNotasBitacora
          notas={notas}
          cargando={cargando}
          onEditar={onEditar}
          onEliminar={onEliminar}
        />
      </div>
    </div>
  );
}

export default PanelNotasBitacora;