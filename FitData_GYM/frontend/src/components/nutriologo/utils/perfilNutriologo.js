const ROLES_NUTRIOLOGO = new Set([
  'nutritionist',
  'nutriologo',
  'nutriologa',
  'nutriologo/a',
  'nutricionista',
  'nutri',
]);

export const normalizarClavePerfil = (valor) =>
  String(valor || '').trim().toLowerCase();

const obtenerFecha = (valor) => {
  if (!valor) return 0;
  if (typeof valor?.toDate === 'function') return valor.toDate().getTime();
  const fecha = new Date(valor).getTime();
  return Number.isNaN(fecha) ? 0 : fecha;
};

const separarNombre = (datos) => {
  const nombre = String(datos.firstName || '').trim();
  const apellidos = String(datos.lastName || '').trim();
  if (nombre || apellidos) return { nombre, apellidos };
  const partes = String(datos.displayName || datos.nombre || '').trim().split(/\s+/);
  return {
    nombre: partes.shift() || '',
    apellidos: partes.join(' '),
  };
};

export const normalizarPerfilNutriologo = (datos, sesion) => {
  const nombres = separarNombre(datos);
  return {
    id: datos.id || sesion.uid,
    nombre: nombres.nombre,
    apellidos: nombres.apellidos,
    nombreUsuario: datos.username || '',
    correo: datos.email || sesion.email || '',
    telefono: datos.telefono || datos.phone || '',
  };
};

export const calcularCodigoNutriologo = (usuarios, perfil) => {
  const claveActual =
    normalizarClavePerfil(perfil.correo) || normalizarClavePerfil(perfil.id);
  const clavesVistas = new Set();
  const nutriologos = usuarios
    .filter((usuario) =>
      ROLES_NUTRIOLOGO.has(
        normalizarClavePerfil(usuario.role || usuario.user_type),
      ))
    .sort((a, b) => {
      const diferencia = obtenerFecha(a.createdAt || a.updatedAt)
        - obtenerFecha(b.createdAt || b.updatedAt);
      if (diferencia) return diferencia;
      return normalizarClavePerfil(
        a.displayName || a.username || a.email,
      ).localeCompare(
        normalizarClavePerfil(b.displayName || b.username || b.email),
      );
    })
    .filter((usuario) => {
      const clave =
        normalizarClavePerfil(usuario.email)
        || normalizarClavePerfil(usuario.authUid || usuario.id);
      if (!clave || clavesVistas.has(clave)) return false;
      clavesVistas.add(clave);
      return true;
    });
  const indice = nutriologos.findIndex((usuario) => {
    const clave =
      normalizarClavePerfil(usuario.email)
      || normalizarClavePerfil(usuario.authUid || usuario.id);
    return clave === claveActual;
  });
  return indice < 0 ? '---' : String(indice + 1).padStart(3, '0');
};

export const crearActualizacionPerfil = (perfil) => {
  const nombreUsuario = String(perfil.nombreUsuario || '').trim();
  const nombre = String(perfil.nombre || '').trim();
  const apellidos = String(perfil.apellidos || '').trim();
  const correo = normalizarClavePerfil(perfil.correo);
  const telefono = String(perfil.telefono || '').replace(/\D/g, '').slice(0, 10);
  const nombreCompleto = [nombre, apellidos].filter(Boolean).join(' ')
    || nombreUsuario;

  if (!nombreUsuario) throw new Error('El nombre de usuario no puede estar vacío');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    throw new Error('Ingresa un correo electrónico válido');
  }

  return {
    perfil: { ...perfil, nombre, apellidos, nombreUsuario, correo, telefono },
    datosFirebase: {
      email: correo,
      username: nombreUsuario,
      displayName: nombreCompleto,
      nombre: nombreCompleto,
      firstName: nombre,
      lastName: apellidos,
      phone: telefono,
      telefono,
    },
  };
};
