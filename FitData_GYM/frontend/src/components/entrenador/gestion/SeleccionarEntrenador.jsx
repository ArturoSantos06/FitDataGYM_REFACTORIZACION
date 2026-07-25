import { useState } from 'react';
import ModalClientesEntrenador from './seleccionar-entrenador/ModalClientesEntrenador';

const ENTRENADORES_SIMULADOS = [
  {
    id: 1,
    name: 'Carlos "Titán" Rodríguez',
    photo: 'https://i.pravatar.cc/150?u=1',
    clients: ['Juan Pérez', 'María García', 'Alex Smith'],
  },
  {
    id: 2,
    name: 'Elena Fitness',
    photo: 'https://i.pravatar.cc/150?u=2',
    clients: ['Sofía Luna', 'Roberto Carlos'],
  },
  {
    id: 3,
    name: 'Marcos Iron',
    photo: 'https://i.pravatar.cc/150?u=3',
    clients: [],
  },
];

function SeleccionarEntrenador() {
  const [entrenadorSeleccionado, setEntrenadorSeleccionado] =
    useState(null);

  const cerrarModal = () => {
    setEntrenadorSeleccionado(null);
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      <header className="mb-8">
        <h1 className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-3xl font-extrabold text-transparent">
          Contratar Entrenador
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Explora los perfiles disponibles y vincula tu cuenta.
        </p>
      </header>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-slate-800/30 backdrop-blur-md">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-800/50 text-xs uppercase tracking-wider text-slate-300">
              <th scope="col" className="px-6 py-4 font-semibold">
                Entrenador
              </th>

              <th scope="col" className="px-6 py-4 font-semibold">
                Estado de Red
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-right font-semibold"
              >
                Acciones
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-700/50">
            {ENTRENADORES_SIMULADOS.map((entrenador) => (
              <tr
                key={entrenador.id}
                className="group transition-colors hover:bg-slate-700/20"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={entrenador.photo}
                        alt={`Fotografía de ${entrenador.name}`}
                        className="h-12 w-12 rounded-full border-2 border-slate-700 object-cover transition-colors group-hover:border-purple-500"
                      />

                      <span
                        aria-hidden="true"
                        className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-slate-900 bg-green-500"
                      />
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        {entrenador.name}
                      </p>

                      <p className="text-xs text-slate-500">
                        Professional Coach
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <button
                    type="button"
                    onClick={() =>
                      setEntrenadorSeleccionado(entrenador)
                    }
                    className="flex items-center gap-2 text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
                  >
                    <span className="rounded border border-blue-500/20 bg-blue-500/10 px-2 py-0.5">
                      {entrenador.clients.length} Clientes
                    </span>

                    <span aria-hidden="true" className="text-[10px]">
                      ▼
                    </span>
                  </button>
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    className="rounded-lg bg-linear-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-purple-900/20 transition-all hover:from-purple-500 hover:to-blue-500 active:scale-95"
                  >
                    Vincularse
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalClientesEntrenador
        entrenador={entrenadorSeleccionado}
        onCerrar={cerrarModal}
      />
    </div>
  );
}

export default SeleccionarEntrenador;