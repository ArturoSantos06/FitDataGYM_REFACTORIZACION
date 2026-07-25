import {
  Activity,
  Apple,
  Calendar,
  ClipboardList,
  Dumbbell,
  FileDown,
  Users,
  XCircle,
} from 'lucide-react';

import Rutina from '../../entrenamiento/Rutina';
import Entrenador from '../../entrenamiento/Entrenador';
import VistaNutricion from '../../nutricion/VistaNutricion';
import VisorDieta from '../../nutricion/VisorDieta';
import AnalisisNecesidades from '../../entrenamiento/AnalisisNecesidades';
import ListaNutriologos from '../../nutricion/ListaNutriologos';
import ListaEntrenadores from '../../entrenamiento/ListaEntrenadores';
import CitasNutricion from '../../nutricion/CitasNutricion';

export const VIEWS = Object.freeze({
  MENU: 'menu',
  TRAINER_MENU: 'entrenador_menu',
  TRAINER_SELECT: 'entrenador_seleccionar',
  TRAINER_ROUTINE: 'entrenador_rutina',
  TRAINER_ANALYSIS: 'entrenador_analisis',
  TRAINER_CANCEL: 'entrenador_cancelar',
  NUTRITION_MENU: 'nutriologo_menu',
  NUTRITION_SELECT: 'nutriologo_seleccionar',
  NUTRITION_DIET: 'nutriologo_dieta',
  NUTRITION_APPOINTMENTS: 'nutriologo_citas',
  NUTRITION_CANCEL: 'nutriologo_cancelar',
});

export const BASE_OPTION_CLASS =
  'w-full bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center justify-between group transition-all duration-300 shadow-md';

const COLOR_STYLES = {
  blue: {
    titleClass: 'text-blue-300',
    iconClass: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
    hoverClass: 'hover:border-blue-500/50',
    arrowClass: 'group-hover:text-blue-400',
  },
  cyan: {
    titleClass: 'text-cyan-300',
    iconClass: 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white',
    hoverClass: 'hover:border-cyan-500/50',
    arrowClass: 'group-hover:text-cyan-400',
  },
  amber: {
    titleClass: 'text-amber-300',
    iconClass: 'bg-amber-500/10 text-amber-400 group-hover:bg-amber-500 group-hover:text-white',
    hoverClass: 'hover:border-amber-500/50',
    arrowClass: 'group-hover:text-amber-400',
  },
  emerald: {
    titleClass: 'text-emerald-300',
    iconClass: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
    hoverClass: 'hover:border-emerald-500/50',
    arrowClass: 'group-hover:text-emerald-400',
  },
  lime: {
    titleClass: 'text-lime-300',
    iconClass: 'bg-lime-500/10 text-lime-400 group-hover:bg-lime-500 group-hover:text-white',
    hoverClass: 'hover:border-lime-500/50',
    arrowClass: 'group-hover:text-lime-400',
  },
  teal: {
    titleClass: 'text-teal-300',
    iconClass: 'bg-teal-500/10 text-teal-400 group-hover:bg-teal-500 group-hover:text-white',
    hoverClass: 'hover:border-teal-500/50',
    arrowClass: 'group-hover:text-teal-400',
  },
  red: {
    titleClass: 'text-red-300',
    iconClass: 'bg-red-500/10 text-red-400 group-hover:bg-red-500 group-hover:text-white',
    hoverClass: 'hover:border-red-500/50',
    arrowClass: 'group-hover:text-red-400',
  },
};

const option = (view, icon, title, description, color) => ({
  view,
  icon,
  title,
  description,
  ...COLOR_STYLES[color],
});

export const TRAINING_OPTIONS = [
  option(VIEWS.TRAINER_SELECT, Users, 'Seleccionar Entrenador', 'Explora el catálogo y elige a tu coach ideal.', 'blue'),
  option(VIEWS.TRAINER_ROUTINE, Activity, 'Mis Rutinas', 'Consulta tu plan de ejercicios y progreso.', 'cyan'),
  option(VIEWS.TRAINER_ANALYSIS, ClipboardList, 'Análisis de Necesidades', 'Responde un cuestionario y recibe una recomendación automática.', 'amber'),
  option(VIEWS.TRAINER_CANCEL, XCircle, 'Detener Servicio', 'Gestiona o cancela tu suscripción con el coach actual.', 'red'),
];

export const NUTRITION_OPTIONS = [
  option(VIEWS.NUTRITION_SELECT, Users, 'Seleccionar Nutriólogo', 'Explora el catálogo y elige a tu especialista en nutrición.', 'emerald'),
  option(VIEWS.NUTRITION_DIET, FileDown, 'Consultar y Descargar Dieta', 'Consulta o descarga tu dieta vigente.', 'lime'),
  option(VIEWS.NUTRITION_APPOINTMENTS, Calendar, 'Mis Citas', 'Gestiona, cancela o reprograma tus citas.', 'teal'),
  option(VIEWS.NUTRITION_CANCEL, XCircle, 'Detener Servicio', 'Gestiona o cancela tu suscripción con el nutriólogo actual.', 'red'),
];

export const MAIN_OPTIONS = [
  {
    view: VIEWS.TRAINER_MENU,
    icon: Dumbbell,
    title: 'Mi Entrenador y Rutinas',
    description: 'Ver plan de ejercicios, días de entrenamiento y coach.',
    titleClass: 'text-blue-300 group-hover:text-blue-200 tracking-wide',
    iconClass: 'bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white',
    hoverClass: 'hover:shadow-blue-900/20 hover:border-blue-500/50',
    arrowClass: 'group-hover:text-blue-400 transition-transform group-hover:translate-x-1.5',
  },
  {
    view: VIEWS.NUTRITION_MENU,
    icon: Apple,
    title: 'Mi Nutriólogo y Dieta',
    description: 'Ver plan de alimentación, macros y nutriólogo asignado.',
    titleClass: 'text-emerald-300 group-hover:text-emerald-200 tracking-wide',
    iconClass: 'bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white',
    hoverClass: 'hover:shadow-emerald-900/20 hover:border-emerald-500/50',
    arrowClass: 'group-hover:text-emerald-400 transition-transform group-hover:translate-x-1.5',
  },
];

export const FINAL_VIEWS = {
  [VIEWS.TRAINER_ROUTINE]: { component: Rutina, backLabel: 'Volver a Entrenamiento' },
  [VIEWS.TRAINER_CANCEL]: { component: Entrenador, backLabel: 'Volver a Entrenamiento' },
  [VIEWS.TRAINER_ANALYSIS]: { component: AnalisisNecesidades, backLabel: 'Volver a Entrenamiento' },
  [VIEWS.NUTRITION_DIET]: { component: VisorDieta, backLabel: 'Volver a Nutrición' },
  [VIEWS.NUTRITION_CANCEL]: { component: VistaNutricion, backLabel: 'Volver a Nutrición' },
  [VIEWS.NUTRITION_APPOINTMENTS]: { component: CitasNutricion, backLabel: 'Volver a Nutrición' },
};
