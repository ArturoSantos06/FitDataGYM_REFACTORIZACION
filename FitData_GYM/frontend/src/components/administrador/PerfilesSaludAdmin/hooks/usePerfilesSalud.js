import { useState, useEffect, useCallback } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../../firebase/config';

const normalizeText = (value) => String(value || '').trim().toLowerCase();

const FILTROS_INICIALES = {
  heart_condition: null,
  high_blood_pressure: null,
  recent_injuries: null,
  medications: null,
  ageMin: '',
  ageMax: '',
};

export default function usePerfilesSalud(refreshTrigger) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(FILTROS_INICIALES);

  const loadProfiles = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const [profilesSnapshot, membersSnapshot] = await Promise.all([
        getDocs(collection(db, 'healthProfiles')),
        getDocs(collection(db, 'miembros')),
      ]);

      const membersById = new Map(membersSnapshot.docs.map((doc) => [doc.id, doc.data()]));

      const data = profilesSnapshot.docs.map((doc) => {
        const profileData = doc.data() || {};
        const linkedMember = membersById.get(String(profileData.memberId || doc.id || '').trim());
        return {
          id: doc.id,
          ...profileData,
          linkedEmail:
            profileData.email ||
            profileData.memberEmail ||
            profileData.userEmail ||
            profileData.cliente_email ||
            profileData.clienteEmail ||
            profileData.correo ||
            linkedMember?.email ||
            '',
        };
      });

      setProfiles(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfiles();
  }, [loadProfiles, refreshTrigger]);

  const filtered = profiles.filter((p) => {
    if (searchTerm) {
      const term = normalizeText(searchTerm);
      const matchesSearch = [
        p.memberName,
        p.userIdDisplay || p.id,
        p.username,
        p.email,
        p.memberEmail,
        p.userEmail,
        p.cliente_email,
        p.clienteEmail,
        p.correo,
        p.linkedEmail,
      ].some((campo) => normalizeText(campo).includes(term));
      if (!matchesSearch) return false;
    }

    if (filters.heart_condition !== null && p.heart_condition !== filters.heart_condition) return false;
    if (filters.high_blood_pressure !== null && p.high_blood_pressure !== filters.high_blood_pressure) return false;
    if (filters.recent_injuries !== null && p.recent_injuries !== filters.recent_injuries) return false;
    if (filters.medications !== null && p.medications !== filters.medications) return false;
    if (filters.ageMin && p.age < Number(filters.ageMin)) return false;
    if (filters.ageMax && p.age > Number(filters.ageMax)) return false;

    return true;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setFilters(FILTROS_INICIALES);
  };

  const activeFiltersCount =
    Object.values(filters).filter((v) => v !== null && v !== '').length + (searchTerm ? 1 : 0);

  return {
    filtered,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    resetFilters,
    activeFiltersCount,
  };
}
