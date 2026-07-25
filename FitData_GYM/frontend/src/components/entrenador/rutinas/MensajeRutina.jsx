function MensajeRutina({ mensaje, clases }) {
  if (!mensaje) return null;

  return <div className={`border rounded-2xl px-4 py-3 text-sm ${clases}`}>{mensaje}</div>;
}

export default MensajeRutina;
