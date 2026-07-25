import { useState } from 'react';

import useClientesBitacora from './useClientesBitacora';
import useConteoNotas from './useConteoNotas';
import useMensajeTemporal from './useMensajeTemporal';
import useNotasBitacora from './useNotasBitacora';

function useBitacoraEntrenador() {
  const [
    terminoBusqueda,
    setTerminoBusqueda,
  ] = useState('');

  const [
    miembroSeleccionado,
    setMiembroSeleccionado,
  ] = useState(null);

  const {
    mensaje,
    mostrarMensaje,
  } = useMensajeTemporal();

  const {
    miembros,
    entrenadorActual,
    cargandoMiembros,
  } = useClientesBitacora({
    terminoBusqueda,
    mostrarMensaje,
  });

  const {
    conteoNotas,
    recargarConteoNotas,
  } = useConteoNotas({
    mostrarMensaje,
  });

  const notasBitacora =
    useNotasBitacora({
      miembroSeleccionado,
      entrenadorActual,
      mostrarMensaje,
      onActualizarConteo:
        recargarConteoNotas,
    });

  const seleccionarMiembro = (miembro) => {
    setMiembroSeleccionado(miembro);
  };

  return {
    miembros,
    miembroSeleccionado,
    terminoBusqueda,
    mensaje,
    cargandoMiembros,
    conteoNotas,
    setTerminoBusqueda,
    seleccionarMiembro,
    ...notasBitacora,
  };
}

export default useBitacoraEntrenador;