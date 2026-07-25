import { BookOpen } from 'lucide-react';
import SelectorPartesCuerpoCatalogo from './SelectorPartesCuerpoCatalogo';
import TarjetaEjercicioSeccionCatalogo from './TarjetaEjercicioSeccionCatalogo';

const partesCuerpo = [
  { key: 'chest', label: 'Pecho' }, { key: 'back', label: 'Espalda' },
  { key: 'upper arms', label: 'Brazos' }, { key: 'lower arms', label: 'Antebrazos' },
  { key: 'upper legs', label: 'Piernas' }, { key: 'lower legs', label: 'Pantorrillas' },
  { key: 'shoulders', label: 'Hombros' }, { key: 'waist', label: 'Abdomen' },
  { key: 'cardio', label: 'Cardio' },
];

function SeccionCatalogo({
  catalogBodyPart: parteCuerpoSeleccionada,
  catalogExercises: ejerciciosCatalogo,
  isCatalogLoading: cargandoCatalogo,
  activeDay: diaActivo,
  onFetchCatalog: alCargarCatalogo,
  onAddExercise: alAgregarEjercicio,
  LABEL_TRANSLATIONS: traduccionesEtiquetas,
}) {
  const ejercicios = Array.isArray(ejerciciosCatalogo) ? ejerciciosCatalogo : [];

  return <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
    <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 bg-slate-950 shrink-0">
      <BookOpen size={16} className="text-blue-400" />
      <span className="font-semibold text-white text-sm">Catálogo de ejercicios</span>
      <span className="ml-auto text-xs text-slate-500">Clic para agregar a <span className="text-blue-400 font-semibold">{diaActivo}</span></span>
    </div>
    <SelectorPartesCuerpoCatalogo partesCuerpo={partesCuerpo} seleccionada={parteCuerpoSeleccionada}
      alSeleccionar={alCargarCatalogo} />
    <div className="flex-1 overflow-y-auto p-4 max-h-[480px]">
      {!parteCuerpoSeleccionada && !cargandoCatalogo && <div className="text-center py-12 text-slate-600"><p className="text-3xl mb-3">💪</p><p className="text-sm">Selecciona un grupo muscular</p><p className="text-xs mt-1">para ver el catálogo de ejercicios</p></div>}
      {cargandoCatalogo && <div className="text-center py-12 text-slate-500 text-sm"><div className="text-3xl mb-3 animate-pulse">⏳</div>Cargando ejercicios…</div>}
      {!cargandoCatalogo && parteCuerpoSeleccionada && ejercicios.length === 0 && <div className="text-center py-12 text-slate-600 text-sm">Sin resultados para este grupo muscular.</div>}
      {!cargandoCatalogo && ejercicios.length > 0 && <div className="grid grid-cols-2 gap-3">{ejercicios.map((ejercicio) => <TarjetaEjercicioSeccionCatalogo
        key={ejercicio.id} ejercicio={ejercicio} traduccionesEtiquetas={traduccionesEtiquetas} alAgregar={alAgregarEjercicio} />)}</div>}
    </div>
  </div>;
}

export default SeccionCatalogo;
