import React from 'react';
import TarjetaPacienteLista from './ui/TarjetaPacienteLista';
import EntradaTexto from './ui/EntradaTexto';
import MensajeEstadoLista from './ui/MensajeEstadoLista';
import MensajeVacio from './ui/MensajeVacio';

const maxSearchLength = 80;

export default function ListaPacientes({
  loading,
  filteredMembers,
  memberFilter,
  setMemberFilter,
  selectedMemberId,
  handleSelectMember,
  files,
}) {
  return (
    <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-white">Seleccionar Paciente</h2>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
            {filteredMembers.length} resultados
          </span>
        </div>
      </div>

      <div className="mb-4">
        <EntradaTexto
          type="text"
          value={memberFilter}
          maxLength={maxSearchLength}
          onChange={(event) => setMemberFilter(event.target.value.slice(0, maxSearchLength))}
          placeholder="Buscar por nombre, correo o ID..."
        />
      </div>

      <div className="max-h-[420px] space-y-2 overflow-y-auto pr-1">
        
        {loading && (
           /* Asumo que tus componentes de mensaje aceptan una prop 'mensaje' o 'texto' */
          <MensajeEstadoLista mensaje="Cargando pacientes asignados..." />
        )}

        {!loading && filteredMembers.map((member) => {
          const estaSeleccionado = String(selectedMemberId) === String(member.id);
          const cantidadArchivos = files.filter((file) => String(file.memberId) === String(member.id)).length;

          return (
            <TarjetaPacienteLista
              key={member.id}
              id={member.id}
              nombre={member.fullName}
              correo={member.email}
              estaSeleccionado={estaSeleccionado}
              cantidadArchivos={cantidadArchivos}
              alSeleccionar={handleSelectMember}
            />
          );
        })}

        {!loading && filteredMembers.length === 0 && (
          <MensajeVacio mensaje="No hay pacientes que coincidan con la búsqueda." />
        )}
      </div>
    </div>
  );
}