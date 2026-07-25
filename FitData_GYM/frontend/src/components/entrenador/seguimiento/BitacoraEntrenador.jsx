import ListaClientesBitacora from './ListaClientesBitacora';
import PanelNotasBitacora from './PanelNotasBitacora';
import useBitacoraEntrenador from './bitacora-entrenador/useBitacoraEntrenador';

function BitacoraEntrenador({
  embedded = false,
}) {
  const {
    miembros,
    miembroSeleccionado,
    notas,
    textoNota,
    notaEditando,
    terminoBusqueda,
    cargando,
    mensaje,
    conteoNotas,
    cargandoMiembros,
    setTerminoBusqueda,
    setTextoNota,
    seleccionarMiembro,
    guardarNota,
    editarNota,
    eliminarNota,
    cancelarEdicion,
  } = useBitacoraEntrenador();

  return (
    <div
      className={
        embedded
          ? 'w-full'
          : 'min-h-screen bg-slate-950 p-4 md:p-8'
      }
    >
      <main
        className={`mx-auto max-w-350 rounded-xl border-t-4 border-purple-500 bg-gray-800 p-6 font-sans text-gray-100 shadow-xl ${
          embedded ? '' : 'mt-6'
        }`}
      >
        <header className="mb-8 border-b border-gray-700 pb-5">
          <h1 className="flex items-center gap-3 bg-linear-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text pb-1.5 text-3xl font-bold text-transparent">
            <span aria-hidden="true">
              📝
            </span>

            Bitácora de notas
          </h1>

          <p className="mt-1.5 font-medium text-slate-400">
            Sistema de seguimiento técnico -
            Uso exclusivo de entrenadores
          </p>
        </header>

        {mensaje.texto && (
          <div
            role="status"
            aria-live="polite"
            className={`mb-6 rounded-lg border p-4 font-bold ${
              mensaje.tipo === 'success'
                ? 'border-green-500 bg-green-900/20 text-green-400'
                : 'border-red-500 bg-red-900/20 text-red-400'
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        {cargandoMiembros && (
          <p className="mb-4 text-sm text-slate-400">
            Cargando clientes asignados...
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ListaClientesBitacora
            miembros={miembros}
            miembroSeleccionado={
              miembroSeleccionado
            }
            terminoBusqueda={
              terminoBusqueda
            }
            conteoNotas={conteoNotas}
            onBuscar={setTerminoBusqueda}
            onSeleccionar={
              seleccionarMiembro
            }
          />

          <PanelNotasBitacora
            miembroSeleccionado={
              miembroSeleccionado
            }
            notas={notas}
            cargando={cargando}
            textoNota={textoNota}
            notaEditando={notaEditando}
            onCambiarTexto={setTextoNota}
            onGuardar={guardarNota}
            onCancelarEdicion={
              cancelarEdicion
            }
            onEditar={editarNota}
            onEliminar={eliminarNota}
          />
        </div>
      </main>
    </div>
  );
}

export default BitacoraEntrenador;