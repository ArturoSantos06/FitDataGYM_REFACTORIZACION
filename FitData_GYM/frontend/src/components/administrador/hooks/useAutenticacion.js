import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getUser, getUserByEmail, createUser, updateUser, logoutUser } from '../../../firebase';

const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Correo o contraseña incorrecta',
  'auth/user-not-found': 'Correo o contraseña incorrecta',
  'auth/wrong-password': 'Correo o contraseña incorrecta',
  'auth/invalid-login-credentials': 'Correo o contraseña incorrecta',
  'auth/invalid-email': 'Correo electrónico inválido',
};

const getLoginErrorMessage = (error) =>
  AUTH_ERROR_MESSAGES[error?.code] || error?.message || 'Ocurrió un error al iniciar sesión';

// SEC-03: escribe role:'admin' desde el cliente. Se queda hasta que el backfill
// de custom claims (equipo de reglas) corra; ver memoria fitdata-escalada-privilegios.
async function asegurarPerfilAdmin(user, email) {
  const perfilAdmin = {
    email: user.email,
    displayName: user.displayName || email.split('@')[0],
    role: 'admin',
    authUid: user.uid,
    isActive: true,
  };

  const actualizado = await updateUser(user.uid, perfilAdmin);
  if (!actualizado?.success) {
    const creado = await createUser(user.uid, perfilAdmin);
    if (!creado?.success) {
      throw new Error(creado?.error || actualizado?.error || 'No se pudo sincronizar el perfil de administrador');
    }
  }
}

export function useAutenticacion(onLogin) {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const datos = new FormData(e.target);
    const email = datos.get('email');
    const password = datos.get('password');

    try {
      const result = await loginUser(email, password);
      if (!result.success) {
        const loginError = new Error(result.error);
        loginError.code = result.code;
        throw loginError;
      }

      const { user } = result;
      const userDoc = await getUser(user.uid);
      const roleFromUid = userDoc.success ? userDoc.data?.role : null;

      if (roleFromUid !== 'admin') {
        if (user.email === 'admin@fitdata.gym') {
          await asegurarPerfilAdmin(user, email);
        } else {
          const emailDoc = await getUserByEmail(user.email);
          const roleFromEmail = emailDoc.success ? emailDoc.data?.role : null;

          if (roleFromEmail === 'admin') {
            await asegurarPerfilAdmin(user, email);
          } else {
            await logoutUser();
            throw new Error('Acceso denegado: solo administradores pueden acceder aquí');
          }
        }
      }

      localStorage.setItem('firebaseUser', JSON.stringify({ uid: user.uid, email: user.email }));
      onLogin();
    } catch (err) {
      setError(getLoginErrorMessage(err));
      localStorage.removeItem('firebaseUser');
      localStorage.removeItem('token');
      console.error(err);
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    handleSubmit,
    volver: () => navigate('/'),
  };
}
