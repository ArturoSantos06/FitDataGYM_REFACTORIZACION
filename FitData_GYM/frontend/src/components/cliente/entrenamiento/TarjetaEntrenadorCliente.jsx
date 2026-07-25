import { Award, CheckCircle, Dumbbell, Star } from 'lucide-react';
import { formatearMonto } from '../../../hooks/usarListaEntrenadores';

function TarjetaEntrenadorCliente({ entrenador, seleccionado, asignado, asignando, reseñas, estrellasSobre, idCliente, promedio, alSeleccionar, alCalificar, alPasarEstrella, alSalirEstrella, alMostrarPrecio, alObtenerConfiguracion }) {
  const configuracion = alObtenerConfiguracion(entrenador);
  const nombre = entrenador.displayName || `${String(entrenador.firstName || '').trim()} ${String(entrenador.lastName || '').trim()}`.trim() || entrenador.nombre || 'Sin nombre';
  const listaReseñas = reseñas[entrenador.id] || [];
  const miReseña = listaReseñas.find((reseña) => reseña.clientId === idCliente);
  const miCalificacion = miReseña?.rating || 0;

  return <div className={`relative w-full bg-slate-900/60 border rounded-xl p-6 transition-all duration-300 hover:bg-slate-800/80 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 ${seleccionado ? 'border-blue-500 bg-blue-900/20 shadow-lg shadow-blue-500/20' : 'border-slate-700'}`}>
    {seleccionado && <div className="absolute top-3 right-3"><CheckCircle className="w-6 h-6 text-blue-400" /></div>}
    <div className="flex flex-col items-center text-center space-y-4"><div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center"><Dumbbell className="w-8 h-8 text-blue-400" /></div><div><h3 className="font-bold text-white text-lg">{nombre}</h3><p className="text-blue-400 text-sm font-medium">{entrenador.especialidad || 'Entrenador Personal'}</p><div className="mt-2 flex flex-wrap justify-center gap-2 text-[11px] font-semibold">{configuracion.ofrecePersonal && <span className="px-2 py-1 rounded-full bg-cyan-900/40 text-cyan-200 border border-cyan-700">Personal ${formatearMonto(alMostrarPrecio(entrenador, 'PERSONAL'))} MXN</span>}{configuracion.ofreceGrupal && <span className="px-2 py-1 rounded-full bg-emerald-900/40 text-emerald-200 border border-emerald-700">Grupal ${formatearMonto(alMostrarPrecio(entrenador, 'GRUPAL'))} MXN</span>}</div></div>
      <div className="flex items-center gap-1">{asignado ? <div className="flex items-center">{[1, 2, 3, 4, 5].map((estrella) => { const visible = estrellasSobre[entrenador.id] || miCalificacion; return <button key={estrella} type="button" onClick={() => alCalificar(entrenador.id, estrella)} onMouseEnter={() => alPasarEstrella(entrenador.id, estrella)} onMouseLeave={() => alSalirEstrella(entrenador.id)} className="focus:outline-none"><Star className={`w-4 h-4 transition-colors ${estrella <= visible ? 'text-amber-400 fill-current' : 'text-slate-600'}`} /></button>; })}<span className="text-slate-400 text-xs ml-2">{promedio(entrenador.id) ? `(${promedio(entrenador.id)})` : '(Sin calificaciones)'}</span></div> : <>{[1, 2, 3, 4, 5].map((estrella) => <Star key={estrella} className={`w-4 h-4 ${promedio(entrenador.id) && estrella <= Math.round(Number(promedio(entrenador.id))) ? 'text-amber-400 fill-current' : 'text-slate-600'}`} />)}<span className="text-slate-400 text-xs ml-2">{promedio(entrenador.id) ? `(${promedio(entrenador.id)})` : '(Sin reseñas)'}</span></>}</div>
      <div className="flex items-center gap-2 text-slate-400 text-xs"><Award className="w-4 h-4" /><span>Certificado</span></div><button type="button" onClick={() => alSeleccionar(entrenador)} disabled={asignando || asignado} className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${asignado ? 'bg-green-600 hover:bg-green-500 text-white cursor-not-allowed' : seleccionado ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-700 hover:bg-slate-600 text-slate-300 disabled:opacity-50'}`}>{asignando && seleccionado ? <><div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto" />Asignando...</> : asignado ? <><CheckCircle className="w-4 h-4 inline mr-2" />Asignado</> : 'Seleccionar'}</button>
    </div>
  </div>;
}

export default TarjetaEntrenadorCliente;
