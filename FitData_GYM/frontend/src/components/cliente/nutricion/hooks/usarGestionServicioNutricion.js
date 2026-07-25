import { useCallback, useEffect, useState } from 'react';
import { getClientNutritionistAssignment as obtenerAsignacionNutriologo, removeNutritionistFromClient as quitarNutriologoCliente, waitForAuthReady as esperarAutenticacion } from '../../../../firebase';

function usarGestionServicioNutricion() {
  const [cargando, establecerCargando] = useState(true); const [idCliente, establecerIdCliente] = useState(null); const [estadoServicio, establecerEstadoServicio] = useState('active'); const [modalAbierto, establecerModalAbierto] = useState(false);
  useEffect(() => { let desmontado = false; const cargarUsuario = async () => { try { const usuario = await esperarAutenticacion(); if (!desmontado) establecerIdCliente(usuario?.uid || null); } catch { if (!desmontado) establecerIdCliente(null); } finally { if (!desmontado) establecerCargando(false); } }; cargarUsuario(); return () => { desmontado = true; }; }, []);
  useEffect(() => { if (!idCliente) { establecerCargando(false); return undefined; } let desmontado = false; const cargarAsignacion = async () => { try { const resultado = await obtenerAsignacionNutriologo(idCliente); if (!desmontado) establecerEstadoServicio(resultado.success && resultado.data?.status === 'active' ? 'active' : 'cancelled'); } catch { if (!desmontado) establecerEstadoServicio('cancelled'); } finally { if (!desmontado) establecerCargando(false); } }; cargarAsignacion(); return () => { desmontado = true; }; }, [idCliente]);
  const cancelarServicio = useCallback(async () => { try { const resultado = await quitarNutriologoCliente(idCliente); if (!resultado.success) throw new Error(resultado.error || 'No se pudo cancelar el servicio'); establecerEstadoServicio('cancelled'); establecerModalAbierto(false); } catch { window.alert('Hubo un error al intentar cancelar el servicio.'); } }, [idCliente]);
  return { cargando, idCliente, estadoServicio, modalAbierto, abrirModal: () => establecerModalAbierto(true), cerrarModal: () => establecerModalAbierto(false), cancelarServicio, reactivarServicio: () => window.alert('Próximamente: Podrás volver a contratar el servicio desde la Tienda.') };
}

export default usarGestionServicioNutricion;
