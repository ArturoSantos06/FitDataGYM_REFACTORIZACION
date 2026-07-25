import {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { obtenerTodasLasNotas } from './notasBitacoraService';

import {
  crearConteoNotas,
} from './bitacoraEntrenadorUtils';

function useConteoNotas({
  mostrarMensaje,
}) {
  const [conteoNotas, setConteoNotas] =
    useState({});

  const cargarConteoNotas = useCallback(
    async () => {
      try {
        const notas =
          await obtenerTodasLasNotas();

        setConteoNotas(
          crearConteoNotas(notas),
        );
      } catch (error) {
        console.error(
          'Error al contar notas:',
          error,
        );

        mostrarMensaje(
          'error',
          error.message ||
            'No se pudo cargar el conteo.',
        );
      }
    },
    [mostrarMensaje],
  );

  useEffect(() => {
    cargarConteoNotas();
  }, [cargarConteoNotas]);

  return {
    conteoNotas,
    recargarConteoNotas:
      cargarConteoNotas,
  };
}

export default useConteoNotas;