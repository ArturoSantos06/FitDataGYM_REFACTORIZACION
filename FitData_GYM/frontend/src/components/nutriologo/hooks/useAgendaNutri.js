import { useMemo, useState, useEffect } from 'react';
import { db } from "../../../firebase/config";
import { collection, onSnapshot, query } from 'firebase/firestore';
import { getCurrentUser, getUser, getUserByAuthUid, getUserByEmail } from '../../../firebase';

export default function useAgendaNutri() {
  const [miembros, setMiembros] = useState([]);
  const [miembroSeleccionado, setMiembroSeleccionado] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [citas, setCitas] = useState([]);
  const [idsClientesAsignados, setIdsClientesAsignados] = useState([]);
  const [asignacionesListas, setAsignacionesListas] = useState(false);

  const normalizarClave = (valor) => String(valor || '').trim().toLowerCase();

  const busquedaAsignados = useMemo(() => {
    const conjunto = new Set();
    idsClientesAsignados.forEach((id) => {
      const normalizado = normalizarClave(id);
      if (normalizado) conjunto.add(normalizado);
    });
    return conjunto;
  }, [idsClientesAsignados]);

  const miembrosVisibles = useMemo(() => {
    if (!busquedaAsignados.size) return [];

    return miembros.filter((miembro) => {
      const claves = [miembro.id, miembro.userId, miembro.authUid, miembro.email];
      return claves.some((clave) => busquedaAsignados.has(normalizarClave(clave)));
    });
  }, [miembros, busquedaAsignados]);

  const clasesAnchoLayout = useMemo(() => {
    if (!asignacionesListas || miembrosVisibles.length === 0) return 'max-w-3xl';
    if (miembrosVisibles.length === 1) return 'max-w-[430px]';
    if (miembrosVisibles.length === 2) return 'max-w-[760px]';
    if (miembrosVisibles.length <= 4) return 'max-w-[1080px]';
    return 'max-w-6xl';
  }, [asignacionesListas, miembrosVisibles.length]);

  useEffect(() => {
    let desuscribirAsignaciones = null;

    const resolverLlavesNutriologo = async () => {
      try {
        const firebaseUser = getCurrentUser();
        if (!firebaseUser) {
          setIdsClientesAsignados([]);
          setAsignacionesListas(true);
          return;
        }

        const porAuthUid = await getUserByAuthUid(firebaseUser.uid);
        const porDocId = await getUser(firebaseUser.uid);
        const porEmail = firebaseUser.email
          ? await getUserByEmail(firebaseUser.email, firebaseUser.uid)
          : { success: false };

        const candidatos = [
          porAuthUid?.success ? porAuthUid.data : null,
          porDocId?.success ? porDocId.data : null,
          porEmail?.success ? porEmail.data : null,
        ].filter(Boolean);

        const llavesNutri = new Set([
          firebaseUser.uid,
          firebaseUser.email,
        ].map(normalizarClave).filter(Boolean));

        candidatos.forEach((candidato) => {
          [candidato.id, candidato.authUid, candidato.legacyId, candidato.email].forEach((clave) => {
            const normalizada = normalizarClave(clave);
            if (normalizada) llavesNutri.add(normalizada);
          });
        });

        const consultaAsignaciones = query(collection(db, 'client_nutritionist_assignments'));
        desuscribirAsignaciones = onSnapshot(consultaAsignaciones, (snapshot) => {
          const siguientesIds = new Set();

          snapshot.docs.forEach((docSnap) => {
            const asignacion = docSnap.data() || {};
            const estado = String(asignacion.status || 'active').toLowerCase();
            const idNutriAsignado = normalizarClave(asignacion.nutritionistId);
            const emailNutriAsignado = normalizarClave(asignacion.nutritionistEmail);
            const coincideNutri = llavesNutri.has(idNutriAsignado) || llavesNutri.has(emailNutriAsignado);

            if (!coincideNutri || estado !== 'active') return;

            const idCliente = String(asignacion.clientId || asignacion.memberId || docSnap.id || '').trim();
            if (idCliente) siguientesIds.add(idCliente);
          });

          setIdsClientesAsignados(Array.from(siguientesIds));
          setAsignacionesListas(true);
        }, (error) => {
          console.error('Error al cargar asignaciones del nutriólogo:', error);
          setIdsClientesAsignados([]);
          setAsignacionesListas(true);
        });
      } catch (error) {
        console.error('Error al resolver datos del nutriólogo autenticado:', error);
        setIdsClientesAsignados([]);
        setAsignacionesListas(true);
      }
    };

    resolverLlavesNutriologo();

    return () => {
      if (typeof desuscribirAsignaciones === 'function') {
        desuscribirAsignaciones();
      }
    };
  }, []);

  useEffect(() => {
    const qMiembros = query(collection(db, "miembros"));
    const qSalud = query(collection(db, "healthProfiles"));
    let miembrosActuales = [];
    let mapaSaludActual = {};

    const combinarDatos = () => {
      if (miembrosActuales.length === 0) return;
      const finales = miembrosActuales.map(m => {
        const colorBase = m.avatarColor || '#06b6d4';
        const colorHex = colorBase.startsWith('#') ? colorBase : `#${colorBase}`;
        return {
          ...m,
          edad: mapaSaludActual[m.id]?.age || mapaSaludActual[m.userId]?.age || null,
          colorFondo: colorHex 
        };
      });
      setMiembros(finales);
    };

    const desuscribirMiembros = onSnapshot(qMiembros, (snapM) => {
      miembrosActuales = snapM.docs.map(d => ({ id: d.id, ...d.data() }));
      combinarDatos();
    });

    const desuscribirSalud = onSnapshot(qSalud, (snapS) => {
      const mapaSalud = {};
      snapS.docs.forEach(d => { mapaSalud[d.data().userId || d.id] = d.data(); });
      mapaSaludActual = mapaSalud;
      combinarDatos();
    });

    return () => { desuscribirMiembros(); desuscribirSalud(); };
  }, []);

  useEffect(() => {
    const qCitas = query(collection(db, "citas"));
    const desuscribirCitas = onSnapshot(qCitas, (snap) => {
      setCitas(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => desuscribirCitas();
  }, []);

  return {
    miembrosVisibles,
    miembroSeleccionado,
    setMiembroSeleccionado,
    modalAbierto,
    setModalAbierto,
    citas,
    asignacionesListas,
    clasesAnchoLayout
  };
}