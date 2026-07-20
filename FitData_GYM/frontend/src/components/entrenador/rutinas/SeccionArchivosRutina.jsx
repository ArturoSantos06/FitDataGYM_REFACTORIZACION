import React from 'react';
import { Upload } from 'lucide-react';
import ElementoArchivoRutina from '../../ElementoArchivoRutina';

export default function SeccionArchivosRutina({ files = [], onFileChange, onRemoveFile }) {
  const archivos = Array.isArray(files) ? files : [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6">
      <div className="flex items-center gap-2 text-slate-200 font-semibold mb-4">
        <Upload size={18} />
        Archivos externos (Imágenes / PDF)
      </div>

      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer text-sm transition-colors">
        <Upload size={16} />
        Subir archivos
        <input type="file" accept="image/*,.pdf" multiple onChange={onFileChange} className="hidden" />
      </label>

      {archivos.length > 0 && (
        <div className="mt-4 space-y-2">
          {archivos.map((f, index) => (
            <ElementoArchivoRutina key={index} archivo={f} indice={index} alEliminarArchivo={onRemoveFile} />
          ))}
        </div>
      )}
    </div>
  );
}
