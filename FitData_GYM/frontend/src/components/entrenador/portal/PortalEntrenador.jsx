import CitasEntrenador from '../gestion/CitasEntrenador';
import BandejaProfesionales from '../../chat/BandejaProfesionales';
import PerfilEntrenador from '../perfil/PerfilEntrenador';
import GestionEntrenador from '../gestion/GestionEntrenador';
import BarraNavegacionEntrenador from './BarraNavegacionEntrenador';
import InicioEntrenador from './InicioEntrenador';
import usarPortalEntrenador from '../../../hooks/usarPortalEntrenador';

function PortalEntrenador() {
  const { pestañaActiva, cambiarPestaña, cerrarSesion } = usarPortalEntrenador();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <BarraNavegacionEntrenador
        pestañaActiva={pestañaActiva}
        onCambiarPestaña={cambiarPestaña}
        onCerrarSesion={cerrarSesion}
      />

      <div className="h-20 md:h-24" />

      <div className="max-w-7xl mx-auto pt-2 md:pt-4 pb-20 md:pb-0">
        {pestañaActiva === 'inicio' && <InicioEntrenador />}
        {pestañaActiva === 'agenda' && <CitasEntrenador embedded />}
        {pestañaActiva === 'gestion' && <GestionEntrenador />}
        {pestañaActiva === 'mensajes' && <BandejaProfesionales role="trainer" />}
        {pestañaActiva === 'perfil' && <PerfilEntrenador />}
      </div>
    </div>
  );
}

export default PortalEntrenador;
