import useAsistencias from './hooks/useAsistencias';
import useEscanerQR from './hooks/useEscanerQR';
import PanelEscanerVista from './partes/PanelEscanerVista';
import PanelAsistenciasVista from './partes/PanelAsistenciasVista';

const CheckInOut = () => {
  const {
    asistencias,
    searchTerm,
    setSearchTerm,
    dateFilter,
    setDateFilter,
    limpiarFiltros,
    cargarAsistencias,
  } = useAsistencias();

  const {
    scanning,
    setScanning,
    stopScanner,
    manualCode,
    setManualCode,
    handleManualSubmit,
    mensaje,
    error,
  } = useEscanerQR(cargarAsistencias);

  return (
    <div className="min-h-screen py-6 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PanelEscanerVista
            scanning={scanning}
            onIniciarEscaneo={() => setScanning(true)}
            onDetenerEscaneo={stopScanner}
            manualCode={manualCode}
            onCambioManualCode={(e) => setManualCode(e.target.value.toUpperCase())}
            onEnviarManual={handleManualSubmit}
            mensaje={mensaje}
            error={error}
          />

          <PanelAsistenciasVista
            asistencias={asistencias}
            searchTerm={searchTerm}
            onCambioSearchTerm={(e) => setSearchTerm(e.target.value)}
            dateFilter={dateFilter}
            onCambioDateFilter={(e) => setDateFilter(e.target.value)}
            onLimpiarFiltros={limpiarFiltros}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckInOut;
