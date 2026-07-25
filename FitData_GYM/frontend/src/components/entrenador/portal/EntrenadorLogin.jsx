import FormularioInicioSesionEntrenador from './FormularioInicioSesionEntrenador';
import useInicioSesionEntrenador from './hooks/useInicioSesionEntrenador';

function InicioSesionEntrenador() {
  const estadoInicioSesion = useInicioSesionEntrenador();

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/fitdata-logo.png" alt="FitData Logo" className="h-20 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl font-bold text-white mb-2">Portal de Entrenador</h1>
          <p className="text-slate-400">Inicia sesión con tu usuario y contraseña</p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <FormularioInicioSesionEntrenador {...estadoInicioSesion} />
        </div>
      </div>
    </div>
  );
}

export default InicioSesionEntrenador;
