import React from 'react';
import { TarjetaArchivo } from './ui/TarjetaArchivo';
import { MensajeEstadoLista } from './ui/MensajeEstadoLista';

const maxSearchLength = 80;

const isNutritionistRole = (roleValue) => {
  const role = String(roleValue || '').toLowerCase().trim();
  return ['nutritionist', 'nutriologo', 'nutriologa', 'nutriologo/a', 'nutricionista', 'nutri'].includes(role);
};

export default function ListaArchivosDieta({
  loading,
  sessionRole,
  showAllRecent,
  setShowAllRecent,
  fileFilter,
  setFileFilter,
  selectedMemberId,
  filteredFiles,
  handleDownload,
  requestDelete,
  saving,
}) {
  
  // Función auxiliar para mantener limpio el return principal y evitar múltiples ternarios anidados
  const renderizarContenido = () => {
    if (loading) {
      return <p className="py-4 text-center text-slate-400">Cargando repositorio...</p>;
    }
    
    if (!showAllRecent && !selectedMemberId && !fileFilter.trim()) {
      return <MensajeEstadoLista mensaje="Selecciona un paciente para ver sus archivos." />;
    }

    if (filteredFiles.length === 0) {
      return <MensajeEstadoLista mensaje={`No hay archivos registrados ${showAllRecent ? 'recientemente' : 'con los filtros actuales'}.`} />;
    }

    return (
      <div className="space-y-3">
        {filteredFiles.map((fileItem) => (
          <TarjetaArchivo
            key={fileItem.id}
            fileItem={fileItem}
            handleDownload={handleDownload}
            requestDelete={requestDelete}
            saving={saving}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="self-start rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Archivos Registrados</h2>
          <p className="text-sm text-slate-400">
            {showAllRecent
              ? (isNutritionistRole(sessionRole)
                ? 'Archivos más recientes de tus pacientes asignados.'
                : 'Archivos más recientes de todos los pacientes.')
              : 'Consulta y descarga los archivos del expediente digital.'}
          </p>
        </div>
        <div className="flex gap-2 lg:items-center">
          <button
            type="button"
            onClick={() => setShowAllRecent(!showAllRecent)}
            className={`whitespace-nowrap rounded-lg px-4 py-3 text-sm font-semibold transition ${
              showAllRecent
                ? 'border border-cyan-500 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30'
                : 'border border-slate-600 bg-slate-700 text-slate-300 hover:border-slate-500 hover:bg-slate-600'
            }`}
          >
            {showAllRecent ? '← Volver' : 'Ver recientes'}
          </button>
          <input
            type="text"
            value={fileFilter}
            maxLength={maxSearchLength}
            onChange={(event) => setFileFilter(event.target.value.slice(0, maxSearchLength))}
            placeholder="Buscar archivo o paciente..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 lg:w-auto lg:min-w-xs"
          />
        </div>
      </div>

      {/* Se manda a llamar la función que limpia la lógica de estados */}
      {renderizarContenido()}
      
    </div>
  );
}