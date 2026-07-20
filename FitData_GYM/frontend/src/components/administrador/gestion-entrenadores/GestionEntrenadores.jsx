import React from 'react';
import { AlertCircle, Dumbbell } from 'lucide-react';
import { useGestionEntrenadores } from './hooks/useGestionEntrenadores';
import ResumenGestionEntrenadores from './ResumenGestionEntrenadores';
import PestanasGestionEntrenadores from './PestañasGestionEntrenadores';
import ModalesGestionEntrenadores from './ModalesGestionEntrenadores';

const ETIQUETAS_ESTADO = {
  active: { label: 'Activo', classes: 'bg-green-900/50 text-green-300 border border-green-600' },
  activo: { label: 'Activo', classes: 'bg-green-900/50 text-green-300 border border-green-600' },
  pending: { label: 'Pendiente', classes: 'bg-yellow-900/50 text-yellow-300 border border-yellow-600' },
  pendiente: { label: 'Pendiente', classes: 'bg-yellow-900/50 text-yellow-300 border border-yellow-600' },
  completed: { label: 'Completado', classes: 'bg-blue-900/50 text-blue-300 border border-blue-600' },
  completado: { label: 'Completado', classes: 'bg-blue-900/50 text-blue-300 border border-blue-600' },
  pagado: { label: 'Completado', classes: 'bg-blue-900/50 text-blue-300 border border-blue-600' },
  inactive: { label: 'Vencido', classes: 'bg-red-900/50 text-red-300 border border-red-600' },
  inactivo: { label: 'Vencido', classes: 'bg-red-900/50 text-red-300 border border-red-600' },
  expired: { label: 'Vencido', classes: 'bg-red-900/50 text-red-300 border border-red-600' },
  vencido: { label: 'Vencido', classes: 'bg-red-900/50 text-red-300 border border-red-600' },
};

function obtenerEtiquetaEstado(servicio) {
  const status = String(servicio?.status || servicio?.estado || '').trim().toLowerCase();
  const { label, classes } = ETIQUETAS_ESTADO[status] || ETIQUETAS_ESTADO.active;

  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${classes}`}>
      <AlertCircle size={14} />
      {label}
    </span>
  );
}

function GestionEntrenadores() {
  const gestion = useGestionEntrenadores();

  if (gestion.cargando) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-900 p-8 flex items-center justify-center">
        <div className="text-white text-xl">Cargando datos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-gray-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Dumbbell className="text-purple-400" />
            Gestión de Servicios de Entrenamiento
          </h1>
        </header>

        <ResumenGestionEntrenadores estadisticas={gestion.estadisticas} />
        <PestanasGestionEntrenadores gestion={gestion} obtenerEtiquetaEstado={obtenerEtiquetaEstado} />
      </div>

      <ModalesGestionEntrenadores gestion={gestion} />
    </div>
  );
}

export default GestionEntrenadores;
