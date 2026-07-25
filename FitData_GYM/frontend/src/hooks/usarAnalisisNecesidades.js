import { useEffect, useMemo, useState } from 'react';
import { construirRecomendacion, leerHistorialAnalisis, obtenerClaveAnalisis, PREGUNTAS_ANALISIS } from './datosAnalisisNecesidades';

function usarAnalisisNecesidades() {
  const [paso, establecerPaso] = useState(0); const [respuestas, establecerRespuestas] = useState({}); const [completado, establecerCompletado] = useState(false); const [historial, establecerHistorial] = useState([]); const [mostrarHistorial, establecerMostrarHistorial] = useState(false);
  useEffect(() => establecerHistorial(leerHistorialAnalisis(localStorage.getItem(obtenerClaveAnalisis()))), []);
  const preguntaActual = PREGUNTAS_ANALISIS[paso]; const recomendacion = useMemo(() => completado ? construirRecomendacion(respuestas) : null, [completado, respuestas]); const porcentaje = Math.round((Object.keys(respuestas).length / PREGUNTAS_ANALISIS.length) * 100); const puedeAvanzar = Boolean(respuestas[preguntaActual?.id]);
  const seleccionarRespuesta = (id, valor) => establecerRespuestas((anteriores) => ({ ...anteriores, [id]: valor }));
  const avanzar = () => { if (!puedeAvanzar) return; if (paso === PREGUNTAS_ANALISIS.length - 1) { const resultado = construirRecomendacion(respuestas); const entrada = { id: Date.now(), respuestas, completedAt: new Date().toISOString(), recommendation: resultado }; const historialActualizado = [entrada, ...leerHistorialAnalisis(localStorage.getItem(obtenerClaveAnalisis()))].slice(0, 12); localStorage.setItem(obtenerClaveAnalisis(), JSON.stringify(historialActualizado)); establecerHistorial(historialActualizado); establecerCompletado(true); } else establecerPaso((actual) => actual + 1); };
  return { paso, totalPasos: PREGUNTAS_ANALISIS.length, preguntaActual, respuestas, porcentaje, puedeAvanzar, completado, recomendacion, historial, mostrarHistorial, seleccionarRespuesta, avanzar, retroceder: () => establecerPaso((actual) => Math.max(0, actual - 1)), reiniciar: () => { establecerPaso(0); establecerRespuestas({}); establecerCompletado(false); }, alternarHistorial: () => establecerMostrarHistorial((actual) => !actual) };
}

export default usarAnalisisNecesidades;
