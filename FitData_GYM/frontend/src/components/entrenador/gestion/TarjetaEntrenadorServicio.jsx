import {
  Award,
  CheckCircle,
  Dumbbell,
} from 'lucide-react';
import {
  formatearMoneda,
  obtenerConfiguracionServicio,
  obtenerPrecioPorTipoServicio,
} from '../../../backend/utilidadesServicioEntrenador';
import CalificacionEntrenador from './tarjeta-entrenador-servicio/CalificacionEntrenador';

function obtenerNombreEntrenador(entrenador) {
  const nombreCompleto = `${String(
    entrenador.firstName ?? '',
  ).trim()} ${String(
    entrenador.lastName ?? '',
  ).trim()}`.trim();

  return (
    entrenador.displayName ||
    nombreCompleto ||
    entrenador.nombre ||
    'Sin nombre'
  );
}

function TarjetaEntrenadorServicio({
  entrenador,
  entrenadorSeleccionado,
  entrenadorAsignadoId,
  clienteActualId,
  resenas,
  estrellasHover,
  asignando,
  onHoverEstrella,
  onSalirEstrella,
  onCalificar,
  onSeleccionar,
  calcularPromedio,
}) {
  const configuracion =
    obtenerConfiguracionServicio(entrenador);

  const estaSeleccionado =
    entrenadorSeleccionado?.id === entrenador.id;

  const estaAsignado =
    entrenadorAsignadoId === entrenador.id;

  const estaAsignando =
    asignando && estaSeleccionado;

  const promedio = calcularPromedio(entrenador.id);

  const estilosTarjeta = estaSeleccionado
    ? 'border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20'
    : 'border-slate-700';

  const estilosBoton = estaAsignado
    ? 'cursor-not-allowed bg-green-600 text-white'
    : estaSeleccionado
      ? 'bg-blue-600 text-white hover:bg-blue-500'
      : 'bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-50';

  const textoBoton = estaAsignando
    ? 'Asignando...'
    : estaAsignado
      ? 'Asignado'
      : 'Seleccionar';

  return (
    <article
      className={`relative w-full rounded-xl border bg-slate-900/60 p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-slate-800/80 hover:shadow-lg hover:shadow-blue-500/10 ${estilosTarjeta}`}
    >
      {estaSeleccionado && (
        <CheckCircle
          aria-label="Entrenador seleccionado"
          className="absolute right-3 top-3 h-6 w-6 text-blue-400"
        />
      )}

      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500/10">
          <Dumbbell
            aria-hidden="true"
            className="h-8 w-8 text-blue-400"
          />
        </div>

        <div>
          <h3 className="text-lg font-bold text-white">
            {obtenerNombreEntrenador(entrenador)}
          </h3>

          <p className="text-sm font-medium text-blue-400">
            {entrenador.especialidad ||
              'Entrenador Personal'}
          </p>

          <div className="mt-2 flex flex-wrap justify-center gap-2 text-[11px] font-semibold">
            {configuracion.offersPersonal && (
              <span className="rounded-full border border-cyan-700 bg-cyan-900/40 px-2 py-1 text-cyan-200">
                Personal $
                {formatearMoneda(
                  obtenerPrecioPorTipoServicio(
                    entrenador,
                    'PERSONAL',
                  ),
                )}{' '}
                MXN
              </span>
            )}

            {configuracion.offersGroup && (
              <span className="rounded-full border border-emerald-700 bg-emerald-900/40 px-2 py-1 text-emerald-200">
                Grupal $
                {formatearMoneda(
                  obtenerPrecioPorTipoServicio(
                    entrenador,
                    'GRUPAL',
                  ),
                )}{' '}
                MXN
              </span>
            )}
          </div>
        </div>

        <CalificacionEntrenador
          entrenadorId={entrenador.id}
          estaAsignado={estaAsignado}
          clienteActualId={clienteActualId}
          resenas={resenas}
          estrellasHover={estrellasHover}
          promedio={promedio}
          onHoverEstrella={onHoverEstrella}
          onSalirEstrella={onSalirEstrella}
          onCalificar={onCalificar}
        />

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Award aria-hidden="true" className="h-4 w-4" />
          <span>Certificado</span>
        </div>

        <button
          type="button"
          onClick={() => onSeleccionar(entrenador)}
          disabled={asignando || estaAsignado}
          className={`w-full rounded-lg px-4 py-2 font-semibold transition-all ${estilosBoton}`}
        >
          {textoBoton}
        </button>
      </div>
    </article>
  );
}

export default TarjetaEntrenadorServicio;