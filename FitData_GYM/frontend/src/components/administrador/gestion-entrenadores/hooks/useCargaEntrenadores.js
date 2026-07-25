import { useEffect, useRef } from 'react';

export function useCargaEntrenadores(cargarDatos) {
  const cargarDatosRef = useRef(cargarDatos);

  useEffect(() => {
    cargarDatosRef.current = cargarDatos;
  }, [cargarDatos]);

  useEffect(() => {
    let activo = true;
    cargarDatosRef.current(() => activo);

    return () => {
      activo = false;
    };
  }, []);
}
