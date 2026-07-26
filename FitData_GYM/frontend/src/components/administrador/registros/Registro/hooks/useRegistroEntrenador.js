import { useState } from 'react';
import { registerTrainerByAdmin, updateUser, getUserByEmail } from '../../../../../firebase';
import useEstadoRegistro from './useEstadoRegistro';
import { SOLO_LETRAS_REGEX, LETRAS_CON_ESPACIOS_REGEX, EMAIL_VALIDO_REGEX, mapearErrorFirebase } from './validadores';
import { FORM_ENTRENADOR_INICIAL } from '../contenido';

function validarRegistroEntrenador(formData) {
  const username = formData.username.trim();
  const firstName = formData.first_name.trim();
  const lastName = formData.last_name.trim();
  const email = formData.email.trim();

  if (!SOLO_LETRAS_REGEX.test(username)) return 'El nombre de usuario debe contener solo letras y sin espacios.';
  if (!LETRAS_CON_ESPACIOS_REGEX.test(firstName)) return 'El nombre debe contener solo letras y/o espacios.';
  if (!LETRAS_CON_ESPACIOS_REGEX.test(lastName)) return 'El apellido debe contener solo letras y/o espacios.';
  if (/\s/.test(email) || /\.\s|\s\./.test(email)) return 'El correo no debe tener espacios en blanco.';
  if (!EMAIL_VALIDO_REGEX.test(email)) return 'Ingresa un correo electrónico válido.';
  if (!formData.password) return 'Ingresa una contraseña.';
  if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (!formData.confirm_password) return 'Confirma la contraseña.';
  if (formData.password !== formData.confirm_password) return 'La contraseña y su confirmación no coinciden.';
  if (!formData.contract_type) return 'Selecciona el tipo de contrato del entrenador.';
  if (!formData.trainer_specialty) return 'Selecciona una especialidad del entrenador.';
  if (formData.trainer_specialty === 'Otro' && !formData.trainer_specialty_other.trim()) {
    return 'Especifica la especialidad del entrenador.';
  }

  return null;
}

export default function useRegistroEntrenador(onUserRegistered) {
  const estado = useEstadoRegistro();
  const [formData, setFormData] = useState(FORM_ENTRENADOR_INICIAL);

  const manejarCambio = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const errorValidacion = validarRegistroEntrenador(formData);
    if (errorValidacion) {
      estado.mostrarError('Validación de Registro', errorValidacion);
      return;
    }

    estado.setCargando(true);
    try {
      const especialidadResuelta =
        formData.trainer_specialty === 'Otro' ? formData.trainer_specialty_other.trim() : formData.trainer_specialty;

      const registerResult = await registerTrainerByAdmin({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.first_name,
        lastName: formData.last_name,
        contractType: formData.contract_type,
        specialty: especialidadResuelta,
      });

      if (!registerResult.success) {
        estado.mostrarError('Error de Registro', mapearErrorFirebase(registerResult.error));
        return;
      }

      const idEntrenador = registerResult?.data?.id || registerResult?.data?.userId || null;
      const datosContrato = {
        contractType: formData.contract_type,
        tipoContrato: formData.contract_type,
        specialty: especialidadResuelta,
        especialidad: especialidadResuelta,
      };

      if (idEntrenador) {
        await updateUser(String(idEntrenador), datosContrato);
      } else {
        const usuarioEntrenador = await getUserByEmail(formData.email);
        if (usuarioEntrenador.success && usuarioEntrenador.data?.id) {
          await updateUser(String(usuarioEntrenador.data.id), datosContrato);
        }
      }

      estado.mostrarExito('¡Entrenador Registrado Exitosamente!', 'Usuario y contraseña creados correctamente.');
      setFormData(FORM_ENTRENADOR_INICIAL);
      onUserRegistered?.();
    } catch (err) {
      estado.mostrarError('Error de Registro', err.message);
    } finally {
      estado.setCargando(false);
    }
  };

  return { estado, formData, manejarCambio, manejarEnvio };
}
