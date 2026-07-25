import usarAnalisisNecesidades from './hooks/usarAnalisisNecesidades';
import PreguntaAnalisisNecesidades from './componentes/PreguntaAnalisisNecesidades';
import ResultadoAnalisisNecesidades from './componentes/ResultadoAnalisisNecesidades';

function AnalisisNecesidades() {
  const estado = usarAnalisisNecesidades();
  if (estado.completado && estado.recomendacion) return <ResultadoAnalisisNecesidades {...estado} />;
  return <PreguntaAnalisisNecesidades {...estado} />;
}

export default AnalisisNecesidades;
