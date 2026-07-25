import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../firebase';

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Correo o contraseña incorrectos',
  'auth/user-not-found': 'Correo o contraseña incorrectos',
  'auth/wrong-password': 'Correo o contraseña incorrectos',
  'auth/invalid-email': 'Correo electrónico inválido',
  'auth/too-many-requests': 'Demasiados intentos fallidos. Intenta más tarde',
};

const getLoginErrorMessage = (error) => (
  AUTH_ERROR_MESSAGES[error?.code] || 'Correo o contraseña incorrectos'
);

const persistUser = (user) => {
  localStorage.setItem('firebaseUser', JSON.stringify({
    uid: user.uid,
    email: user.email,
    displayName: user.displayName || null,
  }));
};

export function useSesionCliente() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await loginUser(email, password);

      if (!result.success) {
        const loginError = new Error(result.error);
        loginError.code = result.code;
        throw loginError;
      }

      try {
        await result.user.getIdToken(true);
      } catch (tokenError) {
        console.warn('No se pudo refrescar el token después del login:', tokenError);
      }

      persistUser(result.user);
      navigate('/cliente');
    } catch (loginError) {
      setError(getLoginErrorMessage(loginError));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    isLoading,
    showPassword,
    setEmail,
    setPassword,
    setShowPassword,
    handleSubmit,
  };
}
