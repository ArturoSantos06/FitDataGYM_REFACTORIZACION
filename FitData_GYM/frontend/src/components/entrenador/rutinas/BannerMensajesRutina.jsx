import MensajeRutina from './componentes/MensajeRutina';

function BannerMensajesRutina({ formSuccessMessage: mensajeExito, formWarningMessage: mensajeAdvertencia,
  formErrors: erroresFormulario = {}, isLoadingRoutine: cargandoRutina }) {
  const mensajeError = erroresFormulario.save || erroresFormulario.delete;

  return (
    <>
      <MensajeRutina mensaje={mensajeExito} clases="bg-emerald-950 border-emerald-700 text-emerald-300" />
      <MensajeRutina mensaje={mensajeAdvertencia} clases="bg-amber-950 border-amber-700 text-amber-200" />
      <MensajeRutina mensaje={mensajeError} clases="bg-red-950 border-red-700 text-red-300" />
      <MensajeRutina mensaje={cargandoRutina ? 'Cargando rutina existente del alumno...' : ''}
        clases="bg-slate-900 border-slate-800 text-slate-300" />
    </>
  );
}

export default BannerMensajesRutina;
