const FACTORES_ACTIVIDAD = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  atleta: 1.9,
};

const CONFIGURACIONES_OBJETIVO = {
  perder_grasa: { ajusteCalorico: -0.15, proteinaPorKg: 2, grasaPorKg: 0.8 },
  mantener: { ajusteCalorico: 0, proteinaPorKg: 1.8, grasaPorKg: 1 },
  ganar_musculo: { ajusteCalorico: 0.1, proteinaPorKg: 2.2, grasaPorKg: 0.9 },
};

export const OPCIONES_ACTIVIDAD = [
  { valor: 'sedentario', etiqueta: 'Sedentario' },
  { valor: 'ligero', etiqueta: 'Ligero (1-3 días/semana)' },
  { valor: 'moderado', etiqueta: 'Moderado (3-5 días/semana)' },
  { valor: 'intenso', etiqueta: 'Intenso (6-7 días/semana)' },
  { valor: 'atleta', etiqueta: 'Atleta / doble sesión' },
];

export const OPCIONES_OBJETIVO = [
  { valor: 'perder_grasa', etiqueta: 'Perder grasa' },
  { valor: 'mantener', etiqueta: 'Mantener peso' },
  { valor: 'ganar_musculo', etiqueta: 'Ganar músculo' },
];

export const INFORMACION_FORMULA =
  'Mifflin-St Jeor + ajuste por actividad y objetivo';

const convertirNumero = (valor, etiqueta, minimo, maximo) => {
  const numero = Number(valor);
  if (!Number.isFinite(numero) || numero < minimo || numero > maximo) {
    throw new Error(`${etiqueta} debe estar entre ${minimo} y ${maximo}`);
  }
  return numero;
};

const obtenerOpcion = (opciones, clave, mensaje) => {
  const opcion = opciones[clave];
  if (!opcion) throw new Error(mensaje);
  return opcion;
};

export function calcularTasaMetabolicaBasal({
  sexo,
  pesoKg,
  alturaCm,
  edad,
}) {
  const ajusteSexo = obtenerOpcion(
    { hombre: 5, mujer: -161 },
    sexo,
    'Selecciona un sexo válido',
  );
  return 10 * pesoKg + 6.25 * alturaCm - 5 * edad + ajusteSexo;
}

export function calcularObjetivosMacronutrientes(datos) {
  const edad = convertirNumero(datos.edad, 'La edad', 10, 100);
  const pesoKg = convertirNumero(datos.pesoKg, 'El peso', 30, 250);
  const alturaCm = convertirNumero(datos.alturaCm, 'La altura', 120, 240);
  const factorActividad = obtenerOpcion(
    FACTORES_ACTIVIDAD,
    datos.nivelActividad,
    'Selecciona un nivel de actividad válido',
  );
  const configuracion = obtenerOpcion(
    CONFIGURACIONES_OBJETIVO,
    datos.objetivo,
    'Selecciona un objetivo nutricional válido',
  );
  const tasaMetabolicaBasal = calcularTasaMetabolicaBasal({
    sexo: datos.sexo,
    pesoKg,
    alturaCm,
    edad,
  });
  const caloriasMantenimiento = tasaMetabolicaBasal * factorActividad;
  const caloriasObjetivo =
    caloriasMantenimiento * (1 + configuracion.ajusteCalorico);
  const proteinaGramos = pesoKg * configuracion.proteinaPorKg;
  const grasaGramos = pesoKg * configuracion.grasaPorKg;
  const caloriasProteina = proteinaGramos * 4;
  const caloriasGrasa = grasaGramos * 9;
  const caloriasCarbohidratos = Math.max(
    caloriasObjetivo - caloriasProteina - caloriasGrasa,
    0,
  );

  return {
    calorias: Math.round(caloriasObjetivo),
    tasaMetabolicaBasal: Math.round(tasaMetabolicaBasal),
    caloriasMantenimiento: Math.round(caloriasMantenimiento),
    proteinaGramos: Math.round(proteinaGramos),
    grasaGramos: Math.round(grasaGramos),
    carbohidratosGramos: Math.round(caloriasCarbohidratos / 4),
    distribucion: {
      proteina: Math.round((caloriasProteina / caloriasObjetivo) * 100),
      grasa: Math.round((caloriasGrasa / caloriasObjetivo) * 100),
      carbohidratos: Math.round(
        (caloriasCarbohidratos / caloriasObjetivo) * 100,
      ),
    },
  };
}
