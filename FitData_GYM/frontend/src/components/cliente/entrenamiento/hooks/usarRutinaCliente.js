import { useEffect, useMemo, useState } from 'react';
import { auth as autenticacion, getMemberByAuthUid as obtenerMiembroPorAuthUid, getMemberByUserId as obtenerMiembroPorUsuario, getUser as obtenerUsuario, getUserByAuthUid as obtenerUsuarioPorAuthUid, storage, subscribeTrainerRoutineByMember as suscribirRutinaEntrenador } from '../../../../firebase';
import { getBlob, getDownloadURL, listAll, ref } from 'firebase/storage';

function extraerRutaAlmacenamiento(url) {
  try {
    const direccion = new URL(url);
    const posicion = direccion.pathname.indexOf('/o/');
    return posicion === -1 ? '' : decodeURIComponent(direccion.pathname.slice(posicion + 3) || '');
  } catch { return ''; }
}

function limpiarSesionRutina(setters) {
  setters.forEach((establecer) => establecer(null));
}

function usarRutinaCliente() {
  const [cargando, establecerCargando] = useState(true);
  const [miembro, establecerMiembro] = useState(null);
  const [rutina, establecerRutina] = useState(null);
  const [diaSeleccionado, establecerDiaSeleccionado] = useState(null);
  const [urlsArchivos, establecerUrlsArchivos] = useState({});
  const [indiceDescarga, establecerIndiceDescarga] = useState(null);
  const [errorDescarga, establecerErrorDescarga] = useState('');

  useEffect(() => {
    let cancelarRutina;
    const cargarRutina = async (usuarioAutenticado) => {
      if (!usuarioAutenticado) {
        limpiarSesionRutina([establecerMiembro, establecerRutina, establecerDiaSeleccionado]);
        establecerCargando(false);
        return;
      }
      let miembroResuelto = null;
      const porAuthUid = await obtenerMiembroPorAuthUid(usuarioAutenticado.uid);
      if (porAuthUid.success) miembroResuelto = porAuthUid.data;
      else {
        let idUsuario = usuarioAutenticado.uid;
        const porDocumento = await obtenerUsuario(usuarioAutenticado.uid);
        if (porDocumento.success) idUsuario = porDocumento.data.id;
        else {
          const porAuth = await obtenerUsuarioPorAuthUid(usuarioAutenticado.uid);
          if (porAuth.success) idUsuario = porAuth.data.id;
        }
        const porUsuario = await obtenerMiembroPorUsuario(idUsuario);
        if (porUsuario.success) miembroResuelto = porUsuario.data;
      }
      establecerMiembro(miembroResuelto);
      if (cancelarRutina) cancelarRutina();
      cancelarRutina = miembroResuelto
        ? suscribirRutinaEntrenador(miembroResuelto.id, establecerRutina)
        : undefined;
      establecerCargando(false);
    };
    const cancelarAutenticacion = autenticacion.onAuthStateChanged((usuario) => {
      establecerCargando(true);
      cargarRutina(usuario);
    });
    return () => { cancelarAutenticacion(); cancelarRutina?.(); };
  }, []);

  useEffect(() => {
    let cancelado = false;
    const resolverUrls = async () => {
      const archivos = Array.isArray(rutina?.files) ? rutina.files : [];
      if (!miembro?.id || archivos.length === 0) { if (!cancelado) establecerUrlsArchivos({}); return; }
      const urls = {};
      let elementosCarpeta = [];
      if (archivos.some((archivo) => !archivo?.storagePath && !archivo?.path)) {
        try { elementosCarpeta = (await listAll(ref(storage, `trainerRoutines/${miembro.id}`))).items || []; } catch { elementosCarpeta = []; }
      }
      await Promise.all(archivos.map(async (archivo, indice) => {
        const ruta = archivo?.storagePath || archivo?.path;
        if (ruta) { try { urls[indice] = await getDownloadURL(ref(storage, ruta)); return; } catch { /* buscar respaldo */ } }
        const nombre = String(archivo?.nombre || archivo?.name || '').trim().toLowerCase().replace(/\s+/g, '_');
        const encontrado = nombre ? elementosCarpeta.find((elemento) => {
          const nombreElemento = String(elemento?.name || '').toLowerCase();
          return nombreElemento === nombre || nombreElemento.endsWith(`_${nombre}`) || nombreElemento.endsWith(nombre) || nombreElemento.includes(nombre);
        }) : undefined;
        if (encontrado) { try { urls[indice] = await getDownloadURL(encontrado); } catch { /* conservar sin URL */ } }
        if (!urls[indice]) urls[indice] = archivo?.url || archivo?.downloadURL || '';
      }));
      if (!cancelado) establecerUrlsArchivos(urls);
    };
    resolverUrls();
    return () => { cancelado = true; };
  }, [rutina, miembro]);

  const nombreMiembro = useMemo(() => miembro ? `${miembro.nombre || ''} ${miembro.apellido || ''}`.trim() || 'Cliente' : 'Cliente', [miembro]);
  const diasConEjercicios = useMemo(() => (rutina?.days || []).filter((dia) => Array.isArray(dia.exercises) && dia.exercises.length > 0), [rutina]);
  const pasos = rutina?.steps || [];
  const estadisticas = useMemo(() => {
    const ejercicios = diasConEjercicios.length ? diasConEjercicios.flatMap((dia) => dia.exercises) : pasos;
    const totalSeries = ejercicios.reduce((total, ejercicio) => total + (Number.isNaN(parseInt(ejercicio.series, 10)) ? 0 : parseInt(ejercicio.series, 10)), 0);
    return { ejercicios: ejercicios.length, totalSeries, dias: diasConEjercicios.length };
  }, [diasConEjercicios, pasos]);
  const diaActivo = diaSeleccionado || diasConEjercicios[0]?.name;
  const diaActivoDatos = diasConEjercicios.find((dia) => dia.name === diaActivo) || diasConEjercicios[0];

  const descargarArchivo = async (archivo, urlDescarga, indice) => {
    const nombre = archivo?.nombre || archivo?.name || 'archivo';
    const ruta = archivo?.storagePath || archivo?.path || extraerRutaAlmacenamiento(urlDescarga || '');
    if (!urlDescarga && !ruta) return;
    try {
      establecerErrorDescarga(''); establecerIndiceDescarga(indice);
      let blob = null;
      if (ruta) { try { blob = await getBlob(ref(storage, ruta)); } catch { blob = null; } }
      const enlace = document.createElement('a');
      if (blob) { enlace.href = window.URL.createObjectURL(blob); enlace.download = nombre; }
      else { if (!urlDescarga) throw new Error('Sin URL'); enlace.href = urlDescarga; enlace.download = nombre; enlace.rel = 'noreferrer'; }
      document.body.appendChild(enlace); enlace.click(); enlace.remove();
      if (blob) window.URL.revokeObjectURL(enlace.href);
    } catch { establecerErrorDescarga('No se pudo descargar este archivo. El enlace puede haber expirado o no tienes permisos de Storage.'); }
    finally { establecerIndiceDescarga(null); }
  };

  return { cargando, miembro, rutina, nombreMiembro, diasConEjercicios, pasos, diaActivo, diaActivoDatos,
    establecerDiaActivo: establecerDiaSeleccionado, estadisticas, tieneArchivos: Array.isArray(rutina?.files) && rutina.files.length > 0,
    urlsArchivos, indiceDescarga, errorDescarga, descargarArchivo };
}

export default usarRutinaCliente;
