import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  suscribirAsignacionesNutriologo,
  suscribirCitasNutriologo,
  suscribirMiembrosAgenda,
} from '../servicios/agendaNutri';
import {
  filtrarMiembrosAsignados,
  obtenerClaseAnchoAgenda,
} from '../utils/agendaNutri';

export default function useAgendaNutri() {
  const [miembros, setMiembros] = useState([]);
  const [citas, setCitas] = useState([]);
  const [idsClientesAsignados, setIdsClientesAsignados] = useState([]);
  const [asignacionesListas, setAsignacionesListas] = useState(false);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);
  const [errorAgenda, setErrorAgenda] = useState('');

  useEffect(() => {
    let cancelado = false;
    let cancelarSuscripcion = () => {};
    const manejarError = (fallo) => {
      if (cancelado) return;
      setIdsClientesAsignados([]);
      setAsignacionesListas(true);
      setErrorAgenda(fallo?.message || 'No se pudieron cargar las asignaciones.');
    };

    suscribirAsignacionesNutriologo(
      (ids) => {
        if (cancelado) return;
        setIdsClientesAsignados(ids);
        setAsignacionesListas(true);
      },
      manejarError,
    )
      .then((cancelar) => {
        if (cancelado) cancelar();
        else cancelarSuscripcion = cancelar;
      })
      .catch(manejarError);

    return () => {
      cancelado = true;
      cancelarSuscripcion();
    };
  }, []);

  useEffect(() => {
    const manejarError = (fallo) => {
      setErrorAgenda(fallo?.message || 'No se pudieron cargar los pacientes.');
    };
    return suscribirMiembrosAgenda(setMiembros, manejarError);
  }, []);

  useEffect(() => {
    const manejarError = (fallo) => {
      setErrorAgenda(fallo?.message || 'No se pudieron cargar las citas.');
    };
    return suscribirCitasNutriologo(setCitas, manejarError);
  }, []);

  const miembrosVisibles = useMemo(
    () => filtrarMiembrosAsignados(miembros, idsClientesAsignados),
    [idsClientesAsignados, miembros],
  );
  const claseAncho = obtenerClaseAnchoAgenda(
    miembrosVisibles.length,
    asignacionesListas,
  );

  const abrirExpediente = useCallback((miembro) => {
    setMiembroSeleccionado(miembro);
  }, []);
  const cerrarExpediente = useCallback(() => {
    setMiembroSeleccionado(null);
  }, []);

  return {
    abrirExpediente,
    asignacionesListas,
    citas,
    claseAncho,
    cerrarExpediente,
    errorAgenda,
    miembroSeleccionado,
    miembrosVisibles,
  };
}
