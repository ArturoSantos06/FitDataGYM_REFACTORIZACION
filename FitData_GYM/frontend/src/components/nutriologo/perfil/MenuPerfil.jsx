import { ChevronRight, Lock, User } from 'lucide-react';
import { createElement } from 'react';

export default function MenuPerfil({ usuario, alNavegar }) {
  const nombreCompleto = `${usuario.nombre} ${usuario.apellidos}`.trim();
  const identidad =
    nombreCompleto || usuario.nombreUsuario || usuario.correo || 'N';

  const opciones = [
    {
      vista: 'datos',
      etiqueta: 'Editar datos personales',
      Icono: User,
      color: 'cyan',
    },
    {
      vista: 'contrasena',
      etiqueta: 'Cambiar contraseña',
      Icono: Lock,
      color: 'emerald',
    },
  ];

  return (
    <div className="w-full max-w-3xl animate-in overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl fade-in zoom-in duration-300">
      <div className="h-28 bg-linear-to-r from-cyan-950 via-blue-950 to-slate-900" />
      <div className="relative -mt-12 px-6 pb-8 md:px-8">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-slate-900 bg-blue-700 text-3xl font-bold text-white shadow-lg">
          {identidad.charAt(0).toUpperCase()}
        </div>
        <div className="mt-4">
          <h2 className="text-3xl font-bold text-white">
            {nombreCompleto || usuario.nombreUsuario || 'Nutriólogo'}
          </h2>
          <p className="text-slate-400">{usuario.correo}</p>
        </div>
        <div className="mt-8 space-y-3">
          {opciones.map(({ vista, etiqueta, Icono, color }) => (
            <button
              key={vista}
              type="button"
              onClick={() => alNavegar(vista)}
              className="group flex w-full items-center justify-between rounded-xl border border-slate-700/50 bg-slate-800/50 p-4 transition-all duration-200 hover:bg-slate-800"
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-lg p-2 ${
                  color === 'cyan'
                    ? 'bg-cyan-500/10 text-cyan-400 group-hover:text-cyan-300'
                    : 'bg-emerald-500/10 text-emerald-400 group-hover:text-emerald-300'
                }`}
                >
                  {createElement(Icono, { size: 20 })}
                </div>
                <span className="font-medium text-slate-200 group-hover:text-white">
                  {etiqueta}
                </span>
              </div>
              <ChevronRight
                className="text-slate-500 transition-transform group-hover:translate-x-1"
                size={20}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
