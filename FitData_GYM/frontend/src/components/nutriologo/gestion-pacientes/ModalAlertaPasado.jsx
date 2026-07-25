export default function ModalAlertaPasado({ alCerrar }) {
  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-red-500/30 bg-slate-900 p-6 shadow-2xl">
        <h3 className="mb-2 text-lg font-black text-red-300">
          No se puede agendar días pasados
        </h3>
        <p className="text-sm leading-relaxed text-slate-300">
          Selecciona una fecha de hoy en adelante para registrar una nueva cita.
        </p>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={alCerrar}
            className="rounded-lg bg-red-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-400"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
