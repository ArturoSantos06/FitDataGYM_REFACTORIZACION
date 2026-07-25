import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import {
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
} from '../../../../firebase';
import {
  construirPerfilesAsignados,
  obtenerLlavesClientesAsignados,
  obtenerLlavesEntrenador,
} from './perfilesClientesUtils';

function usePerfilesClientes(refreshTrigger) {
  const [perfiles, setPerfiles] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let componenteActivo = true;

    async function cargarPerfiles() {
      try {
        setCargando(true);
        setError('');

        const usuario = getCurrentUser();

        if (!usuario) {
          if (componenteActivo) {
            setPerfiles([]);
          }
          return;
        }

        const consultaCorreo = usuario.email
          ? getUserByEmail(usuario.email, usuario.uid)
          : Promise.resolve({ success: false });

        const [
          asignaciones,
          perfilesSalud,
          miembros,
          perfilPorAuth,
          perfilPorId,
          perfilPorCorreo,
        ] = await Promise.all([
          getDocs(
            collection(db, 'client_trainer_assignments'),
          ),
          getDocs(collection(db, 'healthProfiles')),
          getDocs(collection(db, 'miembros')),
          getUserByAuthUid(usuario.uid),
          getUser(usuario.uid),
          consultaCorreo,
        ]);

        const llavesEntrenador = obtenerLlavesEntrenador(
          usuario,
          [perfilPorAuth, perfilPorId, perfilPorCorreo],
        );

        const llavesClientes =
          obtenerLlavesClientesAsignados(
            asignaciones,
            llavesEntrenador,
          );

        const perfilesAsignados =
          construirPerfilesAsignados(
            miembros.docs,
            perfilesSalud.docs,
            llavesClientes,
          );

        if (componenteActivo) {
          setPerfiles(perfilesAsignados);
        }
      } catch (errorCarga) {
        console.error(
          'Error al cargar perfiles médicos:',
          errorCarga,
        );

        if (componenteActivo) {
          setError(
            `Error al conectar con la base de datos: ${
              errorCarga.message || 'Error desconocido'
            }`,
          );
        }
      } finally {
        if (componenteActivo) {
          setCargando(false);
        }
      }
    }

    cargarPerfiles();

    return () => {
      componenteActivo = false;
    };
  }, [refreshTrigger]);

  return {
    perfiles,
    cargando,
    error,
  };
}

export default usePerfilesClientes;