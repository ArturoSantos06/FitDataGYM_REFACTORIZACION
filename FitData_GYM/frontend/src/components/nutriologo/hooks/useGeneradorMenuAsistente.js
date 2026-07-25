import { useCallback, useEffect, useRef, useState } from 'react';
import { generarMenuLocal } from '../utils/generadorMenu';

export default function useGeneradorMenuAsistente(
  caloriasObjetivo,
  alCambiarError,
) {
  const [comidasSugeridas, setComidasSugeridas] = useState([]);
  const [nutrientesDiarios, setNutrientesDiarios] = useState(null);
  const [cargandoMenu, setCargandoMenu] = useState(false);
  const temporizador = useRef(null);

  useEffect(() => () => clearTimeout(temporizador.current), []);

  const generarSugerencias = useCallback(() => {
    setCargandoMenu(true);
    alCambiarError('');
    clearTimeout(temporizador.current);

    temporizador.current = setTimeout(() => {
      try {
        const resultado = generarMenuLocal(caloriasObjetivo);
        setComidasSugeridas(resultado.comidas);
        setNutrientesDiarios(resultado.nutrientes);
      } catch (fallo) {
        alCambiarError(
          fallo?.message || 'Ocurrió un error al generar el menú local.',
        );
      } finally {
        setCargandoMenu(false);
      }
    }, 600);
  }, [alCambiarError, caloriasObjetivo]);

  return {
    cargandoMenu,
    comidasSugeridas,
    generarSugerencias,
    nutrientesDiarios,
  };
}
