import { useState, useMemo } from 'react';
import { calculateMacroTargets } from '../../utils/nutritionCalculations'; // (Ajusta la ruta si decides mover el archivo a tu utils local)

const defaultForm = {
  sex: 'hombre',
  age: '',
  weightKg: '',
  heightCm: '',
  activityLevel: 'moderado',
  goal: 'mantener'
};

export const useFormularioMacros = () => {
  const [form, setForm] = useState(defaultForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const activityOptions = useMemo(
    () => [
      { value: 'sedentario', label: 'Sedentario' },
      { value: 'ligero', label: 'Ligero (1-3 días/semana)' },
      { value: 'moderado', label: 'Moderado (3-5 días/semana)' },
      { value: 'intenso', label: 'Intenso (6-7 días/semana)' },
      { value: 'atleta', label: 'Atleta / doble sesión' }
    ],
    []
  );

  const goalOptions = useMemo(
    () => [
      { value: 'perder_grasa', label: 'Perder grasa' },
      { value: 'mantener', label: 'Mantener peso' },
      { value: 'ganar_musculo', label: 'Ganar músculo' }
    ],
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    try {
      const calculatedResult = calculateMacroTargets(form);
      setResult(calculatedResult);
    } catch (submitError) {
      setResult(null);
      setError(submitError.message || 'No se pudo ejecutar el cálculo');
    }
  };

  return {
    form,
    result,
    error,
    activityOptions,
    goalOptions,
    handleChange,
    handleSubmit
  };
};