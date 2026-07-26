import useHistorialVentas from './hooks/useHistorialVentas';
import BarraBusquedaVentas from './partes/BarraBusquedaVentas';
import TablaVentasVista from './partes/TablaVentasVista';

const HistorialVentas = ({ reloadTrigger }) => {
  const { filtro, setFiltro, filasFiltradas } = useHistorialVentas(reloadTrigger);

  return (
    <div className="mt-10 bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-xl">
      <BarraBusquedaVentas filtro={filtro} onCambioFiltro={(e) => setFiltro(e.target.value)} />
      <TablaVentasVista filas={filasFiltradas} />
    </div>
  );
};

export default HistorialVentas;
