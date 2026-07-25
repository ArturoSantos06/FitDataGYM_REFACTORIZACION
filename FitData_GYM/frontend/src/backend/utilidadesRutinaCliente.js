const TRADUCCIONES_MUSCULARES = { pectorals: 'Pectorales', delts: 'Deltoides', biceps: 'Bíceps', triceps: 'Tríceps', lats: 'Dorsales', glutes: 'Glúteos', quads: 'Cuádriceps', hamstrings: 'Isquiotibiales', calves: 'Pantorrillas', abs: 'Abdominales', forearms: 'Antebrazos', traps: 'Trapecios' };
const REEMPLAZOS_EJERCICIO = [[/\bone arm\b/gi, 'un brazo'], [/\bshoulders?\b/gi, 'deltoides'], [/\bstanding\b/gi, 'de pie'], [/\bexternal rotation\b/gi, 'rotación externa'], [/\bhold\b/gi, 'sostener'], [/\braise\b/gi, 'elevación'], [/\bbench\b/gi, 'banco'], [/\bdumbbell\b/gi, 'mancuerna'], [/\bbarbell\b/gi, 'barra'], [/\breps?\b/gi, 'repeticiones'], [/\bsets?\b/gi, 'series'], [/\brest\b/gi, 'descanso'], [/\bStep\s*:?\s*(\d+)\b/gi, 'Paso $1']];

export const formatearFechaHora = (valor) => {
  if (!valor) return 'Sin fecha';
  try { const fecha = valor?.toDate?.() || new Date(valor); return Number.isNaN(fecha.getTime()) ? 'Sin fecha' : fecha.toLocaleString('es-MX', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }); } catch { return String(valor); }
};
export const traducirMusculo = (valor) => TRADUCCIONES_MUSCULARES[String(valor || '').trim().toLowerCase()] || valor || '';
export const traducirTextoEjercicio = (valor) => REEMPLAZOS_EJERCICIO.reduce((texto, [patron, reemplazo]) => texto.replace(patron, reemplazo), typeof valor === 'string' ? valor : '');
export const contieneTextoIngles = (texto) => /\b(the|and|with|your|for|from|until|while|slowly|then|keep|repeat|start|starting|position|pause|moment|fully|extended|overhead|arm|hand|feet|width|facing|forward|apart|step)\b/i.test(texto || '');
