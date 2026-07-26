import { useState, useCallback } from 'react';
import { useAdministrarMembresias } from './hooks/useAdministrarMembresias';
import FormularioMembresiaVista from './partes/FormularioMembresiaVista';
import ListaMembresiasVista from './partes/ListaMembresiasVista';
import ModalTerminosVista from './partes/ModalTerminosVista';

function AdministrarMembresias() {
  const {
    lista,
    formulario,
    terminos,
  } = useAdministrarMembresias();

  const { membresias, obtenerUrlImagen, onEditar, onEliminar } = lista;
  const { campos, previewUrl, cargando: cargandoFormulario, esEdicion, onCambio, onArchivo, onEnviar, onCancelar } = formulario;
  const { abierto: mostrarTerminos, onAbrir: abrirTerminos, onCerrar: cerrarTerminos } = terminos;

  const [activoId, setActivoId] = useState(null);

  const iniciarEdicion = useCallback((membresia) => {
    onEditar(membresia);
    setActivoId(membresia.id);
  }, [onEditar]);

  const cancelarEdicion = useCallback(() => {
    onCancelar();
    setActivoId(null);
  }, [onCancelar]);

  const handleCardClick = useCallback((id) => {
    setActivoId(activoId === id ? null : id);
  }, [activoId]);

  const handleTerminosClick = useCallback((e) => {
    e.stopPropagation();
    abrirTerminos();
  }, [abrirTerminos]);

  return (
    <div className="relative" onClick={cancelarEdicion}>
      {mostrarTerminos && <ModalTerminosVista abierto={mostrarTerminos} onCerrar={cerrarTerminos} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <FormularioMembresiaVista
          esEdicion={esEdicion}
          campos={campos}
          onCambio={onCambio}
          onArchivo={onArchivo}
          previewUrl={previewUrl}
          cargando={cargandoFormulario}
          onEnviar={onEnviar}
          onCancelar={cancelarEdicion}
        />

        <ListaMembresiasVista
          membresias={membresias}
          obtenerUrlImagen={obtenerUrlImagen}
          activoId={activoId}
          onClick={handleCardClick}
          onEditar={iniciarEdicion}
          onBorrar={onEliminar}
        />
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={handleTerminosClick}
          className="text-gray-500 hover:text-cyan-400 text-sm underline transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ver Términos y Condiciones de Membresías
        </button>
      </div>
    </div>
  );
}

export default AdministrarMembresias;