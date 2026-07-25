import { CalendarClock, ClipboardList, X } from 'lucide-react';
import DialogoSistemaNutri from '../ui/DialogoSistemaNutri';
import { useModalDetalleNutri } from '../hooks/useModalDetalleNutri';
import { BotonAccionModal } from './BotonAccionModal';

export default function ModalDetalleNutri({ cita, alCerrar }) {
  const {
    actualizarNota,
    cambiarContenido,
    contenidoEditado,
    dialogo,
    editando,
    iniciarEdicion,
    notaVisible,
    procesando,
    solicitarEliminacion,
  } = useModalDetalleNutri(cita, alCerrar);
  const fechaFormateada = `${cita.fecha} | ${cita.horaInicio} - ${cita.horaFin}`;

  return (
    <div className="absolute inset-0 z-120 flex items-center justify-center bg-slate-900/90 p-4 backdrop-blur-md">
      {dialogo && <DialogoSistemaNutri {...dialogo} procesando={procesando} />}

      <div className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-purple-500/40 bg-[#1e293b] p-8 shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h3 className="text-2xl leading-none font-black tracking-tighter text-purple-400 uppercase italic">
              {cita.title}
            </h3>
            <p className="mt-2 flex items-center gap-2 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
              <ClipboardList size={12} className="text-purple-500" />
              Registro de seguimiento
            </p>
          </div>
          <button
            type="button"
            onClick={alCerrar}
            className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-800"
            aria-label="Cerrar detalle de cita"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-2">
          <label className="ml-1 text-[10px] font-black tracking-widest text-slate-500 uppercase">
            Observaciones del especialista
          </label>
          {editando ? (
            <textarea
              className="min-h-[180px] w-full resize-none rounded-2xl border border-purple-500/50 bg-[#0f172a] p-5 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-purple-500"
              value={contenidoEditado}
              maxLength={2000}
              onChange={(evento) => cambiarContenido(evento.target.value)}
              autoFocus
            />
          ) : (
            <div className="max-h-56 overflow-y-auto rounded-2xl border border-slate-800 bg-[#0f172a] p-6 shadow-inner">
              <p className="text-sm leading-relaxed font-medium whitespace-pre-line text-slate-300">
                {notaVisible || 'Sin notas registradas.'}
              </p>
            </div>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <BotonAccionModal
            tipo="peligro"
            alHacerClic={solicitarEliminacion}
            deshabilitado={procesando}
          >
            Borrar
          </BotonAccionModal>
          {editando ? (
            <BotonAccionModal
              tipo="primario"
              alHacerClic={actualizarNota}
              deshabilitado={procesando}
            >
              {procesando ? 'Guardando...' : 'Guardar'}
            </BotonAccionModal>
          ) : (
            <BotonAccionModal
              tipo="secundario"
              alHacerClic={iniciarEdicion}
              deshabilitado={procesando}
            >
              Editar notas
            </BotonAccionModal>
          )}
        </div>

        <div className="mt-6 flex flex-col items-center border-t border-slate-800/50 pt-5">
          <div className="flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-black tracking-tighter text-cyan-400 uppercase shadow-lg shadow-cyan-900/10">
            <CalendarClock size={14} />
            {fechaFormateada}
          </div>
        </div>
      </div>
    </div>
  );
}
