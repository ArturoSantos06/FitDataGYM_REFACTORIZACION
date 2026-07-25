import { useMemo } from 'react';
import {
  contarArchivosPorPaciente,
  filtrarArchivos,
  filtrarPacientes,
  hidratarArchivos,
  prepararPacientes,
} from '../utils/repositorioDietas';
import useValorDemorado from './useValorDemorado';

export default function useDatosRepositorioDietas({
  archivos,
  filtroArchivo,
  filtroPaciente,
  idPacienteSeleccionado,
  miembros,
  mostrarTodosRecientes,
}) {
  const filtroPacienteDemorado = useValorDemorado(filtroPaciente);
  const filtroArchivoDemorado = useValorDemorado(filtroArchivo);
  const pacientes = useMemo(() => prepararPacientes(miembros), [miembros]);
  const pacientesFiltrados = useMemo(
    () => filtrarPacientes(pacientes, filtroPacienteDemorado),
    [filtroPacienteDemorado, pacientes],
  );
  const archivosHidratados = useMemo(
    () => hidratarArchivos(archivos, pacientes),
    [archivos, pacientes],
  );
  const archivosFiltrados = useMemo(
    () => filtrarArchivos({
      archivos: archivosHidratados,
      busqueda: filtroArchivoDemorado,
      idPaciente: idPacienteSeleccionado,
      mostrarRecientes: mostrarTodosRecientes,
    }),
    [
      archivosHidratados,
      filtroArchivoDemorado,
      idPacienteSeleccionado,
      mostrarTodosRecientes,
    ],
  );
  const cantidadesArchivos = useMemo(
    () => contarArchivosPorPaciente(archivos),
    [archivos],
  );

  return {
    archivosFiltrados,
    cantidadesArchivos,
    pacientes,
    pacientesFiltrados,
  };
}
