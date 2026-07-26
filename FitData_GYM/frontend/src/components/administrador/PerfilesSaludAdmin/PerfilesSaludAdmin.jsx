import { useState } from 'react';
import usePerfilesSalud from './hooks/usePerfilesSalud';
import BarraFiltrosVista from './partes/BarraFiltrosVista';
import TarjetaPerfilVista from './partes/TarjetaPerfilVista';
import ModalDetallePerfilVista from './partes/ModalDetallePerfilVista';

function PerfilesSaludAdmin({ refreshTrigger }) {
  const [selected, setSelected] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  const {
    filtered,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    filters,
    setFilters,
    resetFilters,
    activeFiltersCount,
  } = usePerfilesSalud(refreshTrigger);

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-blue-400 mb-2">Perfiles de Salud</h1>
        <p className="text-slate-400 text-sm">Gestiona y consulta los perfiles de salud de los clientes</p>
      </div>

      <BarraFiltrosVista
        searchTerm={searchTerm}
        onCambioSearchTerm={(e) => setSearchTerm(e.target.value)}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(!showFilters)}
        filters={filters}
        onCambioFiltros={setFilters}
        onResetFilters={resetFilters}
        activeFiltersCount={activeFiltersCount}
      />

      {loading && <p className="text-slate-400">Cargando...</p>}
      {error && <p className="text-red-400 mb-3">{error}</p>}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-8">
          <p className="text-slate-500 text-sm">No hay perfiles que coincidan con los filtros.</p>
        </div>
      )}

      <div className="space-y-3">
        {filtered.map((p) => (
          <TarjetaPerfilVista key={p.id} perfil={p} onVerDetalle={() => setSelected(p)} />
        ))}
      </div>

      {selected && <ModalDetallePerfilVista perfil={selected} onCerrar={() => setSelected(null)} />}
    </div>
  );
}

export default PerfilesSaludAdmin;
