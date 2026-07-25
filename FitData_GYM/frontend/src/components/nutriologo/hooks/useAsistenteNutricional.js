import { useCallback, useEffect, useRef, useState } from 'react';
import {
  consultarPerfilSaludPaciente,
  guardarObjetivoCalorico,
} from '../servicios/asistenteNutricional';
import { consultarClientesAsignados } from '../servicios/clientesCobro';
import useGeneradorMenuAsistente from './useGeneradorMenuAsistente';

const CALORIAS_PREDETERMINADAS = '2000';

export default function useAsistenteNutricional() {
  const [abierto, setAbierto] = useState(false);
  const [caloriasObjetivo, setCaloriasObjetivo] = useState(CALORIAS_PREDETERMINADAS);
  const [error, setError] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState('');
  const [perfilPaciente, setPerfilPaciente] = useState(null);
  const [cargandoPacientes, setCargandoPacientes] = useState(true);
  const [guardandoCalorias, setGuardandoCalorias] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');
  const consultaIniciada = useRef(false);
  const temporizadorMensaje = useRef(null);
  const solicitudPerfil = useRef(0);
  const {
    cargandoMenu,
    comidasSugeridas,
    generarSugerencias,
    nutrientesDiarios,
  } = useGeneradorMenuAsistente(caloriasObjetivo, setError);

  useEffect(() => {
    if (!abierto || consultaIniciada.current) return;
    consultaIniciada.current = true;
    setCargandoPacientes(true);
    let activo = true;
    let consultaFinalizada = false;

    consultarClientesAsignados()
      .then((clientes) => {
        consultaFinalizada = true;
        if (activo) setPacientes(clientes);
      })
      .catch((fallo) => {
        consultaFinalizada = true;
        consultaIniciada.current = false;
        if (!activo) return;
        setPacientes([]);
        setError(fallo?.message || 'No se pudieron cargar los pacientes asignados.');
      })
      .finally(() => {
        if (activo) setCargandoPacientes(false);
      });

    return () => {
      activo = false;
      if (!consultaFinalizada) consultaIniciada.current = false;
    };
  }, [abierto]);

  useEffect(() => () => {
    clearTimeout(temporizadorMensaje.current);
  }, []);

  const seleccionarPaciente = useCallback(async (idPaciente) => {
    const numeroSolicitud = solicitudPerfil.current + 1;
    solicitudPerfil.current = numeroSolicitud;
    setIdPacienteSeleccionado(idPaciente);
    setPerfilPaciente(null);
    setMensajeGuardado('');
    setError('');
    setCaloriasObjetivo(CALORIAS_PREDETERMINADAS);
    if (!idPaciente) {
      setCargandoPacientes(false);
      return;
    }

    setCargandoPacientes(true);
    try {
      const perfil = await consultarPerfilSaludPaciente(idPaciente);
      if (solicitudPerfil.current !== numeroSolicitud) return;
      if (perfil) {
        setPerfilPaciente(perfil);
        if (perfil.targetCalories) {
          setCaloriasObjetivo(String(perfil.targetCalories));
        }
      }
    } catch {
      if (solicitudPerfil.current === numeroSolicitud) {
        setError('No se pudo consultar el perfil de salud del paciente.');
      }
    } finally {
      if (solicitudPerfil.current === numeroSolicitud) {
        setCargandoPacientes(false);
      }
    }
  }, []);

  const guardarCaloriasPaciente = useCallback(async () => {
    if (guardandoCalorias) return;
    const calorias = Number(caloriasObjetivo);
    if (!idPacienteSeleccionado || !Number.isFinite(calorias) || calorias <= 0) {
      setError('Selecciona un paciente e ingresa un objetivo calórico válido.');
      return;
    }

    setGuardandoCalorias(true);
    setMensajeGuardado('');
    setError('');
    clearTimeout(temporizadorMensaje.current);

    try {
      const perfilActualizado = await guardarObjetivoCalorico({
        idPaciente: idPacienteSeleccionado,
        perfil: perfilPaciente,
        calorias,
      });
      setPerfilPaciente(perfilActualizado);
      setMensajeGuardado('Guardado en el expediente');
      temporizadorMensaje.current = setTimeout(() => setMensajeGuardado(''), 3000);
    } catch (fallo) {
      setError(fallo?.message || 'No se pudo guardar el objetivo calórico.');
      setMensajeGuardado('Error al guardar');
    } finally {
      setGuardandoCalorias(false);
    }
  }, [
    caloriasObjetivo,
    guardandoCalorias,
    idPacienteSeleccionado,
    perfilPaciente,
  ]);

  const cambiarCaloriasObjetivo = useCallback((valor) => {
    setCaloriasObjetivo(valor);
    setMensajeGuardado('');
  }, []);

  const cerrarAsistente = useCallback(() => setAbierto(false), []);
  const alternarAsistente = useCallback(() => setAbierto((actual) => !actual), []);

  return {
    abierto,
    alternarAsistente,
    caloriasObjetivo,
    cambiarCaloriasObjetivo,
    cargandoMenu,
    cargandoPacientes,
    cerrarAsistente,
    comidasSugeridas,
    error,
    generarSugerencias,
    guardandoCalorias,
    guardarCaloriasPaciente,
    idPacienteSeleccionado,
    mensajeGuardado,
    nutrientesDiarios,
    pacientes,
    seleccionarPaciente,
  };
}
