import React from 'react';
import { ArrowLeft } from 'lucide-react';
import BannerMensajesRutina from './BannerMensajesRutina';
import CatalogoEjerciciosRutina from './CatalogoEjerciciosRutina';
import SeccionArchivosRutina from './SeccionArchivosRutina';
import SelectorDiasRutina from './SelectorDiasRutina';
import SeccionListaEjercicios from './SeccionListaEjercicios';
import { useRutinaEntrenador } from '../../../hooks/useRutinaEntrenador';
import { DIAS_SEMANA, PARTES_CUERPO, TRADUCCIONES_ETIQUETAS } from '../../../backend/utilidadesRutinaEntrenador';

function RutinaEntrenador() {
  /** pos esto funciona para toda la logica de editar rutina */
  const { navigate, memberName, rutinaCarga, guardado } = useRutinaEntrenador();
  const inputSm = 'bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white text-xs placeholder-slate-600 outline-none focus:ring-1 focus:ring-blue-500 transition-all';

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/entrenador')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-bold">Rutina del Alumno</h1>
            <p className="text-slate-400 text-sm">{memberName}</p>
          </div>
        </div>

        <form onSubmit={guardado.handleSubmit} className="space-y-6">
          <BannerMensajesRutina
            formSuccessMessage={rutinaCarga.formSuccessMessage}
            formWarningMessage={rutinaCarga.formWarningMessage}
            formErrors={rutinaCarga.formErrors}
            isLoadingRoutine={rutinaCarga.isLoadingRoutine}
          />

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6">
            <label className="block text-sm text-slate-300 mb-2">Nombre de la rutina</label>
            <input
              type="text"
              value={rutinaCarga.routineName}
              onChange={(e) => {
                rutinaCarga.setRoutineName(e.target.value);
                rutinaCarga.setFormErrors((prev) => ({ ...prev, routineName: '', save: '' }));
                rutinaCarga.setFormSuccessMessage('');
              }}
              placeholder="Ej. Fuerza Tren Superior – Semana 1"
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              required={rutinaCarga.files.length === 0}
            />
            {rutinaCarga.formErrors.routineName && <p className="text-red-400 text-xs mt-2">{rutinaCarga.formErrors.routineName}</p>}
          </div>

          <SelectorDiasRutina
            diasSemana={DIAS_SEMANA}
            activeDays={rutinaCarga.activeDays}
            toggleDay={rutinaCarga.toggleDay}
            errorDias={rutinaCarga.formErrors.days}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SeccionListaEjercicios
              activeDay={rutinaCarga.activeDay}
              activeDays={rutinaCarga.activeDays}
              exercisesByDay={rutinaCarga.exercisesByDay}
              formError={rutinaCarga.formErrors.exercises}
              searchQuery={rutinaCarga.searchQuery}
              searchResults={rutinaCarga.searchResults}
              isSearching={rutinaCarga.isSearching}
              onSetActiveDay={rutinaCarga.setActiveDay}
              onRemoveExercise={rutinaCarga.removeExercise}
              onUpdateExercise={rutinaCarga.updateExercise}
              onMoveExercise={rutinaCarga.moveExercise}
              onSearch={rutinaCarga.handleSearch}
              onClearSearch={rutinaCarga.clearSearch}
              onAddExercise={rutinaCarga.addExercise}
              LABEL_TRANSLATIONS={TRADUCCIONES_ETIQUETAS}
              inputSm={inputSm}
            />

            <CatalogoEjerciciosRutina
              activeDay={rutinaCarga.activeDay}
              bodyParts={PARTES_CUERPO}
              catalogBodyPart={rutinaCarga.catalogBodyPart}
              catalogExercises={rutinaCarga.catalogExercises}
              isCatalogLoading={rutinaCarga.isCatalogLoading}
              onFetchCatalog={rutinaCarga.fetchCatalog}
              onAddExercise={rutinaCarga.addExercise}
            />
          </div>

          <SeccionArchivosRutina
            files={rutinaCarga.files}
            onFileChange={rutinaCarga.handleFileChange}
            onRemoveFile={(index) => rutinaCarga.setFiles((prev) => prev.filter((_, i) => i !== index))}
          />

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="submit"
              disabled={guardado.isSaving || guardado.isDeleting || rutinaCarga.isLoadingRoutine}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold transition-colors"
            >
              {guardado.isSaving ? 'Guardando…' : 'Guardar rutina digital'}
            </button>
            <button
              type="button"
              onClick={guardado.handleDeleteRoutine}
              disabled={guardado.isSaving || guardado.isDeleting || rutinaCarga.isLoadingRoutine}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold transition-colors"
            >
              {guardado.isDeleting ? 'Eliminando…' : 'Eliminar rutina'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RutinaEntrenador;
