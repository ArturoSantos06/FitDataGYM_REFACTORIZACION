import { useState } from 'react';

export default function useEstadoRegistro() {
  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [tituloError, setTituloError] = useState('');
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeSubExito, setMensajeSubExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const mostrarError = (titulo, mensaje) => {
    setTituloError(titulo);
    setMensajeError(mensaje);
    setMostrarModalError(true);
  };

  const mostrarExito = (mensaje, subMensaje = '') => {
    setMensajeExito(mensaje);
    setMensajeSubExito(subMensaje);
    setMostrarModalExito(true);
  };

  return {
    mostrarModalError,
    mensajeError,
    tituloError,
    cerrarError: () => setMostrarModalError(false),
    mostrarError,
    mostrarModalExito,
    mensajeExito,
    mensajeSubExito,
    cerrarExito: () => setMostrarModalExito(false),
    mostrarExito,
    cargando,
    setCargando,
  };
}
