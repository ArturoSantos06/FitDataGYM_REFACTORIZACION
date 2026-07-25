import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase';

const DEFAULT_MAX_CAPACITY = 80;
const ATTENDANCES_COLLECTION = 'asistencias';

const getMaxCapacity = (value) => {
  const capacity = Number(value);
  return Number.isFinite(capacity) && capacity > 0
    ? Math.floor(capacity)
    : DEFAULT_MAX_CAPACITY;
};

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 1);

  return { start, end };
};

const hasCheckout = (data) => Boolean(data.fecha_hora_salida || data.checkOutTime);

const getMemberKey = (data, documentId) => {
  const key = data.memberId || data.userId || documentId;
  return String(key).trim();
};

const countActiveMembers = (documents) => {
  const activeMembers = new Set();

  documents.forEach((data, documentId) => {
    if (hasCheckout(data)) return;

    const memberKey = getMemberKey(data, documentId);
    if (memberKey) activeMembers.add(memberKey);
  });

  return activeMembers.size;
};

const subscribeToTodayAttendances = (onUpdate, onError) => {
  const { start, end } = getTodayRange();
  const attendanceCollection = collection(db, ATTENDANCES_COLLECTION);
  const sources = new Map();
  const receivedSources = new Set();

  const attendanceQueries = [
    query(
      attendanceCollection,
      where('fecha_hora_entrada', '>=', start.toISOString()),
      where('fecha_hora_entrada', '<', end.toISOString())
    ),
    query(
      attendanceCollection,
      where('checkInTime', '>=', Timestamp.fromDate(start)),
      where('checkInTime', '<', Timestamp.fromDate(end))
    ),
  ];

  const updateDocuments = () => {
    const documents = new Map();
    sources.forEach((sourceDocuments) => {
      sourceDocuments.forEach((data, documentId) => documents.set(documentId, data));
    });

    onUpdate(countActiveMembers(documents), receivedSources.size === attendanceQueries.length);
  };

  const unsubscribe = attendanceQueries.map((attendanceQuery, sourceIndex) => onSnapshot(
    attendanceQuery,
    (snapshot) => {
      sources.set(sourceIndex, new Map(snapshot.docs.map((docSnap) => [docSnap.id, docSnap.data()])));
      receivedSources.add(sourceIndex);
      updateDocuments();
    },
    onError
  ));

  return () => unsubscribe.forEach((stopListening) => stopListening());
};

export const useOcupacionGym = () => {
  const maxCapacity = getMaxCapacity(import.meta.env.VITE_GYM_MAX_CAPACITY);
  const [activeCount, setActiveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleUpdate = (count, isReady) => {
      setActiveCount(count);
      if (isReady) {
        setError('');
        setLoading(false);
      }
    };

    const handleError = (snapshotError) => {
      setError(snapshotError?.message || 'No se pudo cargar el aforo en tiempo real.');
      setLoading(false);
    };

    return subscribeToTodayAttendances(handleUpdate, handleError);
  }, []);

  const occupancyPercent = Math.min(100, Math.round((activeCount / maxCapacity) * 100));
  const barClass = occupancyPercent >= 85
    ? 'from-rose-500 to-amber-400'
    : occupancyPercent >= 60
      ? 'from-amber-400 to-lime-400'
      : 'from-purple-500 to-blue-500';

  return {
    activeCount,
    barClass,
    error,
    loading,
    maxCapacity,
    occupancyPercent,
  };
};
