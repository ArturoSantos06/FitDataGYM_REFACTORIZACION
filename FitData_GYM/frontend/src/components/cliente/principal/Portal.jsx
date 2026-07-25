import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser, onAuthChanged } from '../../../firebase';
import Perfil from './Perfil';
import Membresia from './Membresia';
import Tienda from './Tienda';
import Navbar from './Navbar';
import VistaPlan from './VistaPlan';
import SoporteWhatsApp from '../../chat/SoporteWhatsApp';
import AssistantWidget from '../../asistente/WidgetAsistente';

const LOGIN_ROUTE = '/cliente/login';
const INITIAL_TAB = 'inicio';

const TAB_CONTENT = {
  inicio: Membresia,
  plan: VistaPlan,
  tienda: Tienda,
  mensajes: SoporteWhatsApp,
  perfil: Perfil,
};

function Portal() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(INITIAL_TAB);
  const [authReady, setAuthReady] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
    } finally {
      localStorage.removeItem('firebaseUser');
      navigate(LOGIN_ROUTE, { replace: true });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthChanged((user) => {
      setAuthReady(true);
      if (!user) {
        localStorage.removeItem('firebaseUser');
        navigate(LOGIN_ROUTE, { replace: true });
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  if (!authReady) {
    return (
      <div
        className="text-white bg-gray-900 h-screen flex items-center justify-center"
        role="status"
        aria-live="polite"
      >
        <p>Cargando sesión...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8 pb-24 md:pb-8">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Separador para el Navbar de escritorio y el Header de móvil */}
      <div className="h-16 md:h-24" />

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto pt-2 md:pt-4">
        {(() => {
          const ActiveContent = TAB_CONTENT[activeTab] ?? TAB_CONTENT[INITIAL_TAB];
          const usesAnimation = activeTab !== 'mensajes';

          return usesAnimation ? (
            <div className="animate-fade-in">
              <ActiveContent />
            </div>
          ) : (
            <ActiveContent />
          );
        })()}
      </main>

      <AssistantWidget context="cliente" />
    </div>
  );
}

export default Portal;
