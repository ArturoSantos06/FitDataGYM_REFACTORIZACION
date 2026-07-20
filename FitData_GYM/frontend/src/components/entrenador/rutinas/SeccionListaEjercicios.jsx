import React from 'react';
import BuscadorEjerciciosRapido from './BuscadorEjerciciosRapido';
import PestanasDiasRutina from './PestanasDiasRutina';
import TarjetaEjercicioRutina from './TarjetaEjercicioRutina';
import { useSeccionListaEjercicios } from '../../../hooks/useSeccionListaEjercicios';

export default function SeccionListaEjercicios({
    activeDay,
    activeDays,
    exercisesByDay,
    formError,
    searchQuery,
    searchResults,
    isSearching,
    onSetActiveDay,
    onRemoveExercise,
    onUpdateExercise,
    onMoveExercise,
    onSearch,
    onClearSearch,
    onAddExercise,
    LABEL_TRANSLATIONS,
    inputSm,
}) {
    /** Convierte una etiqueta técnica a texto en español usando las traducciones recibidas */
    const toSpanishLabel = (label) => (LABEL_TRANSLATIONS && LABEL_TRANSLATIONS[label]) ? LABEL_TRANSLATIONS[label] : label;
    const { ejerciciosDiaActivo } = useSeccionListaEjercicios(activeDay, exercisesByDay);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <PestanasDiasRutina diaActivo={activeDay} diasActivos={activeDays} ejerciciosPorDia={exercisesByDay} onCambiarDia={onSetActiveDay} />

            {/* Lista de ejercicios */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-128">
                {formError && (
                    <div className="bg-red-950 border border-red-700 rounded-lg px-3 py-2 text-xs text-red-300">
                        {formError}
                    </div>
                )}
                {ejerciciosDiaActivo.length === 0 ? (
                    <div className="text-center py-10 text-slate-500">
                        <p className="text-4xl mb-3">🏋️</p>
                        <p className="text-sm">Sin ejercicios para este día.</p>
                        <p className="text-xs mt-1 text-slate-600">
                            Busca abajo o usa el catálogo →
                        </p>
                    </div>
                ) : (
                    ejerciciosDiaActivo.map((ex) => (
                        <TarjetaEjercicioRutina
                            key={ex.id}
                            ejercicio={ex}
                            diaActivo={activeDay}
                            diasActivos={activeDays}
                            inputSm={inputSm}
                            traduccionesEtiquetas={LABEL_TRANSLATIONS}
                            convertirEtiqueta={toSpanishLabel}
                            onEliminar={onRemoveExercise}
                            onActualizar={onUpdateExercise}
                            onMover={onMoveExercise}
                        />
                    ))
                )}
            </div>

            <BuscadorEjerciciosRapido
                terminoBusqueda={searchQuery}
                resultados={searchResults}
                buscando={isSearching}
                onBuscar={onSearch}
                onLimpiar={onClearSearch}
                onAgregar={onAddExercise}
                traduccionesEtiquetas={LABEL_TRANSLATIONS}
                convertirEtiqueta={toSpanishLabel}
            />
        </div>
    );
}
