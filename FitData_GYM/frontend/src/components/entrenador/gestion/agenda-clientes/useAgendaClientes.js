import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  CLAVE_HIDDEN_CLIENTES,
  EVENTO_VISIBILIDAD_CLIENTES,
  filtrarClientesOcultos,
} from '../../../../backend/visibilidadClientes';
import { formatearClaveFecha } from './agendaClientesUtils';

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8000';

function useAgendaClientes() {
  const [clientes, setClientes] = useState([]);
  const [citas, setCitas] = useState([]);

  const token = localStorage.getItem('token');

  const crearHeaders = useCallback(
    (incluirContenido = false) => ({
      Authorization: `Token ${token}`,
      ...(incluirContenido && {
        'Content-Type': 'application/json',
      }),
    }),
    [token],
  );

  const cargarClientes = useCallback(async () => {
    try {
      const respuesta = await fetch(
        `${API_URL}/api/health-profiles/`,
        {
          headers: crearHeaders(),
        },
      );

      if (!respuesta.ok) {
        throw new Error(
          `No se pudieron cargar los clientes: ${respuesta.status}`,
        );
      }

      const datos = await respuesta.json();
      const lista = Array.isArray(datos) ? datos : [];

      const clientesNormalizados = lista.map((cliente) => ({
        ...cliente,
        id:
          cliente.id ||
          cliente.miembro ||
          cliente.miembro_id,
      }));

      setClientes(
        filtrarClientesOcultos(clientesNormalizados),
      );
    } catch (error) {
      console.error('Error cargando clientes:', error);
    }
  }, [crearHeaders]);

  const cargarCitas = useCallback(async () => {
    try {
      const respuesta = await fetch(
        `${API_URL}/api/citas/`,
        {
          headers: crearHeaders(),
        },
      );

      if (!respuesta.ok) {
        throw new Error(
          `No se pudieron cargar las citas: ${respuesta.status}`,
        );
      }

      const datos = await respuesta.json();
      setCitas(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error('Error cargando citas:', error);
    }
  }, [crearHeaders]);

  useEffect(() => {
    cargarClientes();
    cargarCitas();

    const recargarPorVisibilidad = () => {
      cargarClientes();
    };

    const recargarPorStorage = (evento) => {
      if (evento.key === CLAVE_HIDDEN_CLIENTES) {
        cargarClientes();
      }
    };

    window.addEventListener(
      EVENTO_VISIBILIDAD_CLIENTES,
      recargarPorVisibilidad,
    );

    window.addEventListener(
      'storage',
      recargarPorStorage,
    );

    return () => {
      window.removeEventListener(
        EVENTO_VISIBILIDAD_CLIENTES,
        recargarPorVisibilidad,
      );

      window.removeEventListener(
        'storage',
        recargarPorStorage,
      );
    };
  }, [cargarClientes, cargarCitas]);

  const guardarCita = async ({
    clienteId,
    fecha,
    inicio,
    fin,
  }) => {
    try {
      const respuesta = await fetch(
        `${API_URL}/api/citas/`,
        {
          method: 'POST',
          headers: crearHeaders(true),
          body: JSON.stringify({
            cliente: clienteId,
            fecha: formatearClaveFecha(fecha),
            hora_inicio: inicio,
            hora_fin: fin,
            coach: 1,
          }),
        },
      );

      if (!respuesta.ok) {
        throw new Error(
          `No se pudo guardar la cita: ${respuesta.status}`,
        );
      }

      await cargarCitas();
      return true;
    } catch (error) {
      console.error('Error guardando cita:', error);
      return false;
    }
  };

  const eliminarCita = async (idCita) => {
    try {
      const respuesta = await fetch(
        `${API_URL}/api/citas/${idCita}/`,
        {
          method: 'DELETE',
          headers: crearHeaders(),
        },
      );

      if (!respuesta.ok) {
        throw new Error(
          `No se pudo eliminar la cita: ${respuesta.status}`,
        );
      }

      await cargarCitas();
      return true;
    } catch (error) {
      console.error('Error eliminando cita:', error);
      return false;
    }
  };

  return {
    clientes,
    citas,
    guardarCita,
    eliminarCita,
  };
}

export default useAgendaClientes;