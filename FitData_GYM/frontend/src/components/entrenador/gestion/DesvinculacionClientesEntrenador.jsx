import { useEffect, useMemo, useState } from 'react';
import {
  archivarClienteDesvinculacion,
  eliminarClienteDesvinculacion,
  obtenerClientesDesvinculacion,
} from '../../../backend/clientesDesvinculacionServicio';
import {
  filtrarClientesOcultos,
  ocultarClienteLocalmente,
} from '../../../backend/visibilidadClientes';
import FiltrosDesvinculacion from './FiltrosDesvinculacion';
import TablaDesvinculacionClientes from './TablaDesvinculacionClientes';

function DesvinculacionClientesEntrenador() {
  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [mostrandoArchivados, setMostrandoArchivados] = useState(false);

  useEffect(() => {
    async function cargarClientes() {
      try {
        const clientesServidor = await obtenerClientesDesvinculacion();
        setClientes(filtrarClientesOcultos(clientesServidor));
      } catch (error) {
        console.error(
          'Error al cargar clientes para desvinculación:',
          error,
        );
      } finally {
        setCargando(false);
      }
    }

    cargarClientes();
  }, []);

  const clientesFiltrados = useMemo(() => {
    const busqueda = terminoBusqueda.trim().toLowerCase();

    return clientes.filter((cliente) => {
      const nombre = String(cliente.nombre ?? '').toLowerCase();
      const coincideBusqueda = nombre.includes(busqueda);
      const coincideEstado = mostrandoArchivados
        ? cliente.archivado
        : !cliente.archivado;

      return coincideBusqueda && coincideEstado && !cliente.eliminado;
    });
  }, [clientes, terminoBusqueda, mostrandoArchivados]);

  const actualizarCliente = (idCliente, cambios) => {
    setClientes((clientesActuales) =>
      clientesActuales.map((cliente) =>
        cliente.id === idCliente
          ? { ...cliente, ...cambios }
          : cliente,
      ),
    );
  };

  const alternarArchivado = async (idCliente) => {
    const cliente = clientes.find((item) => item.id === idCliente);

    if (!cliente) return;

    const nuevoEstado = !cliente.archivado;
    actualizarCliente(idCliente, { archivado: nuevoEstado });

    try {
      const resultado = await archivarClienteDesvinculacion(
        idCliente,
        nuevoEstado,
      );

      if (!resultado?.success) {
        console.warn(
          'No se pudo sincronizar el archivado:',
          resultado?.error || 'sin detalle',
        );
      }
    } catch (error) {
      console.warn('Se mantuvo el cambio local de archivado:', error);
    }
  };

  const eliminarCliente = async (idCliente) => {
    const confirmado = window.confirm(
      '¿Estás seguro de eliminar este cliente? Desaparecerá de tu lista',
    );

    if (!confirmado) return;

    const cliente = clientes.find((item) => item.id === idCliente) ?? {
      id: idCliente,
    };

    ocultarClienteLocalmente(cliente);
    actualizarCliente(idCliente, { eliminado: true });

    try {
      const resultado = await eliminarClienteDesvinculacion(idCliente);

      if (!resultado?.success) {
        console.warn(
          'No se pudo sincronizar la eliminación:',
          resultado?.error || 'sin detalle',
        );
      }
    } catch (error) {
      console.warn('Se mantuvo la eliminación local:', error);
    }
  };

  return (
    <div className="mt-6 rounded-xl border-t-4 border-teal-500 bg-gray-800 p-6 font-sans text-gray-100 shadow-xl">
      <h2 className="bg-linear-to-br from-teal-400 to-green-400 bg-clip-text text-2xl font-bold text-transparent">
        Desvinculación y Pagos
      </h2>

      <FiltrosDesvinculacion
        terminoBusqueda={terminoBusqueda}
        onCambiarBusqueda={setTerminoBusqueda}
        mostrandoArchivados={mostrandoArchivados}
        onAlternarArchivados={() =>
          setMostrandoArchivados((estado) => !estado)
        }
      />

      <TablaDesvinculacionClientes
        clientes={clientesFiltrados}
        cargando={cargando}
        onArchivar={alternarArchivado}
        onEliminar={eliminarCliente}
      />
    </div>
  );
}

export default DesvinculacionClientesEntrenador;