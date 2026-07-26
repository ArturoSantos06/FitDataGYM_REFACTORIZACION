import { useState, useEffect, useCallback } from 'react';
import { listarTodasAsignaciones, listarClientes } from '../../../../../backend/membresias';

const esMembresiaActiva = (item) => {
  if (!item?.endDate) return false;
  const end = new Date(item.endDate);
  if (Number.isNaN(end.getTime())) return false;
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  return end >= hoy;
};

const resolveUser = (item, usersById) => {
  const claves = [
    item.userId,
    String(item.userId || '').trim(),
    item.authUid,
    String(item.authUid || '').trim(),
    String(item.userEmail || '').trim().toLowerCase(),
  ].filter(Boolean);
  for (const k of claves) {
    if (usersById[k]) return usersById[k];
  }
  return {};
};

const deduplicarPorUsuario = (docs) =>
  Object.values(
    docs.reduce((acc, item) => {
      const key = item.userId || item.user || item.id;
      const prev = acc[key];
      if (!prev) { acc[key] = item; return acc; }
      const ts = (x) =>
        new Date(x.startDate || x.updatedAt?.toDate?.() || x.createdAt?.toDate?.() || 0).getTime();
      if (ts(item) > ts(prev)) acc[key] = item;
      return acc;
    }, {})
  );

const buildUsersMap = (usuarios) => {
  const map = {};
  usuarios.forEach((u) => {
    const authUid = String(u.authUid || '').trim();
    const email = String(u.email || '').trim().toLowerCase();
    map[u.id] = u;
    if (authUid) map[authUid] = u;
    if (u.legacyId != null) {
      map[String(u.legacyId)] = u;
      const num = Number(u.legacyId);
      if (!Number.isNaN(num)) map[num] = u;
    }
    if (email) map[email] = u;
  });
  return map;
};

export function useListaMembresias(refreshTrigger) {
  const [asignaciones, setAsignaciones] = useState([]);
  const [usersById, setUsersById] = useState({});
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('recent');
  const [tick, setTick] = useState(0);

  const onActualizar = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    (async () => {
      try {
        const [docs, usuarios] = await Promise.all([
          listarTodasAsignaciones(),
          listarClientes(),
        ]);
        setAsignaciones(deduplicarPorUsuario(docs));
        setUsersById(buildUsersMap(usuarios));
      } catch (e) {
        console.error('Error al cargar membresías:', e);
      }
    })();
  }, [refreshTrigger, tick]);

  const filtered = asignaciones.filter((item) => {
    const s = busqueda.toLowerCase();
    const u = resolveUser(item, usersById);
    const nombre = (u.username || item.userName || '').toLowerCase();
    const nombreCompleto = (`${u.firstName || ''} ${u.lastName || ''}`.trim() || item.userFullName || '').toLowerCase();
    const membresia = (item.membershipTypeName || item.membershipName || '').toLowerCase();
    const estado = esMembresiaActiva(item) ? 'activo' : 'vencido';
    const userId = item.userId ? String(item.userId) : '';
    return nombre.includes(s) || nombreCompleto.includes(s) || membresia.includes(s) || estado.includes(s) || userId.includes(s);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (orden === 'name') {
      const uA = resolveUser(a, usersById);
      const uB = resolveUser(b, usersById);
      return (uA.username || a.userName || '').localeCompare(uB.username || b.userName || '', 'es', { sensitivity: 'base' });
    }
    if (orden === 'expiration') return new Date(a.endDate) - new Date(b.endDate);
    return new Date(b.startDate) - new Date(a.startDate);
  });

  const items = sorted.map((item) => {
    const u = resolveUser(item, usersById);
    return {
      ...item,
      displayUsername: u.username || item.userName || 'N/A',
      displayFullName: `${u.firstName || ''} ${u.lastName || ''}`.trim() || item.userFullName || '',
      displayEmail: u.email || item.userEmail || 'N/A',
      activo: esMembresiaActiva(item),
    };
  });

  return {
    items,
    busqueda: { valor: busqueda, onChange: (e) => setBusqueda(e.target.value) },
    orden: { valor: orden, onChange: (e) => setOrden(e.target.value) },
    onActualizar,
  };
}
