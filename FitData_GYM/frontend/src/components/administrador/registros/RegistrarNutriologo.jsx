import React, { useState } from 'react';
import ErrorModal from '../../modales/ErrorModal';
import ModalExito from '../../modales/ModalExito';
import EncabezadoRegistro from './EncabezadoRegistro';
import FormularioNutriologo from './FormularioNutriologo';
import SelectorTipoRegistro from './SelectorTipoRegistro';
import { registerNutriologoByAdmin } from '../../../firebase';

const INITIAL_FORM_DATA = {
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
  especialidad: 'Nutrición Deportiva',
};

const LETTERS_WITH_SPACES_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
const VALID_EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const getFirebaseErrorMessage = (error) => {
  const normalizedMessage = String(error || '').toLowerCase();

  if (
    normalizedMessage.includes('email-already-in-use') ||
    normalizedMessage.includes('email address is already in use') ||
    normalizedMessage.includes('already in use by another account')
  ) return 'Este correo ya está registrado';
  if (normalizedMessage.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres';
  if (normalizedMessage.includes('invalid-email')) return 'El correo electrónico no es válido';

  return error || 'Error al crear usuario';
};

function RegistrarNutriologo({ onUserRegistered, tipoRegistro = 'nutriologo', onTipoRegistroChange = null }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [mostrarModalError, setMostrarModalError] = useState(false);
  const [mensajeError, setMensajeError] = useState('');
  const [tituloError, setTituloError] = useState('');
  const [mostrarModalExito, setMostrarModalExito] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeSubExito, setMensajeSubExito] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((currentFormData) => ({ ...currentFormData, [name]: value }));
  };

  const validarNutriologo = () => {
    const firstName = formData.first_name.trim();
    const lastName = formData.last_name.trim();
    const email = formData.email.trim();

    if (!LETTERS_WITH_SPACES_REGEX.test(firstName)) {
      return 'El nombre debe contener solo letras y/o espacios.';
    }
    if (!LETTERS_WITH_SPACES_REGEX.test(lastName)) {
      return 'El apellido debe contener solo letras y/o espacios.';
    }
    if (/\s/.test(email) || /\.\s|\s\./.test(email)) {
      return 'El correo no debe tener espacios en blanco.';
    }
    if (!VALID_EMAIL_REGEX.test(email)) {
      return 'Ingresa un correo electrónico válido.';
    }
    if (!formData.password) {
      return 'Ingresa una contraseña.';
    }
    if (formData.password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres.';
    }
    if (!formData.confirm_password) {
      return 'Confirma la contraseña.';
    }
    if (formData.password !== formData.confirm_password) {
      return 'La contraseña y su confirmación no coinciden.';
    }
    if (!formData.especialidad.trim()) {
      return 'Ingresa la especialidad.';
    }
    return null;
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (cargando) return;

    const validationError = validarNutriologo();
    if (validationError) {
      setTituloError('Validación de Registro');
      setMensajeError(validationError);
      setMostrarModalError(true);
      return;
    }

    setCargando(true);
    try {
      const firstName = formData.first_name.trim();
      const lastName = formData.last_name.trim();
      const email = formData.email.trim().toLowerCase();
      const especialidad = formData.especialidad.trim();

      const registerResult = await registerNutriologoByAdmin({
        email,
        password: formData.password,
        firstName,
        lastName,
        especialidad,
      });

      if (!registerResult.success) {
        setTituloError('Error de Registro');
        setMensajeError(getFirebaseErrorMessage(registerResult.error));
        setMostrarModalError(true);
        return;
      }

      setMensajeExito('¡Nutriólogo Registrado Exitosamente!');
      setMensajeSubExito('✅ El especialista ya aparecerá en la lista de los clientes.');
      setMostrarModalExito(true);

      setFormData(INITIAL_FORM_DATA);

      onUserRegistered?.();
    } catch (err) {
      setTituloError('Error de Registro');
      setMensajeError(getFirebaseErrorMessage(err?.message));
      setMostrarModalError(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="relative mb-6">
      <div className="absolute -top-10 left-12 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl bg-linear-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 p-5 md:p-7 text-gray-100 rounded-2xl">
        <ErrorModal isOpen={mostrarModalError} onClose={() => setMostrarModalError(false)} title={tituloError} message={mensajeError} />

        <ModalExito
          isOpen={mostrarModalExito}
          onClose={() => setMostrarModalExito(false)}
          title="¡Registro Exitoso!"
          message={mensajeExito}
          subMessage={mensajeSubExito}
        />

        <EncabezadoRegistro
          descripcion="Crea una nueva cuenta de nutriólogo en FitData GYM"
        />

        <SelectorTipoRegistro
          tipoRegistro={tipoRegistro}
          onTipoRegistroChange={onTipoRegistroChange}
        />

        <FormularioNutriologo
          formData={formData}
          onChange={manejarCambio}
          onSubmit={manejarEnvio}
          cargando={cargando}
        />
      </div>
    </div>
  );
}

export default RegistrarNutriologo;
