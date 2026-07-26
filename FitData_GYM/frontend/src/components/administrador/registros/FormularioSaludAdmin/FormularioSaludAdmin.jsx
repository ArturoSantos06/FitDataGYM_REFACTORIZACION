import useFormularioSaludAdmin from './hooks/useFormularioSaludAdmin';
import FormularioSaludVista from './partes/FormularioSaludVista';

export default function FormularioSaludAdmin({ miembroEmail, onClose, onSaved }) {
  const {
    memberId,
    memberName,
    loading,
    saving,
    error,
    status,
    formData,
    handleChange,
    setCondicionCorazon,
    handleSubmit,
  } = useFormularioSaludAdmin(miembroEmail, onSaved);

  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white">Ficha Médica - {memberName || miembroEmail}</h3>
          <p className="text-xs text-slate-400">Completa los datos iniciales de salud del cliente.</p>
          {memberId && <p className="text-xs text-slate-500 mt-1">ID de Miembro: {memberId}</p>}
        </div>
        <button type="button" onClick={onClose} className="text-slate-400 hover:text-white text-sm font-semibold">
          Cerrar
        </button>
      </div>

      {loading && <p className="text-sm text-slate-400 mt-4">Cargando datos del miembro...</p>}
      {error && <p className="text-sm text-red-400 mt-4">{error}</p>}

      {!loading && !error && status === 'form' && (
        <FormularioSaludVista
          formData={formData}
          onChange={handleChange}
          onCambioCondicionCorazon={setCondicionCorazon}
          onSubmit={handleSubmit}
          onCancelar={onClose}
          saving={saving}
        />
      )}

      {status === 'success' && (
        <div className="mt-4 p-4 bg-emerald-900/40 border border-emerald-500 rounded-lg">
          <p className="text-sm text-emerald-100">Ficha médica guardada con éxito.</p>
          <div className="mt-3 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-sm font-semibold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
