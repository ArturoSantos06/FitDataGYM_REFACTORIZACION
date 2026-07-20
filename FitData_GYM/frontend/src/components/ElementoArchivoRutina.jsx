import React from 'react';
import { Eye, FileText, Image as ImageIcon, Trash2 } from 'lucide-react';

/** Elemento de la lista de archivos externos adjuntos a la rutina */
export default function ElementoArchivoRutina({ archivo, indice, alEliminarArchivo }) {
  return (
    <div key={indice} className="flex items-center justify-between bg-slate-950 border border-slate-700 rounded-lg p-2.5">
      <div className="flex items-center gap-3 overflow-hidden">
        <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center shrink-0">
          {archivo.archivo?.tipo?.includes('pdf') || archivo.url?.includes('.pdf') ? <FileText size={16} className="text-red-400" /> : <ImageIcon size={16} className="text-blue-400" />}
        </div>
        <div className="min-w-0 pr-2">
          <p className="text-sm font-medium text-white truncate max-w-xs">{archivo.archivo ? archivo.archivo.nombre : archivo.nombre || 'Archivo adjunto'}</p>
          <p className="text-xs text-slate-500">{archivo.archivo ? `${(archivo.archivo.tamaño / 1024 / 1024).toFixed(2)} MB` : 'Guardado en nube'}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        {archivo.url && (
          <a href={archivo.url} target="_blank" rel="noopener noreferrer" className="p-1.5 text-blue-400 hover:bg-slate-800 rounded">
            <Eye size={16} />
          </a>
        )}
        <button type="button" onClick={() => alEliminarArchivo(indice)} className="p-1.5 text-red-500 hover:bg-red-950 rounded">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}