import { useState } from 'react';
import RegistroCliente from './RegistroCliente';
import RegistroEntrenador from './RegistroEntrenador';
import RegistroNutriologo from './RegistroNutriologo';

export default function Registro({ onUserRegistered }) {
  const [tipoRegistro, setTipoRegistro] = useState('cliente');

  const props = { onUserRegistered, tipoRegistro, onCambioTipoRegistro: setTipoRegistro };

  if (tipoRegistro === 'entrenador') return <RegistroEntrenador {...props} />;
  if (tipoRegistro === 'nutriologo') return <RegistroNutriologo {...props} />;
  return <RegistroCliente {...props} />;
}
