import React from 'react';
import { AlertTriangle, XCircle, CheckCircle2 } from 'lucide-react';
import { useEntrenadorClienteLogica } from '../../../hooks/useEntrenadorClienteLogica';
import { ModalReutilizableBotonera } from '../../ModalReutilizableBotonera';

const Entrenador= () => {
    // Estados a utilizar //
    /** pos esto funciona para el componente cliente entrenador */
    const { isModalOpen, setIsModalOpen, serviceStatus, loading, clienteId, handleCancelService } = useEntrenadorClienteLogica();

    if (loading) {
        return <div className="text-slate-400 text-center mt-10 font-medium flex flex-col items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            Cargando estado del servicio...
        </div>;
    }

    if (!clienteId) {
        return (
            <div className="bg-slate-900 p-8 rounded-xl max-w-md mx-auto text-center border border-red-500/30">
                <AlertTriangle size={48} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-xl text-white font-bold mb-2">Acceso Denegado</h2>
                <p className="text-slate-400">Por favor, inicia sesión para gestionar tus servicios.</p>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center animate-fade-in">
            <div className="relative w-full max-w-2xl bg-gray-800 rounded-xl shadow-2xl overflow-hidden p-8 border border-slate-700">
                
                <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-red-500 to-orange-400"></div>
                
                <div className="text-center md:text-left mb-8">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-400 to-orange-400">
                        Gestión de Servicio
                    </h2>
                    <p className="text-slate-400 font-medium mt-1.5">
                        Administra tu suscripción al área de entrenamiento.
                    </p>
                </div>

                {/* CONTENIDO PRINCIPAL: ESTADO DEL SERVICIO */}
                <div className="bg-slate-900 rounded-xl border border-slate-700 p-8 text-center flex flex-col items-center">
                    
                    {serviceStatus === 'active' ? (
                        <>
                            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mb-4 border border-green-500/20">
                                <CheckCircle2 size={40} className="text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Servicio de Entrenador Activo</h3>
                            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                                Actualmente estás vinculado a un entrenador. Si decides detener el servicio, se notificará a la administración y no se te cobrará el próximo mes.
                            </p>
                            
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-red-900/40 hover:bg-red-600 text-red-400 hover:text-white font-bold transition-all border border-red-700/50 hover:border-red-600 flex items-center justify-center gap-2"
                            >
                                <XCircle size={20} />
                                Detener Servicio
                            </button>
                        </>
                    ) : (
                        <>
                            <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-600">
                                <XCircle size={40} className="text-slate-500" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Servicio Detenido</h3>
                            <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8 leading-relaxed">
                                Actualmente no estás recibiendo el servicio de entrenamiento personalizado.
                            </p>
                            <button 
                                onClick={() => alert("Próximamente: Podrás volver a contratar el servicio desde la Tienda.")}
                                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold transition-all border border-slate-600"
                            >
                                Reactivar Servicio
                            </button>
                        </>
                    )}

                </div>

                {/* MODAL PARA CONFIRMAR CANCELACIÓN */}
                <ModalReutilizableBotonera isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleCancelService={handleCancelService} />
            </div>
        </div>
    );
};

export default Entrenador;