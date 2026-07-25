import BuscadorEjerciciosRapido from './BuscadorEjerciciosRapido';
import PestanasDiasRutina from './PestanasDiasRutina';
import TarjetaEjercicioRutina from './TarjetaEjercicioRutina';

const traducirEtiqueta = (traducciones, valor) => {
    if (!valor) return '';
    const clave = String(valor).trim().toLowerCase();
    return traducciones[clave] || valor;
};

export default function ListaEjerciciosRutina({
    activeDay: diaActivo,
    activeDays: diasActivos,
    exercisesByDay: ejerciciosPorDia,
    formError: errorFormulario,
    searchQuery: consultaBusqueda,
    searchResults: resultadosBusqueda,
    isSearching: buscando,
    onSetActiveDay: alEstablecerDiaActivo,
    onRemoveExercise: alEliminarEjercicio,
    onUpdateExercise: alActualizarEjercicio,
    onMoveExercise: alMoverEjercicio,
    onSearch: alBuscar,
    onClearSearch: alLimpiarBusqueda,
    onAddExercise: alAgregarEjercicio,
    LABEL_TRANSLATIONS: traduccionesEtiquetas,
    inputSm: claseEntrada,
}) {
    const ejerciciosDiaActivo = ejerciciosPorDia?.[diaActivo] || [];

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            <PestanasDiasRutina diaActivo={diaActivo} diasActivos={diasActivos} ejerciciosPorDia={ejerciciosPorDia} onCambiarDia={alEstablecerDiaActivo} />

            {/* Lista de ejercicios */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[540px]">
                {errorFormulario && (
                    <div className="bg-red-950 border border-red-700 rounded-lg px-3 py-2 text-xs text-red-300">
                        {errorFormulario}
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
                            diaActivo={diaActivo}
                            diasActivos={diasActivos}
                            inputSm={claseEntrada}
                            traduccionesEtiquetas={traduccionesEtiquetas}
                            convertirEtiqueta={traducirEtiqueta}
                            onEliminar={alEliminarEjercicio}
                            onActualizar={alActualizarEjercicio}
                            onMover={alMoverEjercicio}
                        />
                    ))
                )}
            </div>

            <BuscadorEjerciciosRapido
                terminoBusqueda={consultaBusqueda}
                resultados={resultadosBusqueda}
                buscando={buscando}
                onBuscar={alBuscar}
                onLimpiar={alLimpiarBusqueda}
                onAgregar={alAgregarEjercicio}
                traduccionesEtiquetas={traduccionesEtiquetas}
                convertirEtiqueta={traducirEtiqueta}
            />
        </div>
    );
}
