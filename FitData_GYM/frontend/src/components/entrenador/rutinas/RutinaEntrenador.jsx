import BannerMensajesRutina from './BannerMensajesRutina';
import CatalogoEjerciciosRutina from './CatalogoEjerciciosRutina';
import SeccionArchivosRutina from './SeccionArchivosRutina';
import SelectorDiasRutina from './SelectorDiasRutina';
import SeccionListaEjercicios from './SeccionListaEjercicios';
import EncabezadoRutinaEntrenador from './EncabezadoRutinaEntrenador';
import CampoNombreRutina from './CampoNombreRutina';
import AccionesRutinaEntrenador from './AccionesRutinaEntrenador';
import usarRutinaEntrenador from '../../../hooks/usarRutinaEntrenador';

function RutinaEntrenador() {
  const estado = usarRutinaEntrenador();
  const claseEntrada = 'bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs placeholder-slate-600 outline-none focus:ring-1 focus:ring-blue-500 transition-all';

  return <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
    <div className="max-w-6xl mx-auto space-y-6">
      <EncabezadoRutinaEntrenador nombreAlumno={estado.nombreAlumno} alVolver={estado.volverAlPortal} />
      <form onSubmit={estado.guardarRutina} className="space-y-6">
        <BannerMensajesRutina formSuccessMessage={estado.mensajeExito} formWarningMessage={estado.mensajeAdvertencia}
          formErrors={estado.erroresFormulario} isLoadingRoutine={estado.cargandoRutina} />
        <CampoNombreRutina nombreRutina={estado.nombreRutina} archivos={estado.archivos}
          erroresFormulario={estado.erroresFormulario} alCambiarNombre={estado.cambiarNombreRutina} />
        <SelectorDiasRutina diasSemana={estado.diasSemana} activeDays={estado.diasActivos}
          toggleDay={estado.alternarDia} errorDias={estado.erroresFormulario.days} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SeccionListaEjercicios activeDay={estado.diaActivo} activeDays={estado.diasActivos}
            exercisesByDay={estado.ejerciciosPorDia} formError={estado.erroresFormulario.exercises}
            searchQuery={estado.consultaBusqueda} searchResults={estado.resultadosBusqueda} isSearching={estado.buscando}
            onSetActiveDay={estado.establecerDiaActivo} onRemoveExercise={estado.eliminarEjercicio}
            onUpdateExercise={estado.actualizarEjercicio} onMoveExercise={estado.moverEjercicio}
            onSearch={estado.buscarEjercicios} onClearSearch={estado.limpiarBusqueda}
            onAddExercise={estado.agregarEjercicio} LABEL_TRANSLATIONS={estado.traduccionesEtiquetas} inputSm={claseEntrada} />
          <CatalogoEjerciciosRutina activeDay={estado.diaActivo} bodyParts={estado.partesCuerpo}
            catalogBodyPart={estado.parteCuerpoCatalogo} catalogExercises={estado.ejerciciosCatalogo}
            isCatalogLoading={estado.cargandoCatalogo} onFetchCatalog={estado.cargarCatalogo}
            onAddExercise={estado.agregarEjercicio} />
        </div>
        <SeccionArchivosRutina files={estado.archivos} onFileChange={estado.cambiarArchivos}
          onRemoveFile={estado.quitarArchivo} />
        <AccionesRutinaEntrenador guardando={estado.guardando} eliminando={estado.eliminando}
          cargando={estado.cargandoRutina} alEliminar={estado.eliminarRutina} />
      </form>
    </div>
  </div>;
}

export default RutinaEntrenador;
