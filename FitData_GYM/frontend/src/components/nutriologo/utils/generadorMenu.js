const CATALOGO_COMIDAS = {
  desayunos: [
    ['Avena con manzana, canela y nueces', 350, 12, 55, 10, 10],
    ['Huevos revueltos con espinaca y pan integral', 400, 20, 30, 22, 15],
    ['Yogur griego con frutos rojos y miel', 300, 18, 25, 14, 5],
    ['Tostadas de aguacate con huevo pochado', 450, 22, 40, 24, 15],
    ['Batido de proteína con plátano y avena', 380, 30, 45, 8, 5],
  ],
  comidas: [
    ['Pechuga de pollo a la plancha con arroz y brócoli', 500, 45, 50, 12, 25],
    ['Salmón al horno con quinoa y espárragos', 600, 40, 45, 25, 30],
    ['Ensalada de atún con garbanzos y vinagreta', 450, 35, 30, 20, 10],
    ['Tacos de pechuga de pavo con tortillas de maíz', 550, 40, 45, 22, 20],
    ['Pasta integral con carne de res magra molida', 650, 45, 70, 18, 25],
  ],
  cenas: [
    ['Filete de pescado blanco con vegetales al vapor', 350, 35, 15, 15, 20],
    ['Pechuga de pavo asada con ensalada verde', 300, 30, 10, 12, 20],
    ['Tortilla de claras de huevo con champiñones', 250, 25, 5, 10, 10],
    ['Requesón con almendras', 280, 25, 10, 15, 5],
    ['Fajitas de pollo en hojas de lechuga', 320, 30, 12, 14, 15],
  ],
  colaciones: [
    ['Manzana con crema de cacahuate', 200, 6, 25, 10, 5],
    ['Un puñado de nueces y almendras', 180, 5, 6, 16, 0],
    ['Gelatina sin azúcar con fresas', 100, 2, 20, 0, 5],
    ['Batido de proteína en agua', 120, 25, 3, 1, 2],
    ['Tortitas de arroz con requesón', 150, 10, 22, 2, 5],
  ],
};

const adaptarComida = ([titulo, kcal, proteina, carbohidratos, grasas, minutos], tipo) => ({
  titulo,
  kcal,
  proteina,
  carbohidratos,
  grasas,
  minutos,
  tipo,
});

const elegirAleatoriamente = (elementos) =>
  elementos[Math.floor(Math.random() * elementos.length)];

export function generarMenuLocal(caloriasObjetivo, elegir = elegirAleatoriamente) {
  const calorias = Number(caloriasObjetivo);
  if (!Number.isFinite(calorias) || calorias <= 0) {
    throw new Error('Ingresa un objetivo calórico válido mayor a cero.');
  }

  const comidas = [
    adaptarComida(elegir(CATALOGO_COMIDAS.desayunos), 'Desayuno'),
    adaptarComida(elegir(CATALOGO_COMIDAS.comidas), 'Comida'),
    adaptarComida(elegir(CATALOGO_COMIDAS.cenas), 'Cena'),
  ];
  let sumaCalorias = comidas.reduce((total, comida) => total + comida.kcal, 0);

  for (let restantes = 3; calorias - sumaCalorias > 150 && restantes > 0; restantes -= 1) {
    const colacion = adaptarComida(elegir(CATALOGO_COMIDAS.colaciones), 'Colación');
    comidas.push(colacion);
    sumaCalorias += colacion.kcal;
  }

  const proporcion = calorias / sumaCalorias;
  const porciones = proporcion >= 1.3 ? 1.5 : proporcion <= 0.8 ? 0.75 : 1;
  const instante = Date.now();
  const comidasAjustadas = comidas.map((comida, indice) => ({
    id: `comida-${indice}-${instante}`,
    titulo: comida.titulo,
    minutos: comida.minutos,
    porciones,
    tipo: comida.tipo,
    kcal: Math.round(comida.kcal * proporcion),
    proteina: Math.round(comida.proteina * proporcion),
    carbohidratos: Math.round(comida.carbohidratos * proporcion),
    grasas: Math.round(comida.grasas * proporcion),
  }));

  return {
    comidas: comidasAjustadas,
    nutrientes: {
      calorias: comidasAjustadas.reduce((total, comida) => total + comida.kcal, 0),
      proteina: comidasAjustadas.reduce((total, comida) => total + comida.proteina, 0),
      carbohidratos: comidasAjustadas.reduce(
        (total, comida) => total + comida.carbohidratos,
        0,
      ),
      grasas: comidasAjustadas.reduce((total, comida) => total + comida.grasas, 0),
    },
  };
}
