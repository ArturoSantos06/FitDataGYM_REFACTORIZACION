import { useCallback, useState } from 'react';
import { calcularObjetivosMacronutrientes } from '../utils/calculosNutricionales';

const FORMULARIO_INICIAL = {
  sexo: 'hombre',
  edad: '',
  pesoKg: '',
  alturaCm: '',
  nivelActividad: 'moderado',
  objetivo: 'mantener',
};

export const useFormularioMacros = () => {
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');

  const manejarCambio = useCallback((evento) => {
    const { name: nombre, value: valor } = evento.target;
    setFormulario((actual) => ({ ...actual, [nombre]: valor }));
    setError('');
  }, []);

  const manejarEnvio = useCallback((evento) => {
    evento.preventDefault();
    setError('');

    try {
      setResultado(calcularObjetivosMacronutrientes(formulario));
    } catch (errorCalculo) {
      setResultado(null);
      setError(errorCalculo.message || 'No se pudo ejecutar el cálculo');
    }
  }, [formulario]);

  return {
    formulario,
    resultado,
    error,
    manejarCambio,
    manejarEnvio,
  };
};
