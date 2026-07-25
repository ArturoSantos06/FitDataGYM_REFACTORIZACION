import { useCallback, useState } from 'react';

export const useModalExpediente = () => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [citaVista, setCitaVista] = useState(null);
  const [notaPrevia, setNotaPrevia] = useState('');
  const [mostrarAlertaPasado, setMostrarAlertaPasado] = useState(false);

  const manejarClicFecha = useCallback((informacion) => {
    const fecha = new Date(informacion.date);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fecha < hoy) {
      setMostrarAlertaPasado(true);
      return;
    }
    if (fecha.getDay() === 0) return;
    setFechaSeleccionada(informacion.dateStr);
  }, []);

  const cerrarAgenda = useCallback(() => setFechaSeleccionada(null), []);
  const completarAgenda = useCallback(() => {
    setFechaSeleccionada(null);
    setNotaPrevia('');
  }, []);
  const abrirDetalle = useCallback((cita) => setCitaVista(cita), []);
  const cerrarDetalle = useCallback(() => setCitaVista(null), []);
  const cerrarAlertaPasado = useCallback(() => setMostrarAlertaPasado(false), []);

  return {
    abrirDetalle,
    cerrarAgenda,
    cerrarAlertaPasado,
    cerrarDetalle,
    citaVista,
    completarAgenda,
    fechaSeleccionada,
    manejarClicFecha,
    mostrarAlertaPasado,
    notaPrevia,
    setNotaPrevia,
  };
};
