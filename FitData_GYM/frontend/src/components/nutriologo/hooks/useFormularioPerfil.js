import { useCallback, useState } from 'react';

export default function useFormularioPerfil(usuario, alGuardar) {
  const [formulario, setFormulario] = useState({ ...usuario });
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState('');

  const manejarCambio = useCallback((evento) => {
    const { name: nombre, value } = evento.target;
    const valor = nombre === 'telefono'
      ? value.replace(/\D/g, '').slice(0, 10)
      : value;
    setFormulario((actual) => ({ ...actual, [nombre]: valor }));
    setError('');
  }, []);

  const manejarEnvio = useCallback(async (evento) => {
    evento.preventDefault();
    if (guardando) return;
    setError('');
    setGuardando(true);
    try {
      await alGuardar(formulario);
    } catch (errorGuardado) {
      setError(errorGuardado.message || 'No se pudo actualizar el perfil');
    } finally {
      setGuardando(false);
    }
  }, [alGuardar, formulario, guardando]);

  return {
    formulario,
    guardando,
    error,
    manejarCambio,
    manejarEnvio,
  };
}
