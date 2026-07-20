import { useState, useEffect } from 'react';
import { waitForAuthReady } from '../firebase/firestore';
import { getClientTrainerAssignment, removeTrainerFromClient } from '../firebase/firestore';

/** aqui maestro puse el hook para el cliente entrenador */
export function useEntrenadorClienteLogica() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceStatus, setServiceStatus] = useState('active');
  const [loading, setLoading] = useState(true);
  const [clienteId, setClienteId] = useState(null);
  const [trainerData, setTrainerData] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const user = await waitForAuthReady();
      if (user) setClienteId(user.uid);
      else setLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    const fetchMiEntrenador = async () => {
      if (!clienteId) {
        setLoading(false);
        return;
      }
      try {
        const assignment = await getClientTrainerAssignment(clienteId);
        if (assignment.success && assignment.data) {
          setServiceStatus(assignment.data.status === 'active' ? 'active' : 'cancelled');
        } else {
          setServiceStatus('cancelled');
        }
      } catch {
        setServiceStatus('cancelled');
      } finally {
        setLoading(false);
      }
    };
    fetchMiEntrenador();
  }, [clienteId]);

  const handleCancelService = async () => {
    try {
      const result = await removeTrainerFromClient(clienteId);
      if (!result.success) throw new Error(result.error || 'No se pudo cancelar el servicio');
      setServiceStatus('cancelled');
      setIsModalOpen(false);
    } catch (err) {
      alert("Error al cancelar el servicio: " + err.message);
    }
  };

  return { isModalOpen, setIsModalOpen, serviceStatus, setServiceStatus, loading, setLoading, clienteId, trainerData, setTrainerData, errorMsg, setErrorMsg, handleCancelService };
}