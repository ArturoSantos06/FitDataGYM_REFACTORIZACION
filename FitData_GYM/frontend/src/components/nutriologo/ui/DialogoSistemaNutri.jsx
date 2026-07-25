import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

export default function DialogoSistemaNutri({
  tipo,
  titulo,
  mensaje,
  alConfirmar,
  alCancelar,
  procesando,
}) {
  const esPeligro = tipo === 'peligro';
  const esExito = tipo === 'exito';
  
  const obtenerColores = () => {
    if (esExito) return { borde: 'border-emerald-500/40', fondo: 'bg-emerald-500/10', texto: 'text-emerald-500', boton: 'bg-emerald-600', icono: <CheckCircle size={32} /> };
    if (esPeligro) return { borde: 'border-red-500/40', fondo: 'bg-red-500/10', texto: 'text-red-500', boton: 'bg-red-600', icono: <AlertTriangle size={32} /> };
    return { borde: 'border-amber-500/40', fondo: 'bg-amber-500/10', texto: 'text-amber-500', boton: 'bg-amber-600', icono: <Info size={32} /> };
  };

  const colores = obtenerColores();

  return (
    <div className="fixed inset-0 z-[250] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className={`bg-[#1e293b] border ${colores.borde} p-8 rounded-[2rem] shadow-2xl w-full max-w-sm text-center animate-in zoom-in duration-200`}>
        <div className={`mx-auto w-16 h-16 rounded-full ${colores.fondo} flex items-center justify-center mb-6 ${colores.texto}`}>
          {colores.icono}
        </div>
        <h3 className="text-xl font-black uppercase italic mb-2 text-white tracking-tighter">
          {titulo}
        </h3>
        <p className="text-slate-400 text-sm mb-8 font-medium leading-relaxed">
          {mensaje}
        </p>
        
        <div className="flex gap-3">
          {alCancelar && (
            <button 
              type="button"
              onClick={alCancelar}
              disabled={procesando}
              className="flex-1 rounded-xl border border-slate-700 bg-slate-800 py-3 text-[10px] font-black text-white uppercase disabled:opacity-60"
            >
              Cancelar
            </button>
          )}
          <button 
            type="button"
            onClick={alConfirmar}
            disabled={procesando}
            className={`flex-1 rounded-xl py-4 text-[10px] font-black text-white uppercase shadow-lg disabled:cursor-wait disabled:opacity-60 ${colores.boton}`}
          >
            {procesando ? 'Procesando...' : 'Continuar'}
          </button>
        </div>
      </div>
    </div>
  );
}
