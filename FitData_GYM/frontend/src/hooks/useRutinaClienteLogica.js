import { useState, useEffect, useMemo } from 'react';
import { auth } from '../firebase/config';
import { getMemberByAuthUid, getMemberByUserId, waitForAuthReady } from '../firebase/firestore';
import { ensureUserClaim } from '../firebase/auth';

/** aqui maestro esta la logica de la rutina */
export function useRutinaClienteLogica() {
  const [member, setMember] = useState(null);
  const [memberId, setMemberId] = useState(null);
  const [rutina, setRutina] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeDay, setActiveDay] = useState(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);
        setError('');
        let user = auth.currentUser;
        if (!user) user = await waitForAuthReady();
        if (!user) {
          setError('Debes iniciar sesión para ver tu rutina.');
          return;
        }
        await ensureUserClaim();
        let firestoreId = null;
        let memberData = null;
        const resByAuth = await getMemberByAuthUid(user.uid);
        if (resByAuth.success) {
          memberData = resByAuth.data;
          firestoreId = user.uid;
        } else {
          const resById = await getMemberByUserId(user.uid);
          if (resById.success) {
            memberData = resById.data;
            firestoreId = resById.data.id || user.uid;
          }
        }
        if (!memberData) throw new Error('No se pudo encontrar tu perfil de alumno.');
        setMember(memberData);
        setMemberId(firestoreId);
        const routineRes = await getRutinaParaCliente(firestoreId);
        if (!routineRes.success || !routineRes.data) throw new Error('No tienes ninguna rutina asignada actualmente.');
        setRutina(routineRes.data);
      } catch (err) {
        setError(err.message || 'Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };
    initialize();
  }, []);

  const sortedDays = useMemo(() => {
    if (!rutina || !rutina.activeDays) return [];
    return [...rutina.activeDays].sort((a, b) => {
      const order = {Lunes: 1, Martes: 2, Miércoles: 3, Jueves: 4, Viernes: 5, Sábado: 6, Domingo: 7};
      return (order[a] || 99) - (order[b] || 99);
    });
  }, [rutina]);

  const downloadFiles = async () => {};

  return { member, rutina, loading, error, activeDay, setActiveDay, sortedDays, downloadFiles };
}

export function formatDateTime(value) {
  if (!value) return 'Sin fecha';
  try {
    const dateValue = value?.toDate?.() || new Date(value);
    if (Number.isNaN(dateValue.getTime())) return 'Sin fecha';
    return dateValue.toLocaleString('es-MX', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return String(value); }
}

export const MUSCLE_TRANSLATIONS = {
  pectorals: 'Pectorales', delts: 'Deltoides', biceps: 'Biceps', triceps: 'Triceps', lats: 'Dorsales', glutes: 'Gluteos', quads: 'Cuadriceps', hamstrings: 'Isquiotibiales', calves: 'Pantorrillas', abs: 'Abdominales', forearms: 'Antebrazos', traps: 'Trapecios'
};

const EXERCISE_TEXT_REPLACEMENTS = [
  [/\bone arm\b/gi, 'un brazo'], [/\bshoulders\b/gi, 'deltoides'], [/\bshoulder\b/gi, 'deltoides'], [/\bshoulder-width\b/gi, 'ancho de hombros'], [/\bpress\b/gi, 'press'], [/\bstanding\b/gi, 'de pie'], [/\bcable\b/gi, 'cable'], [/\bexternal rotation\b/gi, 'rotacion externa'], [/\bhold\b/gi, 'sostener'], [/\braise\b/gi, 'elevacion'], [/\bbench\b/gi, 'banco'], [/\bdumbbell\b/gi, 'mancuerna'], [/\bbarbell\b/gi, 'barra'], [/\breps?\b/gi, 'repeticiones'], [/\bsets?\b/gi, 'series'], [/\brest\b/gi, 'descanso'], [/\bStep\s*:?\s*(\d+)\b/gi, 'Paso $1']
];

export function toSpanishExerciseText(value) {
  if (!value || typeof value !== 'string') return value || '';
  let output = value;
  EXERCISE_TEXT_REPLACEMENTS.forEach(([pattern, replacement]) => { output = output.replace(pattern, replacement); });
  return output;
}

export function hasEnglishRemainder(text) {
  if (!text) return false;
  return /[a-zA-Z]/.test(text); // Placeholder for actual implementation if needed. 
}