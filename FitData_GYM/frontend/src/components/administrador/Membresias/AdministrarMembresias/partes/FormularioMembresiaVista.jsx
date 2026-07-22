import { memo } from 'react';
import Boton from '../../../partes/reutilizables/Boton';

function CampoFormulario({ etiqueta, className, ...props }) {
  return (
    <div className={className}>
      <label className="block text-sm text-gray-400 mb-1">{etiqueta}</label>
      <input
        {...props}
        className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

function FormularioMembresiaVista({
  esEdicion,
  campos,
  onCambioCampo,
  onArchivo,
  previewUrl,
  cargando,
  onEnviar,
  onCancelar,
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 h-fit lg:sticky lg:top-6 z-10" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400">
        {esEdicion ? 'Editar Membresía' : 'Nueva Membresía'}
      </h2>

      <form onSubmit={onEnviar} className="space-y-4">
        <CampoFormulario
          etiqueta="Nombre"
          type="text"
          name="nombre"
          value={campos.nombre}
          onChange={onCambioCampo}
          placeholder="Ej. Mensual Full"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <CampoFormulario
            etiqueta="Precio ($)"
            type="number"
            step="0.01"
            name="precio"
            value={campos.precio}
            onChange={onCambioCampo}
            required
          />
          <CampoFormulario
            etiqueta="Días"
            type="number"
            name="duracion"
            value={campos.duracion}
            onChange={onCambioCampo}
            required
          />
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-1">Imagen de la Tarjeta</label>
          <input
            type="file"
            accept="image/*"
            onChange={onArchivo}
            className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer bg-gray-900 border border-gray-600 rounded-lg"
          />
        </div>

        {previewUrl && (
          <div className="relative w-full aspect-video flex items-center justify-center mt-2 rounded-xl overflow-hidden border border-gray-700 bg-black">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-contain" />
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Boton
            type="submit"
            isLoading={cargando}
            loadingText={esEdicion ? 'Guardando...' : 'Creando...'}
            variante="primario"
          >
            {esEdicion ? 'Guardar' : 'Crear'}
          </Boton>
          {esEdicion && (
            <button
              type="button"
              onClick={onCancelar}
              className="px-4 bg-gray-700 text-gray-300 font-bold rounded-lg hover:bg-gray-600"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default memo(FormularioMembresiaVista);