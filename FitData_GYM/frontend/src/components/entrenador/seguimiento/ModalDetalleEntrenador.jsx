import {
  CalendarClock,
  X,
  Zap,
} from 'lucide-react';

import DialogoSistemaNutri from '../../nutriologo/DialogoSistemaNutri';

import AccionesDetalleEntrenamiento from './modal-detalle-entrenador/AccionesDetalleEntrenamiento';
import EditorRutinaEntrenamiento from './modal-detalle-entrenador/EditorRutinaEntrenamiento';
import useModalDetalleEntrenador from './modal-detalle-entrenador/useModalDetalleEntrenador';

import { crearFechaFormateada } from './modal-detalle-entrenador/modalDetalleEntrenadorUtils';

function ModalDetalleEntrenador({
  entreno,
  onClose,
}) {
  const {
    estaEditando,
    contenidoRutina,
    guardando,
    eliminando,
    formularioBloqueado,
    configuracionDialogo,
    setContenidoRutina,
    comenzarEdicion,
    cancelarEdicion,
    actualizarRutina,
    solicitarEliminacion,
    cerrarDesdeFondo,
    cerrarModal,
  } = useModalDetalleEntrenador({
    entreno,
    onClose,
  });

  if (!entreno) {
    return null;
  }

  const fechaFormateada =
    crearFechaFormateada(entreno);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="titulo-detalle-entrenamiento"
      onMouseDown={cerrarDesdeFondo}
      className="fixed inset-0 z-120 flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-md"
    >
      {configuracionDialogo && (
        <DialogoSistemaNutri
          {...configuracionDialogo}
        />
      )}

      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-orange-500/40 bg-[#1e293b] p-8 shadow-2xl">
        <header className="mb-6 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3
              id="titulo-detalle-entrenamiento"
              className="truncate text-2xl font-black uppercase italic leading-none tracking-tighter text-orange-400"
            >
              {entreno.title ||
                'Sesión de entrenamiento'}
            </h3>

            <p className="mt-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500">
              <Zap
                size={12}
                aria-hidden="true"
                className="text-orange-500"
              />

              Plan de entrenamiento
            </p>

            {(entreno.horaInicio ||
              entreno.horaFin) && (
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/15 px-3 py-1">
                <CalendarClock
                  size={12}
                  aria-hidden="true"
                  className="text-orange-400"
                />

                <span className="text-xs font-black tracking-widest text-orange-300">
                  {entreno.horaInicio ||
                    'Sin inicio'}

                  {' – '}

                  {entreno.horaFin ||
                    'Sin término'}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={cerrarModal}
            disabled={formularioBloqueado}
            aria-label="Cerrar detalle"
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X
              size={20}
              aria-hidden="true"
            />
          </button>
        </header>

        <EditorRutinaEntrenamiento
          estaEditando={estaEditando}
          contenidoRutina={contenidoRutina}
          bloqueado={formularioBloqueado}
          onCambiarContenido={setContenidoRutina}
        />

        <AccionesDetalleEntrenamiento
          estaEditando={estaEditando}
          guardando={guardando}
          eliminando={eliminando}
          bloqueado={formularioBloqueado}
          onEditar={comenzarEdicion}
          onCancelar={cancelarEdicion}
          onGuardar={actualizarRutina}
          onEliminar={solicitarEliminacion}
        />

        <footer className="mt-6 flex flex-col items-center border-t border-slate-800/50 pt-5">
          <div className="flex items-center gap-2 rounded-full border border-orange-400/20 bg-orange-400/10 px-4 py-2 text-[11px] font-black uppercase tracking-tighter text-orange-400 shadow-lg shadow-orange-900/10">
            <CalendarClock
              size={14}
              aria-hidden="true"
            />

            {fechaFormateada}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ModalDetalleEntrenador;