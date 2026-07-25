import { useEffect, useState } from 'react';
import { CitasNutri as usarCitasNutri } from '../backend/CitasNutri';

function usarCitasNutricion() {
  const [idCliente, establecerIdCliente] = useState(null); const [modalCancelacion, establecerModalCancelacion] = useState({ abierto: false, id: null }); const [modalReprogramacion, establecerModalReprogramacion] = useState({ abierto: false, cita: null });
  useEffect(() => { try { const guardado = JSON.parse(localStorage.getItem('firebaseUser') || 'null'); establecerIdCliente(guardado?.uid || guardado?.id || null); } catch { establecerIdCliente(null); } }, []);
  const { appointments: citas = [], loading: cargando, cancelarCita } = usarCitasNutri(idCliente);
  const confirmarCancelacion = async () => { const exito = await cancelarCita(modalCancelacion.id); if (exito) establecerModalCancelacion({ abierto: false, id: null }); else window.alert('Hubo un error al intentar cancelar. Intenta de nuevo.'); };
  return { idCliente, citas, cargando, modalCancelacion, modalReprogramacion, abrirCancelacion: (id) => establecerModalCancelacion({ abierto: true, id }), cerrarCancelacion: () => establecerModalCancelacion({ abierto: false, id: null }), confirmarCancelacion, abrirReprogramacion: (cita) => establecerModalReprogramacion({ abierto: true, cita }), cerrarReprogramacion: () => establecerModalReprogramacion({ abierto: false, cita: null }) };
}

export default usarCitasNutricion;
