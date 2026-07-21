import ModalExito from '../../modales/ModalExito';
import { useAsignarMembresia } from './hooks/useAsignarMembresia';
import BuscadorClienteVista from './partes/BuscadorClienteVista';
import SelectorMembresiaVista from './partes/SelectorMembresiaVista';
import PanelPagoVista from './partes/PanelPagoVista';
import ModalRenovacionVista from './partes/ModalRenovacionVista';

function AsignarMembresia({ onSuccess }) {
  const { buscador, seleccionMembresia, pago, conflicto, exito, error, cargando, enviarFormulario } =
    useAsignarMembresia(onSuccess);

  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-xl mb-6 border-t-4 border-blue-500 text-gray-100 relative">

      {conflicto.datos && <ModalRenovacionVista {...conflicto} />}

      <ModalExito {...exito} title="¡Operación Exitosa!" />

      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-teal-400">
        Renovar Membresía
      </h2>

      {error && <div className="mb-4 bg-red-500/20 border border-red-500 text-red-200 p-3 rounded animate-pulse font-bold text-center">{error}</div>}

      <form onSubmit={enviarFormulario} className="space-y-8">
        <BuscadorClienteVista {...buscador} />
        <SelectorMembresiaVista {...seleccionMembresia} />
        <PanelPagoVista {...pago} />

        <button
          type="submit"
          disabled={cargando}
          className={`w-full bg-linear-to-r from-blue-600 to-teal-600 hover:from-blue-500 hover:to-teal-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-all transform active:scale-95 text-lg uppercase tracking-widest flex justify-center items-center gap-2 ${cargando ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {cargando ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Procesando...</span>
            </>
          ) : (
            'RENOVAR Y COBRAR'
          )}
        </button>
      </form>
    </div>
  );
}

export default AsignarMembresia;
