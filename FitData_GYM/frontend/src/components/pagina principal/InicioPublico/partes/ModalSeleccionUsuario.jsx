import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PERFILES_SELECCION } from '../contenido';

function ModalSeleccionUsuario({ onClose }) {
  const navigate = useNavigate();

  const irAPerfil = (perfil) => {
    if (perfil.limpiarToken) {
      localStorage.removeItem('token');
    }
    navigate(perfil.ruta);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl relative transform transition-all scale-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl transition-colors">
          ✕
        </button>

        <h3 className="text-2xl font-bold text-white mb-2">Bienvenido a FitData</h3>
        <p className="text-gray-400 mb-8">Selecciona tu perfil:</p>

        <div className="space-y-4">
          {PERFILES_SELECCION.map((perfil) => (
            <button
              key={perfil.ruta}
              onClick={() => irAPerfil(perfil)}
              className={`w-full group flex items-center justify-between p-5 bg-gray-800 border border-gray-600 rounded-xl ${perfil.hoverBorde} hover:bg-gray-700 transition-all duration-300`}
            >
              <div className="text-left">
                <h4 className={`font-bold text-white ${perfil.hoverTexto} transition-colors`}>{perfil.label}</h4>
                {perfil.descripcion && <p className="text-xs text-gray-500">{perfil.descripcion}</p>}
              </div>
              <span className="text-2xl grayscale group-hover:grayscale-0 transition-all">{perfil.icono}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(ModalSeleccionUsuario);
