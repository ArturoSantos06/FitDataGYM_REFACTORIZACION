import { useEffect, useMemo, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import {
  getCurrentUser,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
} from '../../../../firebase';
import {
  asignacionPerteneceAlEntrenador,
  combinarMiembrosConSalud,
  filtrarClientesAsignados,
  obtenerClavesClienteAsignacion,
  obtenerClavesEntrenador,
} from './citasEntrenadorUtils';

function useClientesAsignadosEntrenador() {
  const [miembros, setMiembros] = useState([]);
  const [perfilesSalud, setPerfilesSalud] = useState([]);
  const [
    clavesClientesAsignados,
    setClavesClientesAsignados,
  ] = useState([]);

  const [asignacionesListas, setAsignacionesListas] =
    useState(false);
  const [miembrosListos, setMiembrosListos] =
    useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let componenteActivo = true;
    let desuscribirAsignaciones = null;

    async function escucharAsignaciones() {
      try {
        const usuarioFirebase = getCurrentUser();

        if (!usuarioFirebase) {
          if (componenteActivo) {
            setClavesClientesAsignados([]);
            setAsignacionesListas(true);
          }

          return;
        }

        const consultaPorCorreo = usuarioFirebase.email
          ? getUserByEmail(
              usuarioFirebase.email,
              usuarioFirebase.uid,
            )
          : Promise.resolve({ success: false });

        const [
          porAuthUid,
          porDocumento,
          porCorreo,
        ] = await Promise.all([
          getUserByAuthUid(usuarioFirebase.uid),
          getUser(usuarioFirebase.uid),
          consultaPorCorreo,
        ]);

        if (!componenteActivo) {
          return;
        }

        const clavesEntrenador = obtenerClavesEntrenador(
          usuarioFirebase,
          [porAuthUid, porDocumento, porCorreo],
        );

        const consultaAsignaciones = query(
          collection(db, 'client_trainer_assignments'),
        );

        desuscribirAsignaciones = onSnapshot(
          consultaAsignaciones,
          (snapshot) => {
            const clavesClientes = new Set();

            snapshot.docs.forEach((documento) => {
              const asignacion = documento.data() ?? {};

              if (
                !asignacionPerteneceAlEntrenador(
                  asignacion,
                  clavesEntrenador,
                )
              ) {
                return;
              }

              obtenerClavesClienteAsignacion(
                asignacion,
                documento.id,
              ).forEach((clave) =>
                clavesClientes.add(clave),
              );
            });

            if (componenteActivo) {
              setClavesClientesAsignados(
                Array.from(clavesClientes),
              );
              setAsignacionesListas(true);
            }
          },
          (errorAsignaciones) => {
            console.error(
              'Error al cargar asignaciones:',
              errorAsignaciones,
            );

            if (componenteActivo) {
              setError(
                'No se pudieron cargar las asignaciones del entrenador.',
              );
              setClavesClientesAsignados([]);
              setAsignacionesListas(true);
            }
          },
        );
      } catch (errorEntrenador) {
        console.error(
          'Error al resolver el entrenador:',
          errorEntrenador,
        );

        if (componenteActivo) {
          setError(
            'No se pudo identificar al entrenador autenticado.',
          );
          setClavesClientesAsignados([]);
          setAsignacionesListas(true);
        }
      }
    }

    escucharAsignaciones();

    return () => {
      componenteActivo = false;

      if (typeof desuscribirAsignaciones === 'function') {
        desuscribirAsignaciones();
      }
    };
  }, []);

  useEffect(() => {
    const consultaMiembros = query(
      collection(db, 'miembros'),
    );

    const consultaSalud = query(
      collection(db, 'healthProfiles'),
    );

    const desuscribirMiembros = onSnapshot(
      consultaMiembros,
      (snapshot) => {
        setMiembros(
          snapshot.docs.map((documento) => ({
            id: documento.id,
            ...documento.data(),
          })),
        );

        setMiembrosListos(true);
      },
      (errorMiembros) => {
        console.error(
          'Error al cargar miembros:',
          errorMiembros,
        );

        setError(
          'No se pudieron cargar los miembros.',
        );
        setMiembrosListos(true);
      },
    );

    const desuscribirSalud = onSnapshot(
      consultaSalud,
      (snapshot) => {
        setPerfilesSalud(
          snapshot.docs.map((documento) => ({
            id: documento.id,
            ...documento.data(),
          })),
        );
      },
      (errorSalud) => {
        console.error(
          'Error al cargar perfiles de salud:',
          errorSalud,
        );
      },
    );

    return () => {
      desuscribirMiembros();
      desuscribirSalud();
    };
  }, []);

  const clientes = useMemo(() => {
    const clavesAsignadas = new Set(
      clavesClientesAsignados,
    );

    const miembrosConSalud = combinarMiembrosConSalud(
      miembros,
      perfilesSalud,
    );

    return filtrarClientesAsignados(
      miembrosConSalud,
      clavesAsignadas,
    );
  }, [
    miembros,
    perfilesSalud,
    clavesClientesAsignados,
  ]);

  return {
    clientes,
    cargando:
      !asignacionesListas || !miembrosListos,
    error,
  };
}

export default useClientesAsignadosEntrenador;