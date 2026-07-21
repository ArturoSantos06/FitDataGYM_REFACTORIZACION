import { useState } from 'react';

// Seleccion de tipo de membresia + campos de pago y su calculo derivado.
export function usePagoMembresia(tiposMembresia) {
  const [membresiaSeleccionada, setMembresiaSeleccionada] = useState(null);
  const [metodoPago, setMetodoPago] = useState('EFECTIVO');
  const [montoRecibido, setMontoRecibido] = useState('');

  const precioSeleccionado = tiposMembresia.find((tipo) => tipo.id === membresiaSeleccionada)?.price || 0;
  const cambio = (parseFloat(montoRecibido) || 0) - (parseFloat(precioSeleccionado) || 0);

  const reiniciar = () => {
    setMembresiaSeleccionada(null);
    setMetodoPago('EFECTIVO');
    setMontoRecibido('');
  };

  return {
    membresiaSeleccionada,
    setMembresiaSeleccionada,
    metodoPago,
    setMetodoPago,
    montoRecibido,
    setMontoRecibido,
    precioSeleccionado,
    cambio,
    reiniciar,
  };
}
