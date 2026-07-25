import {
  Edit3,
  Save,
  Trash2,
  X,
} from 'lucide-react';

function AccionesDetalleEntrenamiento({
  estaEditando,
  guardando,
  eliminando,
  bloqueado,
  onEditar,
  onCancelar,
  onGuardar,
  onEliminar,
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={onEliminar}
        disabled={bloqueado}
        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-600/10 py-4 text-[10px] font-black uppercase text-red-500 transition-all hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Trash2
          size={15}
          aria-hidden="true"
        />

        {eliminando
          ? 'Eliminando...'
          : 'Eliminar'}
      </button>

      {estaEditando ? (
        <>
          <button
            type="button"
            onClick={onCancelar}
            disabled={bloqueado}
            className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-slate-700 py-4 text-[10px] font-black uppercase text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X
              size={15}
              aria-hidden="true"
            />

            Cancelar
          </button>

          <button
            type="button"
            onClick={onGuardar}
            disabled={bloqueado}
            className="flex flex-[1.5] items-center justify-center gap-2 rounded-2xl bg-orange-600 py-4 text-[10px] font-black uppercase text-white shadow-lg shadow-orange-900/20 transition-colors hover:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save
              size={15}
              aria-hidden="true"
            />

            {guardando
              ? 'Guardando...'
              : 'Guardar rutina'}
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={onEditar}
          disabled={bloqueado}
          className="flex flex-[1.5] items-center justify-center gap-2 rounded-2xl bg-slate-700 py-4 text-[10px] font-black uppercase text-white transition-colors hover:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Edit3
            size={15}
            aria-hidden="true"
          />

          Editar plan
        </button>
      )}
    </div>
  );
}

export default AccionesDetalleEntrenamiento;