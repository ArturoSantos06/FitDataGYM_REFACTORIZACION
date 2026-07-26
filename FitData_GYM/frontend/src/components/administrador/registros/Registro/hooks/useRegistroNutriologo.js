import { useState } from 'react';
import { registerNutriologoByAdmin } from '../../../../../firebase';
import useEstadoRegistro from './useEstadoRegistro';
import { LETRAS_CON_ESPACIOS_REGEX, EMAIL_VALIDO_REGEX, mapearErrorFirebase } from './validadores';
import { FORM_NUTRIOLOGO_INICIAL } from '../contenido';

function validarRegistroNutriologo(formData) {
  const firstName = formData.first_name.trim();
  const lastName = formData.last_name.trim();
  const email = formData.email.trim();

  if (!LETRAS_CON_ESPACIOS_REGEX.test(firstName)) return 'El nombre debe contener solo letras y/o espacios.';
  if (!LETRAS_CON_ESPACIOS_REGEX.test(lastName)) return 'El apellido debe contener solo letras y/o espacios.';
  if (/\s/.test(email) || /\.\s|\s\./.test(email)) return 'El correo no debe tener espacios en blanco.';
  if (!EMAIL_VALIDO_REGEX.test(email)) return 'Ingresa un correo electrónico válido.';
  if (!formData.password) return 'Ingresa una contraseña.';
  if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (!formData.confirm_password) return 'Confirma la contraseña.';
  if (formData.password !== formData.confirm_password) return 'La contraseña y su confirmación no coinciden.';
  if (!formData.especialidad.trim()) return 'Ingresa la especialidad.';

  return null;
}

export default function useRegistroNutriologo(onUserRegistered) {
  const estado = useEstadoRegistro();
  const [formData, setFormData] = useState(FORM_NUTRIOLOGO_INICIAL);

  const manejarCambio = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const errorValidacion = validarRegistroNutriologo(formData);
    if (errorValidacion) {
      estado.mostrarError('Validación de Registro', errorValidacion);
      return;
    }

    estado.setCargando(true);
    try {
      const registerResult = await registerNutriologoByAdmin({
        email: formData.email,
        password: formData.password,
        firstName: formData.first_name,
        lastName: formData.last_name,
        especialidad: formData.especialidad,
      });

      if (!registerResult.success) {
        estado.mostrarError('Error de Registro', mapearErrorFirebase(registerResult.error));
        return;
      }

      estado.mostrarExito('¡Nutriólogo Registrado Exitosamente!', '✅ El especialista ya aparecerá en la lista de los clientes.');
      setFormData(FORM_NUTRIOLOGO_INICIAL);
      onUserRegistered?.();
    } catch (err) {
      estado.mostrarError('Error de Registro', err.message);
    } finally {
      estado.setCargando(false);
    }
  };

  return { estado, formData, manejarCambio, manejarEnvio };
}
