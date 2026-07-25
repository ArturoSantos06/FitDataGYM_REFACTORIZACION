import { useCallback, useState } from 'react';
import { cambiarContrasenaNutriologo } from '../servicios/perfilNutriologo';

const FORMULARIO_INICIAL = {
  contrasenaActual: '',
  nuevaContrasena: '',
  confirmacion: '',
};

export default function useCambioContrasena() {
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  const manejarCambio = useCallback((evento) => {
    const { name: nombre, value: valor } = evento.target;
    setFormulario((actual) => ({ ...actual, [nombre]: valor }));
    setError('');
    setExito('');
  }, []);

  const manejarEnvio = useCallback(async (evento) => {
    evento.preventDefault();
    if (cargando) return;
    setError('');
    setExito('');
    const { contrasenaActual, nuevaContrasena, confirmacion } = formulario;

    if (!contrasenaActual || !nuevaContrasena || !confirmacion) {
      setError('Completa los campos requeridos');
      return;
    }
    if (nuevaContrasena.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres');
      return;
    }
    if (nuevaContrasena !== confirmacion) {
      setError('La confirmación no coincide');
      return;
    }

    setCargando(true);
    try {
      await cambiarContrasenaNutriologo(contrasenaActual, nuevaContrasena);
      setFormulario(FORMULARIO_INICIAL);
      setExito('Contraseña actualizada correctamente');
    } catch (errorCambio) {
      setError(errorCambio.message || 'No se pudo cambiar la contraseña');
    } finally {
      setCargando(false);
    }
  }, [cargando, formulario]);

  return {
    formulario,
    cargando,
    error,
    exito,
    manejarCambio,
    manejarEnvio,
  };
}
