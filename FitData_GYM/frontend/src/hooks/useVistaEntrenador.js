import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMembers, logoutUser, ensureUserClaim } from '../../firebase/firestore';

/** aqui maestro extraje toda la data de la vista */
export function useVistaEntrenador() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        setError('');
        await ensureUserClaim();
        const result = await getAllMembers();
        if (!result.success) throw new Error(result.error || 'No se pudo cargar la lista de alumnos asignados');
        /** esto sirve para guardar a chavos */
        setMembers(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        setError(err.message || 'Error al cargar alumnos');
      } finally {
        setIsLoading(false);
      }
    };
    fetchMembers();
  }, []);

  const assignedMembers = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();
    return members.filter((member) => {
      const matricula = String(member.matricula || member.id || '').toLowerCase();
      const fullName = `${member.nombre || ''} ${member.apellido || ''}`.trim().toLowerCase();
      if (!normalized) return true;
      return matricula.includes(normalized) || fullName.includes(normalized);
    });
  }, [members, searchTerm]);

  /** aqui puse profe como salir de sesion */
  const handleLogout = async () => {
    localStorage.removeItem('trainer_token');
    localStorage.removeItem('trainer_username');
    await logoutUser();
    navigate('/entrenador/login');
  };

  const handleNavigate = (path, state) => navigate(path, { state });

  return { searchTerm, setSearchTerm, isLoading, error, assignedMembers, handleLogout, handleNavigate };
}
