import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { obtenerClientesAsignados } from './clientesBitacoraService';

import {
  filtrarMiembrosPorBusqueda,
} from './bitacoraEntrenadorUtils';

function useClientesBitacora({
  terminoBusqueda = '',
  mostrarMensaje,
}) {
  const [miembrosBase, setMiembrosBase] =
    useState([]);

  const [
    entrenadorActual,
    setEntrenadorActual,
  ] = useState(null);

  const [
    cargandoMiembros,
    setCargandoMiembros,
  ] = useState(true);

  const cargarClientes = useCallback(
    async () => {
      try {
        setCargandoMiembros(true);

        const resultado =
          await obtenerClientesAsignados();

        setMiembrosBase(resultado.miembros);
        setEntrenadorActual(
          resultado.entrenadorActual,
        );
      } catch (error) {
        console.error(
          'Error al cargar clientes:',
          error,
        );

        setMiembrosBase([]);
        setEntrenadorActual(null);

        mostrarMensaje(
          'error',
          error.message ||
            'No se pudieron cargar los clientes.',
        );
      } finally {
        setCargandoMiembros(false);
      }
    },
    [mostrarMensaje],
  );

  useEffect(() => {
    cargarClientes();
  }, [cargarClientes]);

  const miembros = useMemo(
    () =>
      filtrarMiembrosPorBusqueda(
        miembrosBase,
        terminoBusqueda,
      ),
    [miembrosBase, terminoBusqueda],
  );

  return {
    miembros,
    miembrosBase,
    entrenadorActual,
    cargandoMiembros,
    recargarClientes: cargarClientes,
  };
}

export default useClientesBitacora;