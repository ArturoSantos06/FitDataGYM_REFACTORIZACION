import { Star } from 'lucide-react';

const ESTRELLAS = [1, 2, 3, 4, 5];

function IconoEstrella({ llena }) {
  return (
    <Star
      aria-hidden="true"
      className={`h-4 w-4 ${
        llena
          ? 'fill-current text-amber-400'
          : 'text-slate-600'
      }`}
    />
  );
}

function CalificacionEntrenador({
  entrenadorId,
  estaAsignado,
  clienteActualId,
  resenas,
  estrellasHover,
  promedio,
  onHoverEstrella,
  onSalirEstrella,
  onCalificar,
}) {
  const resenasEntrenador = resenas[entrenadorId] ?? [];

  const miResena = resenasEntrenador.find(
    (resena) => resena.clientId === clienteActualId,
  );

  const miCalificacion = miResena?.rating ?? 0;
  const calificacionVisible =
    estrellasHover[entrenadorId] || miCalificacion;

  if (estaAsignado) {
    return (
      <div className="flex items-center">
        {ESTRELLAS.map((estrella) => (
          <button
            key={estrella}
            type="button"
            aria-label={`Calificar con ${estrella} estrellas`}
            onClick={() => onCalificar(entrenadorId, estrella)}
            onMouseEnter={() =>
              onHoverEstrella(entrenadorId, estrella)
            }
            onMouseLeave={() => onSalirEstrella(entrenadorId)}
            className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <IconoEstrella
              llena={estrella <= calificacionVisible}
            />
          </button>
        ))}

        <span className="ml-2 text-xs text-slate-400">
          {promedio ? `(${promedio})` : '(Sin calificaciones)'}
        </span>
      </div>
    );
  }

  const promedioRedondeado = promedio
    ? Math.round(Number(promedio))
    : 0;

  return (
    <div className="flex items-center">
      {ESTRELLAS.map((estrella) => (
        <IconoEstrella
          key={estrella}
          llena={estrella <= promedioRedondeado}
        />
      ))}

      <span className="ml-2 text-xs text-slate-400">
        {promedio ? `(${promedio})` : '(Sin reseñas)'}
      </span>
    </div>
  );
}

export default CalificacionEntrenador;