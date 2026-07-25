import { ArrowLeft, Hash, Mail, Phone, User } from 'lucide-react';
import useFormularioPerfil from '../hooks/useFormularioPerfil';
import CampoPerfil from './CampoPerfil';

export default function FormularioDatosPersonales({
  usuario,
  codigoNutriologo,
  alGuardar,
  alRegresar,
}) {
  const {
    formulario,
    guardando,
    error,
    manejarCambio,
    manejarEnvio,
  } = useFormularioPerfil(usuario, alGuardar);

  return (
    <div className="w-full max-w-2xl animate-in rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl fade-in slide-in-from-bottom-4 duration-300 md:p-8">
      <div className="mb-8 flex items-center gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={alRegresar}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          type="button"
        >
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Datos del Nutriólogo</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CampoPerfil
            etiqueta="Código de Nutriólogo"
            Icono={Hash}
            valor={`#${codigoNutriologo || '---'}`}
            deshabilitado
          />
          <CampoPerfil
            etiqueta="Correo electrónico"
            Icono={Mail}
            tipo="email"
            nombre="correo"
            valor={formulario.correo}
            alCambiar={manejarCambio}
            claseColor="border-cyan-500/30 bg-cyan-900/10 text-white focus:border-cyan-500"
          />
          <CampoPerfil
            etiqueta="Usuario"
            Icono={User}
            nombre="nombreUsuario"
            valor={formulario.nombreUsuario}
            alCambiar={manejarCambio}
            claseColor="border-indigo-500/30 bg-indigo-900/10 text-white focus:border-indigo-500"
          />
          <CampoPerfil
            etiqueta="Teléfono"
            Icono={Phone}
            tipo="tel"
            nombre="telefono"
            valor={formulario.telefono}
            alCambiar={manejarCambio}
            marcador="10 dígitos"
            claseColor="border-blue-500/30 bg-blue-900/10 text-white focus:border-blue-500"
          />
          <CampoPerfil
            etiqueta="Nombre(s)"
            Icono={User}
            nombre="nombre"
            valor={formulario.nombre}
            alCambiar={manejarCambio}
            marcador="Nombre(s)"
          />
          <CampoPerfil
            etiqueta="Apellidos"
            Icono={User}
            nombre="apellidos"
            valor={formulario.apellidos}
            alCambiar={manejarCambio}
            marcador="Apellidos"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-700 bg-red-900/20 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={alRegresar}
            className="w-1/3 rounded-xl bg-slate-800 px-6 py-3 font-bold text-white transition-all hover:bg-slate-700"
          >
            Cancelar
          </button>
          <button
            disabled={guardando}
            type="submit"
            className="w-2/3 rounded-xl bg-cyan-600 px-6 py-3 font-bold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500 active:scale-95 disabled:opacity-50"
          >
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}
