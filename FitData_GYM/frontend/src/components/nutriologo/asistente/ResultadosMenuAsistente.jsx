import { ChefHat } from 'lucide-react';
import ResumenNutricionalDiario from './ResumenNutricionalDiario';
import TarjetaComidaSugerida from './TarjetaComidaSugerida';

export default function ResultadosMenuAsistente({ nutrientes, comidas, cargando }) {
  return (
    <>
      {nutrientes && (
        <ResumenNutricionalDiario
          calorias={nutrientes.calorias}
          proteina={nutrientes.proteina}
          carbohidratos={nutrientes.carbohidratos}
          grasas={nutrientes.grasas}
        />
      )}

      {comidas.length > 0 ? (
        <div className="space-y-2">
          <h4 className="mb-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
            Comidas sugeridas
          </h4>
          {comidas.map((comida, indice) => (
            <TarjetaComidaSugerida
              key={comida.id}
              tipo={comida.tipo || `Comida ${indice + 1}`}
              titulo={comida.titulo}
              minutos={comida.minutos}
              porciones={comida.porciones}
            />
          ))}
        </div>
      ) : (
        !cargando && (
          <div className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-slate-400">
            <ChefHat size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-xs">
              Ingresa las calorías objetivo y genera un menú al instante para tu paciente.
            </p>
          </div>
        )
      )}
    </>
  );
}
