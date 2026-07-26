import { memo } from 'react';
import ErrorModal from '../../../../modales/ErrorModal';
import EncabezadoRegistro from './EncabezadoRegistro';
import SelectorTipoRegistro from './SelectorTipoRegistro';

function ContenedorRegistro({ children, estado, subtitulo, tipoRegistro, onCambioTipoRegistro }) {
  return (
    <div className="relative mb-6">
      <div className="absolute -top-10 left-12 h-36 w-36 rounded-full bg-fuchsia-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-16 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl bg-linear-to-br from-slate-800/90 via-slate-900/90 to-slate-950/90 p-5 md:p-7 text-gray-100 rounded-2xl">
        <ErrorModal
          isOpen={estado.mostrarModalError}
          onClose={estado.cerrarError}
          title={estado.tituloError}
          message={estado.mensajeError}
        />

        <EncabezadoRegistro subtitulo={subtitulo} />

        <SelectorTipoRegistro tipoRegistro={tipoRegistro} onCambio={onCambioTipoRegistro} className="mb-4" />

        {children}
      </div>
    </div>
  );
}

export default memo(ContenedorRegistro);
