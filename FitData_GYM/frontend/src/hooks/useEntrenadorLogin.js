import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getUserByAuthUid, getUserByEmail, logoutUser } from '../../firebase/auth';

/** aqui maestro cree este hook para el login */
export function useEntrenadorLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    /** pos esto funciona para checar sesion */
    const trainerToken = localStorage.getItem('trainer_token');
    if (trainerToken) navigate('/entrenador', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      /** esto sirve para loguear asincrono */
      const result = await loginUser(email, password);
      if (!result.success) throw new Error(result.error || 'Correo o contraseña incorrectos');
      const firebaseUser = result.user;
      let role = null;
      const byAuthUid = await getUserByAuthUid(firebaseUser.uid);
      if (byAuthUid.success) role = String(byAuthUid.data?.role || '').toLowerCase();
      if (!role) {
        const byEmail = await getUserByEmail(firebaseUser.email || '');
        if (byEmail.success) role = String(byEmail.data?.role || '').toLowerCase();
      }
      /** aqui puse profe la validacion de rol */
      if (role !== 'trainer' && role !== 'entrenador') {
        await logoutUser();
        localStorage.removeItem('trainer_token');
        localStorage.removeItem('trainer_username');
        throw new Error('Tu cuenta no tiene permisos de entrenador');
      }
      const idToken = await firebaseUser.getIdToken(true);
      localStorage.setItem('trainer_token', idToken);
      localStorage.setItem('trainer_username', firebaseUser.email || email);
      navigate('/entrenador', { replace: true });
    } catch (err) {
      /** maestro funciona asi el catch de errores */
      const msg = String(err?.message || '');
      const friendlyError = msg.includes('auth/invalid-credential') || msg.includes('auth/invalid-login-credentials') || msg.includes('auth/user-not-found') || msg.includes('auth/wrong-password') ? 'Correo o contraseña incorrecta' : msg.includes('auth/invalid-email') ? 'Correo electrónico inválido' : msg || 'No se pudo iniciar sesión';
      setError(friendlyError);
      localStorage.removeItem('trainer_token');
      localStorage.removeItem('trainer_username');
      setIsLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, showPassword, setShowPassword, error, isLoading, handleSubmit };
}
