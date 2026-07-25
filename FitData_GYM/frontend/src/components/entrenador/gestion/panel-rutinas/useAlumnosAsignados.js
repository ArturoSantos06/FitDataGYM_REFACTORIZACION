import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import {
  ensureUserClaim,
  getAllMembers,
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
} from '../../../../firebase';
import {
  CLAVE_HIDDEN_CLIENTES,
  EVENTO_VISIBILIDAD_CLIENTES,
  filtrarClientesOcultos,
} from '../../../../backend/visibilidadClientes';
import {
  esAlumnoAsignado,
  obtenerLlavesClientesAsignados,
  obtenerLlavesEntrenador,
} from './alumnosRutinasUtils';

function useAlumnosAsignados() {
  const [alumnos, setAlumnos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const componenteMontado = useRef(true);

  const cargarAlumnos = useCallback(async () => {
    try {
      if (componenteMontado.current) {
        setCargando(true);
        setError('');
      }

      await ensureUserClaim();

      const usuarioAuth = getCurrentUser();

      if (!usuarioAuth) {
        throw new Error(
          'No hay sesión activa de entrenador',
        );
      }

      const consultaPorCorreo = usuarioAuth.email
        ? getUserByEmail(usuarioAuth.email, usuarioAuth.uid)
        : Promise.resolve({ success: false });

      const [
        resultadoMiembros,
        asignaciones,
        perfilPorAuthUid,
        perfilPorId,
        perfilPorCorreo,
      ] = await Promise.all([
        getAllMembers(),
        getDocs(
          collection(db, 'client_trainer_assignments'),
        ),
        getUserByAuthUid(usuarioAuth.uid),
        getUser(usuarioAuth.uid),
        consultaPorCorreo,
      ]);

      if (!resultadoMiembros.success) {
        throw new Error(
          resultadoMiembros.error ||
            'No se pudo cargar la lista de alumnos',
        );
      }

      const llavesEntrenador = obtenerLlavesEntrenador(
        usuarioAuth,
        [
          perfilPorAuthUid,
          perfilPorId,
          perfilPorCorreo,
        ],
      );

      const llavesClientesAsignados =
        obtenerLlavesClientesAsignados(
          asignaciones,
          llavesEntrenador,
        );

      const miembros = Array.isArray(resultadoMiembros.data)
        ? resultadoMiembros.data
        : [];

      const alumnosAsignados =
        filtrarClientesOcultos(miembros).filter((alumno) =>
          esAlumnoAsignado(
            alumno,
            llavesClientesAsignados,
          ),
        );

      if (componenteMontado.current) {
        setAlumnos(alumnosAsignados);
      }
    } catch (errorCarga) {
      if (componenteMontado.current) {
        setError(
          errorCarga instanceof Error
            ? errorCarga.message
            : 'Error al cargar alumnos',
        );
      }
    } finally {
      if (componenteMontado.current) {
        setCargando(false);
      }
    }
  }, []);

  useEffect(() => {
    componenteMontado.current = true;

    const recargarPorVisibilidad = () => {
      cargarAlumnos();
    };

    const recargarPorStorage = (evento) => {
      if (evento.key === CLAVE_HIDDEN_CLIENTES) {
        cargarAlumnos();
      }
    };

    cargarAlumnos();

    window.addEventListener(
      EVENTO_VISIBILIDAD_CLIENTES,
      recargarPorVisibilidad,
    );

    window.addEventListener(
      'storage',
      recargarPorStorage,
    );

    return () => {
      componenteMontado.current = false;

      window.removeEventListener(
        EVENTO_VISIBILIDAD_CLIENTES,
        recargarPorVisibilidad,
      );

      window.removeEventListener(
        'storage',
        recargarPorStorage,
      );
    };
  }, [cargarAlumnos]);

  return {
    alumnos,
    cargando,
    error,
  };
}

export default useAlumnosAsignados;