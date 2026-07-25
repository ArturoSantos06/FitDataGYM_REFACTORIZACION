import {
  ChevronRight,
  Lock,
  User,
} from 'lucide-react';

const OPCIONES_MENU = [
  {
    id: 'edit-personal',
    texto: 'Editar datos personales',
    Icono: User,
    claseIcono:
      'bg-cyan-500/10 text-cyan-400 group-hover:text-cyan-300',
    claseFlecha:
      'group-hover:text-cyan-400',
  },
  {
    id: 'change-password',
    texto: 'Cambiar contraseña',
    Icono: Lock,
    claseIcono:
      'bg-emerald-500/10 text-emerald-400 group-hover:text-emerald-300',
    claseFlecha:
      'group-hover:text-emerald-400',
  },
];

function obtenerDatosUsuario(usuario = {}) {
  const nombreCompleto = [
    usuario.firstName,
    usuario.lastName,
  ]
    .filter(Boolean)
    .join(' ')
    .trim();

  const nombreVisible =
    nombreCompleto ||
    usuario.username ||
    'Entrenador';

  const correoVisible =
    usuario.email ||
    'Sin correo registrado';

  const inicialPerfil = String(
    nombreVisible || correoVisible || 'T',
  )
    .charAt(0)
    .toUpperCase();

  return {
    nombreVisible,
    correoVisible,
    inicialPerfil,
  };
}

function MenuPerfilEntrenador({
  usuario = {},
  onNavigate,
}) {
  const {
    nombreVisible,
    correoVisible,
    inicialPerfil,
  } = obtenerDatosUsuario(usuario);

  const navegarA = (seccion) => {
    onNavigate?.(seccion);
  };

  return (
    <section className="animate-in fade-in zoom-in w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl duration-300">
      <div
        aria-hidden="true"
        className="h-28 bg-linear-to-r from-cyan-950 via-blue-950 to-slate-900"
      />

      <div className="relative -mt-12 px-6 pb-8 md:px-8">
        <div
          aria-label={`Perfil de ${nombreVisible}`}
          className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-blue-700 text-3xl font-bold text-white shadow-lg"
        >
          {inicialPerfil}
        </div>

        <div className="mt-4">
          <h2 className="text-3xl font-bold text-white">
            {nombreVisible}
          </h2>

          <p className="break-all text-slate-400">
            {correoVisible}
          </p>
        </div>

        <nav
          aria-label="Opciones del perfil del entrenador"
          className="mt-8 space-y-3"
        >
          {OPCIONES_MENU.map(
            ({
              id,
              texto,
              Icono,
              claseIcono,
              claseFlecha,
            }) => (
              <button
                key={id}
                type="button"
                onClick={() => navegarA(id)}
                className="group flex w-full items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-all duration-200 hover:bg-slate-800"
              >
                <span className="flex items-center gap-4">
                  <span
                    className={`rounded-lg p-2 transition-colors ${claseIcono}`}
                  >
                    <Icono
                      size={20}
                      aria-hidden="true"
                    />
                  </span>

                  <span className="font-medium text-slate-200 group-hover:text-white">
                    {texto}
                  </span>
                </span>

                <ChevronRight
                  size={20}
                  aria-hidden="true"
                  className={`text-slate-500 transition-all group-hover:translate-x-1 ${claseFlecha}`}
                />
              </button>
            ),
          )}
        </nav>
      </div>
    </section>
  );
}

export default MenuPerfilEntrenador;