import { useCallback, useEffect, useRef, useState } from 'react';
import {
  createHealthProfile,
  getHealthProfileByMemberId,
} from '../../../firebase';
import { consultarClientesAsignados } from '../servicios/clientesCobro';
import { generarMenuLocal } from '../utils/generadorMenu';

const CALORIAS_PREDETERMINADAS = '2000';

export default function useAsistenteNutricional() {
  const [abierto, setAbierto] = useState(false);
  const [caloriasObjetivo, setCaloriasObjetivo] = useState(CALORIAS_PREDETERMINADAS);
  const [comidasSugeridas, setComidasSugeridas] = useState([]);
  const [nutrientesDiarios, setNutrientesDiarios] = useState(null);
  const [cargandoMenu, setCargandoMenu] = useState(false);
  const [error, setError] = useState('');
  const [pacientes, setPacientes] = useState([]);
  const [idPacienteSeleccionado, setIdPacienteSeleccionado] = useState('');
  const [perfilPaciente, setPerfilPaciente] = useState(null);
  const [cargandoPacientes, setCargandoPacientes] = useState(true);
  const [guardandoCalorias, setGuardandoCalorias] = useState(false);
  const [mensajeGuardado, setMensajeGuardado] = useState('');
  const consultaIniciada = useRef(false);
  const temporizadorMenu = useRef(null);
  const temporizadorMensaje = useRef(null);

  useEffect(() => {
    if (!abierto || consultaIniciada.current) return;
    consultaIniciada.current = true;

    consultarClientesAsignados()
      .then(setPacientes)
      .catch((fallo) => {
        setPacientes([]);
        setError(fallo?.message || 'No se pudieron cargar los pacientes asignados.');
      })
      .finally(() => setCargandoPacientes(false));
  }, [abierto]);

  useEffect(() => () => {
    clearTimeout(temporizadorMenu.current);
    clearTimeout(temporizadorMensaje.current);
  }, []);

  const seleccionarPaciente = useCallback(async (idPaciente) => {
    setIdPacienteSeleccionado(idPaciente);
    setPerfilPaciente(null);
    setMensajeGuardado('');
    setError('');
    setCaloriasObjetivo(CALORIAS_PREDETERMINADAS);
    if (!idPaciente) return;

    setCargandoPacientes(true);
    try {
      const resultado = await getHealthProfileByMemberId(idPaciente);
      if (resultado.success && resultado.data) {
        setPerfilPaciente(resultado.data);
        if (resultado.data.targetCalories) {
          setCaloriasObjetivo(String(resultado.data.targetCalories));
        }
      }
    } catch {
      setError('No se pudo consultar el perfil de salud del paciente.');
    } finally {
      setCargandoPacientes(false);
    }
  }, []);

  const guardarCaloriasPaciente = useCallback(async () => {
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
      const { id: _idPerfil, ...datosPerfil } = perfilPaciente || {};
      const resultado = await createHealthProfile({
        ...datosPerfil,
        memberId: idPacienteSeleccionado,
        targetCalories: calorias,
      });
      if (!resultado.success) throw new Error(resultado.error);

      setPerfilPaciente((actual) => ({
        ...(actual || {}),
        memberId: idPacienteSeleccionado,
        targetCalories: calorias,
      }));
      setMensajeGuardado('Guardado en el expediente');
      temporizadorMensaje.current = setTimeout(() => setMensajeGuardado(''), 3000);
    } catch (fallo) {
      setError(fallo?.message || 'No se pudo guardar el objetivo calórico.');
      setMensajeGuardado('Error al guardar');
    } finally {
      setGuardandoCalorias(false);
    }
  }, [caloriasObjetivo, idPacienteSeleccionado, perfilPaciente]);

  const generarSugerencias = useCallback(() => {
    setCargandoMenu(true);
    setError('');
    clearTimeout(temporizadorMenu.current);

    temporizadorMenu.current = setTimeout(() => {
      try {
        const resultado = generarMenuLocal(caloriasObjetivo);
        setComidasSugeridas(resultado.comidas);
        setNutrientesDiarios(resultado.nutrientes);
      } catch (fallo) {
        setError(fallo?.message || 'Ocurrió un error al generar el menú local.');
      } finally {
        setCargandoMenu(false);
      }
    }, 600);
  }, [caloriasObjetivo]);

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
