import { useState, useCallback } from 'react';
import { useCatalogoMembresias } from './useCatalogoMembresias';
import { useListaMembresias } from './useListaMembresias';
import { useFormularioMembresia } from './useFormularioMembresia';

export function useAdministrarMembresias() {
  const catalogo = useCatalogoMembresias();
  const lista = useListaMembresias();
  const [membresiaEditando, setMembresiaEditando] = useState(null);
  const [mostrarTerminos, setMostrarTerminos] = useState(false);

  const formulario = useFormularioMembresia({
    membresiaEditando,
    onGuardar: async (id, datos) => {
      if (id) {
        return await lista.actualizar(id, datos, formulario.imagen);
      }
      return await lista.crear(datos, formulario.imagen);
    },
    onCancelar: () => {
      setMembresiaEditando(null);
      formulario.onCancelar();
    },
  });

  const editar = useCallback((membresia) => {
    setMembresiaEditando(membresia);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const eliminar = useCallback(async (id) => {
    if (!window.confirm('¿Eliminar membresía?')) return;
    const resultado = await lista.eliminar(id);
    if (!resultado.success) {
      alert('Error al eliminar: ' + resultado.error);
    }
  }, [lista]);

  const terminos = {
    abierto: mostrarTerminos,
    onAbrir: () => setMostrarTerminos(true),
    onCerrar: () => setMostrarTerminos(false),
  };

  return {
    catalogo,
    lista: {
      ...lista,
      onEditar: editar,
      onEliminar: eliminar,
    },
    formulario: {
      ...formulario,
      esEdicion: formulario.esEdicion,
      onEditar: setMembresiaEditando,
    },
    terminos,
    miembroEditando: membresiaEditando,
  };
}