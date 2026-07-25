import { useCallback, useState } from 'react';
import {
  actualizarNotaCita,
  eliminarCitaNutriologo,
} from '../servicios/citasNutri';

const LIMITE_NOTA_CITA = 2000;

export const useModalDetalleNutri = (cita, alCerrar) => {
  const [editando, setEditando] = useState(false);
  const [contenidoEditado, setContenidoEditado] = useState(cita.nota || '');
  const [notaVisible, setNotaVisible] = useState(cita.nota || '');
  const [dialogo, setDialogo] = useState(null);
  const [procesando, setProcesando] = useState(false);

  const cerrarDialogo = useCallback(() => setDialogo(null), []);
  const mostrarError = useCallback((mensaje) => {
    setDialogo({
      tipo: 'peligro',
      titulo: 'Error',
      mensaje,
      alConfirmar: cerrarDialogo,
    });
  }, [cerrarDialogo]);

  const actualizarNota = useCallback(async () => {
    if (procesando) return;
    setProcesando(true);
    try {
      const nota = contenidoEditado.slice(0, LIMITE_NOTA_CITA);
      await actualizarNotaCita(cita.id, nota);
      setNotaVisible(nota);
      setEditando(false);
    } catch {
      mostrarError('No se pudo actualizar la nota.');
    } finally {
      setProcesando(false);
    }
  }, [cita.id, contenidoEditado, mostrarError, procesando]);

  const confirmarEliminacion = useCallback(async () => {
    if (procesando) return;
    setProcesando(true);
    try {
      await eliminarCitaNutriologo(cita.id);
      setDialogo(null);
      alCerrar();
    } catch {
      mostrarError('No se pudo eliminar la cita.');
    } finally {
      setProcesando(false);
    }
  }, [alCerrar, cita.id, mostrarError, procesando]);

  const solicitarEliminacion = useCallback(() => {
    setDialogo({
      tipo: 'peligro',
      titulo: 'Eliminar cita',
      mensaje: '¿Estás seguro de que deseas borrar este registro? Esta acción no se puede deshacer.',
      alConfirmar: confirmarEliminacion,
      alCancelar: cerrarDialogo,
    });
  }, [cerrarDialogo, confirmarEliminacion]);

  const cambiarContenido = useCallback((valor) => {
    setContenidoEditado(valor.slice(0, LIMITE_NOTA_CITA));
  }, []);
  const iniciarEdicion = useCallback(() => setEditando(true), []);

  return {
    actualizarNota,
    cambiarContenido,
    contenidoEditado,
    dialogo,
    editando,
    iniciarEdicion,
    notaVisible,
    procesando,
    solicitarEliminacion,
  };
};
