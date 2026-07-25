import BarraNavegacionNutri from './BarraNavegacionNutri';
import InicioNutri from './InicioNutri';
import FormularioMacros from './FormularioMacros';
import PanelFinanzas from './finanzas/PanelFinanzas';
import CitasNutri from './gestion-pacientes/CitasNutri';
import DietaRepositorio from './DietaRepositorio';
import AsistenteNutricional from './AsistenteNutricional';
import BandejaProfesionales from '../chat/BandejaProfesionales';
import PerfilNutriologo from './PerfilNutriologo';
import usePortalNutriologo from './hooks/usePortalNutriologo';

export default function NutriPortal() {
  const {
    pestanaActiva,
    cambiarPestana,
    cerrarSesion,
    cerrandoSesion,
  } = usePortalNutriologo();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 p-4 text-white md:p-8">
      <BarraNavegacionNutri
        pestanaActiva={pestanaActiva}
        alCambiarPestana={cambiarPestana}
        alCerrarSesion={cerrarSesion}
        cerrandoSesion={cerrandoSesion}
      />

      <div className="h-20 md:h-24" />

      <main className="mx-auto max-w-7xl animate-fade-in pt-2 pb-20 md:pt-4 md:pb-0">
        {pestanaActiva === 'inicio' && <InicioNutri />}
        {pestanaActiva === 'citas' && <CitasNutri integrado />}
        {pestanaActiva === 'calculadora' && <FormularioMacros />}
        {pestanaActiva === 'dietas' && <DietaRepositorio />}
        {pestanaActiva === 'financiero' && <PanelFinanzas />}
        {pestanaActiva === 'mensajes' && <BandejaProfesionales role="nutritionist" />}
        {pestanaActiva === 'perfil' && <PerfilNutriologo />}
      </main>

      {pestanaActiva === 'calculadora' && <AsistenteNutricional />}
    </div>
  );
}
