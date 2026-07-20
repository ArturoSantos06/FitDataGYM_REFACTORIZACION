import React from 'react';
import ModalExito from '../modales/ModalExito';
import MenuPerfil from './ui/MenuPerfil';
import FormularioDatosPersonales from './ui/FormularioDatosPersonales';
import FormularioCambioContrasena from './ui/FormularioCambioContrasena';
import usePerfilNutriologo from './hooks/usePerfilNutriologo';

export default function PerfilNutriologo() {
  const {
    vistaActual,
    setVistaActual,
    usuario,
    codigoNutriologo,
    cargando,
    error,
    mostrarModalExito,
    setMostrarModalExito,
    mensajeExito,
    manejarActualizacionUsuario
  } = usePerfilNutriologo();

  if (cargando) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4" />
          <p className="text-slate-400">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full flex justify-center items-center min-h-[400px]">
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-6 text-center max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <a href="/nutriologo/login" className="inline-block bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium transition-all">
            Iniciar sesión como nutriólogo
          </a>
        </div>
      </div>
    );
  }

  if (!usuario) return null;

  return (
    <div className="w-full flex justify-center">
      <ModalExito
        isOpen={mostrarModalExito}
        onClose={() => setMostrarModalExito(false)}
        title="Éxito"
        message={mensajeExito}
      />

      {vistaActual === 'menu' && (
        <MenuPerfil 
          usuario={usuario} 
          alNavegar={setVistaActual} 
        />
      )}

      {vistaActual === 'edit-personal' && (
        <FormularioDatosPersonales
          usuario={usuario}
          codigoNutriologo={codigoNutriologo}
          alGuardar={manejarActualizacionUsuario}
          alRegresar={() => setVistaActual('menu')}
        />
      )}

      {vistaActual === 'change-password' && (
        <FormularioCambioContrasena 
          alRegresar={() => setVistaActual('menu')} 
        />
      )}
    </div>
  );
}