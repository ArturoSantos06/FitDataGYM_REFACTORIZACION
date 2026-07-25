import { BarraMensual } from '../ui/BarraMensual';
import { MensajeVacio } from '../ui/MensajeVacio';

export default function GraficaMensual({ datosMensuales = [] }) {
  if (!datosMensuales.length) {
    return (
      <MensajeVacio 
        titulo="Ingresos por Mes"
        descripcion="Aún no hay suficientes movimientos para graficar ingresos mensuales."
      />
    );
  }

  const totalMaximo = Math.max(...datosMensuales.map((fila) => fila.total), 1);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-slate-300">
        Ingresos por Mes
      </h3>

      <div className="space-y-3">
        {datosMensuales.map((fila) => {
          const porcentajeAncho = Math.max((fila.total / totalMaximo) * 100, 4);

          return (
            <BarraMensual
              key={fila.month}
              etiqueta={fila.label}
              total={fila.total}
              planes={fila.planes}
              porcentajeAncho={porcentajeAncho}
            />
          );
        })}
      </div>
    </section>
  );
}
