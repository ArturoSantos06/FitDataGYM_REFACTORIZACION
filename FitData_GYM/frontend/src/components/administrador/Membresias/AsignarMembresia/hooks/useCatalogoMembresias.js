import { useEffect, useState } from 'react';
import { listarClientes, listarTiposMembresia } from '../../../../backend/membresias';

export function useCatalogoMembresias() {
  const [clientes, setClientes] = useState([]);
  const [tiposMembresia, setTiposMembresia] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resultadoClientes = await listarClientes();
        if (resultadoClientes.success) setClientes(resultadoClientes.data);

        const resultadoTipos = await listarTiposMembresia();
        if (resultadoTipos.success) setTiposMembresia(resultadoTipos.data);
      } catch (error) {
        console.error(error);
      }
    };
    cargarDatos();
  }, []);

  return { clientes, tiposMembresia };
}
