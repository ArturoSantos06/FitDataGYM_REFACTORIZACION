import { useState } from 'react';
import enviarMensajeContacto from './enviarMensajeContacto';
import { FORM_CONTACTO_INICIAL } from '../contenido';

export default function useFormularioContacto() {
  const [formData, setFormData] = useState(FORM_CONTACTO_INICIAL);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const mostrarMensajeTemporal = (texto, duracionMs) => {
    setMessage(texto);
    setTimeout(() => setMessage(''), duracionMs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      mostrarMensajeTemporal('Por favor completa los campos obligatorios: Nombre, Email y Mensaje', 3000);
      return;
    }

    setSending(true);
    setMessage('');

    try {
      const enviado = await enviarMensajeContacto(formData);
      if (enviado) {
        setMessage('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.');
        setFormData(FORM_CONTACTO_INICIAL);
      } else {
        setMessage('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.');
      }
    } catch {
      setMessage('Error de conexión. Por favor intenta más tarde.');
    } finally {
      setSending(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return { formData, sending, message, handleChange, handleSubmit };
}
