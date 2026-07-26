import { memo } from 'react';
import SelectRegistro from './SelectRegistro';
import { CARD_CLASS, TIPOS_REGISTRO } from '../contenido';

function SelectorTipoRegistro({ tipoRegistro, onCambio, className }) {
  return (
    <section className={`${CARD_CLASS} ${className || ''}`}>
      <SelectRegistro
        etiqueta="Tipo de registro"
        value={tipoRegistro}
        onChange={(e) => onCambio(e.target.value)}
        opciones={TIPOS_REGISTRO}
      />
    </section>
  );
}

export default memo(SelectorTipoRegistro);
