import React from 'react';
import useRepositorioDietas from './hooks/useRepositorioDietas';
import EncabezadoRepositorio from './ui/EncabezadoRepositorio';
import ModalExito from '../modales/ModalExito';
import ErrorModal from '../modales/ErrorModal';
import ModalConfirmacion from '../modales/ModalConfirmacion';
import ListaPacientes from './ListaPacientes';
import FormularioSubirDieta from './FormularioSubirDieta';
import ListaArchivosDieta from './ListaArchivosDieta';

export default function DietaRepositorio() {
  const {
    miembros, archivos, 
    idPacienteSeleccionado,
    titulo, setTitulo,
    notas, setNotas,
    archivoSeleccionado, 
    filtroPaciente, setFiltroPaciente,
    filtroArchivo, setFiltroArchivo,
    cargando, guardando,
    mostrarTodosRecientes, setMostrarTodosRecientes,
    rolSesion,
    modalExito, setModalExito,
    modalError, setModalError,
    archivoPendienteEliminar, setArchivoPendienteEliminar,
    pacientesFiltrados, archivosFiltrados,
    manejarCambioArchivo, manejarEnvio, manejarDescarga,
    manejarEliminacion, solicitarEliminacion, manejarSeleccionPaciente
  } = useRepositorioDietas();

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <EncabezadoRepositorio 
        totalPacientes={miembros.length} 
        totalArchivos={archivos.length} 
      />

      <section className="grid gap-6 xl:grid-cols-[1.05fr_1.4fr]">
        <div className="space-y-6">
          <ListaPacientes
            loading={cargando}
            filteredMembers={pacientesFiltrados}
            memberFilter={filtroPaciente}
            setMemberFilter={setFiltroPaciente}
            selectedMemberId={idPacienteSeleccionado}
            handleSelectMember={manejarSeleccionPaciente}
            files={archivos}
          />
          <FormularioSubirDieta
            handleSubmit={manejarEnvio}
            title={titulo}
            setTitle={setTitulo}
            notes={notas}
            setNotes={setNotas}
            selectedFile={archivoSeleccionado}
            handleFileChange={manejarCambioArchivo}
            saving={guardando}
            loading={cargando}
          />
        </div>

        <ListaArchivosDieta
          loading={cargando}
          sessionRole={rolSesion}
          showAllRecent={mostrarTodosRecientes}
          setShowAllRecent={setMostrarTodosRecientes}
          fileFilter={filtroArchivo}
          setFileFilter={setFiltroArchivo}
          selectedMemberId={idPacienteSeleccionado}
          filteredFiles={archivosFiltrados}
          handleDownload={manejarDescarga}
          requestDelete={solicitarEliminacion}
          saving={guardando}
        />
      </section>

      {modalExito.open && (
        <ModalExito
          isOpen={modalExito.open}
          title={modalExito.title}
          message={modalExito.message}
          onClose={() => setModalExito({ open: false, title: '', message: '' })}
        />
      )}

      {modalError.open && (
        <ErrorModal
          isOpen={modalError.open}
          title="No se pudo completar la acción"
          message={modalError.message}
          onClose={() => setModalError({ open: false, message: '' })}
        />
      )}

      {archivoPendienteEliminar && (
        <ModalConfirmacion
          isOpen={Boolean(archivoPendienteEliminar)}
          title="Confirmar eliminación"
          message={`¿Eliminar "${(archivoPendienteEliminar.title || archivoPendienteEliminar.originalFileName || 'archivo').slice(0, 35)}${(archivoPendienteEliminar.title || archivoPendienteEliminar.originalFileName || 'archivo').length > 35 ? '...' : ''}" del expediente?`}
          onClose={() => setArchivoPendienteEliminar(null)}
          onConfirm={() => manejarEliminacion(archivoPendienteEliminar)}
        />
      )}
    </div>
  );
}