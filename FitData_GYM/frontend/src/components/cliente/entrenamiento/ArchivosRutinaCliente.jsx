import { Download, FileText, Image as IconoImagen } from 'lucide-react';

function ArchivosRutinaCliente({ archivos, urls, indiceDescarga, errorDescarga, alDescargar }) {
  return <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden"><div className="flex items-center gap-2 px-5 py-4 border-b border-slate-800"><FileText size={18} className="text-amber-400" /><span className="font-bold text-white text-base">Material de apoyo</span><span className="ml-auto text-xs text-slate-500 bg-slate-800 rounded-full px-2.5 py-0.5">{archivos.length} {archivos.length === 1 ? 'archivo' : 'archivos'}</span></div>
    {errorDescarga && <div className="mx-4 mt-4 rounded-lg border border-red-700 bg-red-950 px-3 py-2 text-xs text-red-200">{errorDescarga}</div>}
    <div className="p-4 md:p-5 grid grid-cols-1 sm:grid-cols-2 gap-3">{archivos.map((archivo, indice) => <ArchivoRutinaCliente key={`${archivo.nombre || 'archivo'}-${indice}`} archivo={archivo} url={urls[indice] || archivo.url || ''} indice={indice} descargando={indiceDescarga === indice} alDescargar={alDescargar} />)}</div>
  </div>;
}

function ArchivoRutinaCliente({ archivo, url, indice, descargando, alDescargar }) {
  const esPdf = archivo.tipo === 'application/pdf';
  const tamano = archivo.size ? `${(archivo.size / 1024).toFixed(0)} KB` : null;
  const disponible = Boolean(url || archivo.storagePath || archivo.path);
  const Icono = esPdf ? FileText : IconoImagen;

  return <div className="flex items-center gap-3 bg-slate-950/80 border border-slate-800 rounded-xl p-3 hover:border-slate-700 transition-colors"><div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${esPdf ? 'bg-red-500/15 text-red-400' : 'bg-sky-500/15 text-sky-400'}`}><Icono size={16} /></div><div className="flex-1 min-w-0"><p className="text-slate-200 text-sm font-medium truncate">{archivo.nombre || 'Archivo'}</p>{tamano && <p className="text-slate-500 text-xs">{tamano}</p>}</div>{disponible ? <button type="button" onClick={() => alDescargar(archivo, url, indice)} disabled={descargando} className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1.5 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 hover:bg-blue-600/30 transition-colors"><Download size={13} />{descargando ? 'Descargando...' : 'Descargar'}</button> : <span className="text-[11px] text-slate-500">No disponible</span>}</div>;
}

export default ArchivosRutinaCliente;
