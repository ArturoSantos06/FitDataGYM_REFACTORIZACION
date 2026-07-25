import usarRutinaCliente from '../../../hooks/usarRutinaCliente';
import EstadosRutinaCliente from './EstadosRutinaCliente';
import EncabezadoRutinaCliente from './EncabezadoRutinaCliente';
import PlanRutinaCliente from './PlanRutinaCliente';
import ArchivosRutinaCliente from './ArchivosRutinaCliente';

function Rutina() {
  const estado = usarRutinaCliente();
  if (estado.cargando) return <EstadosRutinaCliente tipo="cargando" />;
  if (!estado.miembro) return <EstadosRutinaCliente tipo="sinMiembro" />;
  if (!estado.rutina) return <EstadosRutinaCliente tipo="sinRutina" />;

  return <div className="max-w-3xl mx-auto space-y-5">
    <EncabezadoRutinaCliente rutina={estado.rutina} nombreMiembro={estado.nombreMiembro}
      estadisticas={estado.estadisticas} tieneArchivos={estado.tieneArchivos} />
    <PlanRutinaCliente diasConEjercicios={estado.diasConEjercicios} diaActivo={estado.diaActivo}
      diaActivoDatos={estado.diaActivoDatos} establecerDiaActivo={estado.establecerDiaActivo} pasos={estado.pasos} />
    {estado.tieneArchivos && <ArchivosRutinaCliente archivos={estado.rutina.files} urls={estado.urlsArchivos}
      indiceDescarga={estado.indiceDescarga} errorDescarga={estado.errorDescarga} alDescargar={estado.descargarArchivo} />}
  </div>;
}

export default Rutina;
