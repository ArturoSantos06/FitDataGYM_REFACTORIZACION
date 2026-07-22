import { memo } from 'react';
import { INPUT_CLASS, LABEL_CLASS } from '../contenido';
import CampoCasilla from './CampoCasilla';

function FormularioSaludVista({ formData, onChange, onCambioCondicionCorazon, onSubmit, onCancelar, saving }) {
  return (
    <form onSubmit={onSubmit} className="mt-4 space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className={LABEL_CLASS}>Edad</label>
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={onChange}
            className={INPUT_CLASS}
            min="0"
            placeholder="Ej. 28"
          />
        </div>
        <div>
          <label className={LABEL_CLASS}>Condición del corazón</label>
          <div className="flex items-center gap-4 mt-1">
            <label className="flex items-center gap-2 text-sm text-slate-200">
              <input
                type="radio"
                name="condicionCorazon"
                value="true"
                checked={formData.condicionCorazon === true}
                onChange={() => onCambioCondicionCorazon(true)}
              />{' '}
              Sí
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-200">
              <input
                type="radio"
                name="condicionCorazon"
                value="false"
                checked={formData.condicionCorazon === false}
                onChange={() => onCambioCondicionCorazon(false)}
              />{' '}
              No
            </label>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <CampoCasilla name="presionAlta" checked={formData.presionAlta} onChange={onChange} etiqueta="Presión arterial alta" />
        <CampoCasilla
          name="lesionesRecientes"
          checked={formData.lesionesRecientes}
          onChange={onChange}
          etiqueta="Lesiones recientes"
        />
      </div>

      <CampoCasilla name="medicamentos" checked={formData.medicamentos} onChange={onChange} etiqueta="Toma medicamentos" />

      <div>
        <label className={LABEL_CLASS}>Comentarios adicionales</label>
        <textarea
          name="comentarios"
          value={formData.comentarios}
          onChange={onChange}
          className={`${INPUT_CLASS} h-24 resize-none`}
          placeholder="Ej. alergias, medicamentos, etc."
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancelar}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-semibold"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-semibold disabled:opacity-50"
        >
          {saving ? 'Guardando...' : 'Guardar ficha'}
        </button>
      </div>
    </form>
  );
}

export default memo(FormularioSaludVista);
