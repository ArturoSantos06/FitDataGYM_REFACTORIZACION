import useRepositorioDietas from '../hooks/useRepositorioDietas';
import EncabezadoRepositorio from '../ui/EncabezadoRepositorio';
import FormularioArchivoDieta from './FormularioArchivoDieta';
import ListaArchivosDieta from './ListaArchivosDieta';
import ListaPacientesRepositorio from './ListaPacientesRepositorio';
import ModalesRepositorioDietas from './ModalesRepositorioDietas';

export default function DietaRepositorio() {
  const repositorio = useRepositorioDietas();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <EncabezadoRepositorio
        totalPacientes={repositorio.miembros.length}
        totalArchivos={repositorio.archivos.length}
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
        <div className="space-y-6">
          <ListaPacientesRepositorio
            cargando={repositorio.cargando}
            pacientes={repositorio.pacientesFiltrados}
            filtro={repositorio.filtroPaciente}
            alCambiarFiltro={repositorio.setFiltroPaciente}
            idSeleccionado={repositorio.idPacienteSeleccionado}
            alSeleccionar={repositorio.seleccionarPaciente}
            cantidadesArchivos={repositorio.cantidadesArchivos}
          />
          <FormularioArchivoDieta
            alEnviar={repositorio.enviarArchivo}
            titulo={repositorio.titulo}
            alCambiarTitulo={repositorio.setTitulo}
            notas={repositorio.notas}
            alCambiarNotas={repositorio.setNotas}
            archivo={repositorio.archivoSeleccionado}
            alCambiarArchivo={repositorio.cambiarArchivo}
            guardando={repositorio.guardando}
            cargando={repositorio.cargando}
          />
        </div>

        <ListaArchivosDieta
          cargando={repositorio.cargando}
          rolSesion={repositorio.rolSesion}
          mostrarRecientes={repositorio.mostrarTodosRecientes}
          alCambiarMostrarRecientes={repositorio.setMostrarTodosRecientes}
          filtro={repositorio.filtroArchivo}
          alCambiarFiltro={repositorio.setFiltroArchivo}
          idPacienteSeleccionado={repositorio.idPacienteSeleccionado}
          archivos={repositorio.archivosFiltrados}
          alDescargar={repositorio.descargarArchivo}
          alSolicitarEliminar={repositorio.setArchivoPendienteEliminar}
          guardando={repositorio.guardando}
        />
      </section>

      <ModalesRepositorioDietas
        modalExito={repositorio.modalExito}
        alCerrarExito={repositorio.cerrarModalExito}
        modalError={repositorio.modalError}
        alCerrarError={repositorio.cerrarModalError}
        archivoPendiente={repositorio.archivoPendienteEliminar}
        alCancelarEliminacion={repositorio.cancelarEliminacion}
        alConfirmarEliminacion={repositorio.confirmarEliminacion}
      />
    </div>
  );
}
