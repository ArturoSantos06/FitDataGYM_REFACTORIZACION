import { useState } from 'react';

import OpcionMenu from './vistaPlan/OpcionMenu';
import PanelMenu from './vistaPlan/PanelMenu';
import PanelSeleccion from './vistaPlan/PanelSeleccion';
import ContenedorVista from './vistaPlan/ContenedorVista';
import {
  FINAL_VIEWS,
  MAIN_OPTIONS,
  NUTRITION_OPTIONS,
  TRAINING_OPTIONS,
  VIEWS,
} from './vistaPlan/configuracionVistaPlan';
import ListaEntrenadores from '../entrenamiento/ListaEntrenadores';
import ListaNutriologos from '../nutricion/ListaNutriologos';

const SECTION_CONFIG = {
  [VIEWS.TRAINER_MENU]: {
    title: 'Área de Entrenamiento',
    description: 'Gestiona tus rutinas y tu servicio de coach.',
    accentClass: 'bg-linear-to-r from-blue-500 to-cyan-400',
    titleClass: 'bg-linear-to-r from-blue-400 to-cyan-300',
    backLabel: 'Volver a Mi Programa',
    backTarget: VIEWS.MENU,
    options: TRAINING_OPTIONS,
  },
  [VIEWS.NUTRITION_MENU]: {
    title: 'Área de Nutrición',
    description: 'Consulta tu plan alimenticio y servicios de nutrición.',
    accentClass: 'bg-linear-to-r from-emerald-500 to-lime-400',
    titleClass: 'bg-linear-to-r from-emerald-300 to-lime-300',
    backLabel: 'Volver a Mi Programa',
    backTarget: VIEWS.MENU,
    options: NUTRITION_OPTIONS,
  },
};

const SELECTION_CONFIG = {
  [VIEWS.TRAINER_SELECT]: {
    title: 'Seleccionar Entrenador',
    description: 'Elige al entrenador que mejor se adapte a tus objetivos y estilo de entrenamiento.',
    accentClass: 'bg-linear-to-r from-blue-500 to-cyan-400',
    titleClass: 'bg-linear-to-r from-blue-400 to-cyan-300',
    backTarget: VIEWS.TRAINER_MENU,
    backLabel: 'Volver a Entrenamiento',
    component: ListaEntrenadores,
  },
  [VIEWS.NUTRITION_SELECT]: {
    title: 'Seleccionar Nutriólogo',
    description: 'Elige al especialista en nutrición que mejor se adapte a tus necesidades.',
    accentClass: 'bg-linear-to-r from-emerald-500 to-lime-400',
    titleClass: 'bg-linear-to-r from-emerald-300 to-lime-300',
    backTarget: VIEWS.NUTRITION_MENU,
    backLabel: 'Volver a Nutrición',
    component: ListaNutriologos,
  },
};

function MainMenu({ onNavigate }) {
  return (
    <div className="flex w-full justify-center animate-fade-in">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-slate-700 bg-gray-800 p-8 shadow-2xl">
        <div className="absolute left-0 top-0 h-1.5 w-full bg-linear-to-r from-blue-500 via-cyan-400 to-teal-400" />
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
            Mi Programa Integral
          </h2>
          <p className="mt-1.5 font-medium text-slate-400">Selecciona el área que deseas consultar.</p>
        </div>
        <div className="space-y-4">
          {MAIN_OPTIONS.map((option) => (
            <OpcionMenu key={option.view} option={option} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SectionMenu({ config, onNavigate }) {
  return (
    <ContenedorVista
      backTarget={config.backTarget}
      backLabel={config.backLabel}
      onNavigate={onNavigate}
    >
      <PanelMenu {...config} onNavigate={onNavigate} />
    </ContenedorVista>
  );
}

function SelectionView({ config, onNavigate }) {
  const Component = config.component;

  return (
    <ContenedorVista
      backTarget={config.backTarget}
      backLabel={config.backLabel}
      onNavigate={onNavigate}
    >
      <PanelSeleccion
        title={config.title}
        description={config.description}
        accentClass={config.accentClass}
        titleClass={config.titleClass}
      >
        <Component />
      </PanelSeleccion>
    </ContenedorVista>
  );
}

function FinalView({ config, view, onNavigate }) {
  const Component = config.component;
  const isTrainerView = view.startsWith('entrenador_');

  return (
    <ContenedorVista
      backTarget={isTrainerView ? VIEWS.TRAINER_MENU : VIEWS.NUTRITION_MENU}
      backLabel={config.backLabel}
      onNavigate={onNavigate}
    >
      <Component />
    </ContenedorVista>
  );
}

function VistaPlan() {
  const [currentView, setCurrentView] = useState(VIEWS.MENU);
  const sectionConfig = SECTION_CONFIG[currentView];
  const selectionConfig = SELECTION_CONFIG[currentView];
  const finalConfig = FINAL_VIEWS[currentView];

  if (sectionConfig) return <SectionMenu config={sectionConfig} onNavigate={setCurrentView} />;
  if (selectionConfig) return <SelectionView config={selectionConfig} onNavigate={setCurrentView} />;
  if (finalConfig) return <FinalView config={finalConfig} view={currentView} onNavigate={setCurrentView} />;

  return <MainMenu onNavigate={setCurrentView} />;
}

export default VistaPlan;
