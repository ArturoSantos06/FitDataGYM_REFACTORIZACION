import { useState, useEffect } from 'react';
import AssistantWidget from '../../asistente/WidgetAsistente';
import SeccionHero from './partes/SeccionHero';
import SeccionSobreNosotros from './partes/SeccionSobreNosotros';
import SeccionServicios from './partes/SeccionServicios';
import SeccionNoticias from './partes/SeccionNoticias';
import SeccionContacto from './partes/SeccionContacto';
import PiePagina from './partes/PiePagina';
import ModalSeleccionUsuario from './partes/ModalSeleccionUsuario';

function LandingPage() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    localStorage.removeItem('token');
  }, []);

  return (
    <div className="bg-black text-gray-100 font-sans scroll-smooth">
      <SeccionHero onOpenModal={() => setShowModal(true)} />
      <SeccionSobreNosotros />
      <SeccionServicios />
      <SeccionNoticias />
      <SeccionContacto />
      <PiePagina />

      {showModal && <ModalSeleccionUsuario onClose={() => setShowModal(false)} />}

      <AssistantWidget context="public" />
    </div>
  );
}

export default LandingPage;
