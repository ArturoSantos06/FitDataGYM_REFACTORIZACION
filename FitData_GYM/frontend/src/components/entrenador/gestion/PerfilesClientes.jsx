import { useMemo, useState } from 'react';
import usePerfilesClientes from './perfiles-clientes/usePerfilesClientes';
import TarjetaPerfilCliente from './perfiles-clientes/TarjetaPerfilCliente';
import ModalPerfilCliente from './perfiles-clientes/ModalPerfilCliente';

function PerfilesClientes({ refreshTrigger }) {
  const [perfilSeleccionado, setPerfilSeleccionado] =
    useState(null);
  const [filtro, setFiltro] = useState('');

  const {
    perfiles,
    cargando,
    error,
  } = usePerfilesClientes(refreshTrigger);

  const perfilesFiltrados = useMemo(() => {
    const termino = filtro.trim().toLowerCase();

    if (!termino) {
      return perfiles;
    }

    return perfiles.filter((perfil) =>
      String(perfil.memberName ?? '')
        .toLowerCase()
        .includes(termino),
    );
  }, [perfiles, filtro]);

  return (
    <div className="mx-auto w-full max-w-5xl p-6">
      <h1 className="mb-4 bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-2xl font-bold text-transparent">
        Fichas Médicas de Clientes
      </h1>

      <div className="mb-4 flex gap-3">
        <label htmlFor="buscar-perfil" className="sr-only">
          Buscar cliente por nombre
        </label>

        <input
          id="buscar-perfil"
          type="search"
          placeholder="Buscar cliente por nombre..."
          value={filtro}
          onChange={(evento) => setFiltro(evento.target.value)}
          className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none focus:border-blue-500 sm:w-auto"
        />
      </div>

      {cargando && (
        <p className="italic text-slate-400">
          Consultando expedientes...
        </p>
      )}

      {!cargando && error && (
        <p className="mb-3 rounded-lg border border-red-800 bg-red-900/20 p-3 text-red-400">
          {error}
        </p>
      )}

      {!cargando &&
        !error &&
        perfilesFiltrados.length === 0 && (
          <p className="text-slate-500">
            No se encontraron registros.
          </p>
        )}

      <div className="space-y-2">
        {perfilesFiltrados.map((perfil) => (
          <TarjetaPerfilCliente
            key={perfil.id}
            perfil={perfil}
            onSeleccionar={setPerfilSeleccionado}
          />
        ))}
      </div>

      <ModalPerfilCliente
        perfil={perfilSeleccionado}
        onCerrar={() => setPerfilSeleccionado(null)}
      />
    </div>
  );
}

export default PerfilesClientes;