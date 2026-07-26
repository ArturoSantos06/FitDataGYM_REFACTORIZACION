import { useEffect, useState } from 'react';
import { createHealthProfile, getHealthProfileByMemberId, getMemberByEmail } from '../../../../../firebase';
import { FORM_INICIAL, perfilAFormData, formDataAPerfilPayload } from './mapeoFichaSalud';

export default function useFormularioSaludAdmin(miembroEmail, onSaved) {
  const [memberId, setMemberId] = useState(null);
  const [memberName, setMemberName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('form');
  const [formData, setFormData] = useState(FORM_INICIAL);

  useEffect(() => {
    if (!miembroEmail) return;

    const loadMember = async () => {
      setError('');
      setLoading(true);

      try {
        const memberResult = await getMemberByEmail(miembroEmail);
        if (!memberResult.success) {
          throw new Error(memberResult.error || 'Miembro no encontrado');
        }

        setMemberId(memberResult.data.id);
        setMemberName(memberResult.data.nombre || memberResult.data.firstName || miembroEmail);

        const profileResult = await getHealthProfileByMemberId(memberResult.data.id);
        if (profileResult.success && profileResult.data) {
          setFormData(perfilAFormData(profileResult.data));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMember();
  }, [miembroEmail]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const finalValue = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));
  };

  const setCondicionCorazon = (valor) => setFormData((prev) => ({ ...prev, condicionCorazon: valor }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!memberId) {
      setError('No se pudo determinar el ID del miembro.');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const result = await createHealthProfile(formDataAPerfilPayload({ memberId, memberName, miembroEmail, formData }));

      if (!result.success) {
        throw new Error(result.error || 'Error guardando ficha médica');
      }

      setStatus('success');
      onSaved?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return {
    memberId,
    memberName,
    loading,
    saving,
    error,
    status,
    formData,
    handleChange,
    setCondicionCorazon,
    handleSubmit,
  };
}
