export const FORMULARIO_CITA_INICIAL = {
  inicio: '08:00',
  fin: '09:00',
};

export function crearMesInicial(fecha = new Date()) {
  return new Date(fecha.getFullYear(), fecha.getMonth(), 1);
}

export function irAlInicioDia(fecha) {
  return new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate(),
  );
}

export function formatearClaveFecha(fecha) {
  const year = fecha.getFullYear();
  const month = String(fecha.getMonth() + 1).padStart(2, '0');
  const day = String(fecha.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function esMismoDia(fechaA, fechaB) {
  return (
    fechaA.getFullYear() === fechaB.getFullYear() &&
    fechaA.getMonth() === fechaB.getMonth() &&
    fechaA.getDate() === fechaB.getDate()
  );
}

export function generarDiasCalendario(mesCalendario) {
  const year = mesCalendario.getFullYear();
  const month = mesCalendario.getMonth();

  const primerDia = new Date(year, month, 1);
  const desplazamientoLunes = (primerDia.getDay() + 6) % 7;
  const diasMesActual = new Date(year, month + 1, 0).getDate();
  const diasMesAnterior = new Date(year, month, 0).getDate();

  const celdas = [];

  for (
    let indice = desplazamientoLunes - 1;
    indice >= 0;
    indice -= 1
  ) {
    celdas.push({
      fecha: new Date(
        year,
        month - 1,
        diasMesAnterior - indice,
      ),
      enMesActual: false,
    });
  }

  for (let dia = 1; dia <= diasMesActual; dia += 1) {
    celdas.push({
      fecha: new Date(year, month, dia),
      enMesActual: true,
    });
  }

  while (celdas.length < 42) {
    const siguienteDia =
      celdas.length -
      (desplazamientoLunes + diasMesActual) +
      1;

    celdas.push({
      fecha: new Date(year, month + 1, siguienteDia),
      enMesActual: false,
    });
  }

  return celdas;
}

export function obtenerPartesNombre(nombreCompleto = '') {
  const partes = nombreCompleto.trim().split(/\s+/);
  const nombre = partes.shift() || 'Usuario';
  const apellidos = partes.join(' ');

  return {
    nombre,
    apellidos,
  };
}