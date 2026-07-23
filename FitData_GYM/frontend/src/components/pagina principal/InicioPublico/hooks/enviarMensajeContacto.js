export default async function enviarMensajeContacto(formData) {
  const response = await fetch('https://formsubmit.co/ajax/fitdatagym@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      telefono: formData.telefono,
      email: formData.email,
      mensaje: formData.mensaje,
      _subject: `Nuevo mensaje de contacto de ${formData.nombre}`,
      _template: 'table',
    }),
  });

  return response.ok;
}
