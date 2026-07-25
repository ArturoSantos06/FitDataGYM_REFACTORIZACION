import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getUser, getUserByEmail } from '../../../firebase';

const NUTRITIONIST_ROLES = [
  'nutritionist', 'nutriologo', 'nutriologa', 'nutriologo/a', 'nutricionista', 'nutri',
];

export const useNutriSesion = (onLogin) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const normalizedEmail = String(email || '').trim().toLowerCase();
      const result = await loginUser(normalizedEmail, password);

      if (!result.success) {
        const loginError = new Error(result.error || 'Email o contraseña incorrectos');
        loginError.code = result.code || null;
        throw loginError;
      }

      const { user } = result;

      // Verificar rol de nutriólogo
      const userDoc = await getUser(user.uid);
      let finalRole = userDoc.success ? userDoc.data?.role : null;

      if (!finalRole) {
        const emailDoc = await getUserByEmail(user.email);
        finalRole = emailDoc.success ? emailDoc.data?.role : null;
      }

      const normalizedRole = String(finalRole || '').trim().toLowerCase();
      if (!NUTRITIONIST_ROLES.includes(normalizedRole)) {
        throw new Error('Acceso denegado: solo nutriólogos pueden acceder aquí');
      }

      // Forzar refresh del token
      let idToken = null;
      try {
        idToken = await user.getIdToken(true);
      } catch (tokenError) {
        console.warn('Token refresh failed:', tokenError);
      }

      if (idToken) localStorage.setItem('nutritionist_token', idToken);
      localStorage.setItem('nutritionist_username', user.email || normalizedEmail);
      localStorage.setItem('firebaseUser', JSON.stringify({ uid: user.uid, email: user.email }));

      if (typeof onLogin === 'function') {
        onLogin();
      } else {
        navigate('/nutriologo', { replace: true });
      }
    } catch (err) {
      const msg = err.message || '';
      let errorDisplay = 'Email o contraseña incorrectos';
      
      if (msg.includes('auth/invalid-email')) errorDisplay = 'Correo electrónico inválido';
      else if (msg.includes('Acceso denegado')) errorDisplay = msg;
      else if (!msg.includes('auth/')) errorDisplay = msg || 'Error al iniciar sesión';

      console.warn('NutriologoLogin error', msg, err.code || 'no-code');
      setError(`${errorDisplay}${err.code ? ` (${err.code})` : ''}`);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return {
    email, setEmail,
    password, setPassword,
    error, isLoading,
    showPassword, togglePassword,
    handleLogin
  };
};