import { Upload } from 'lucide-react';
import FilaArchivoRutina from './FilaArchivoRutina';

function SeccionArchivosRutina({ files: archivosProp = [], onFileChange: alCambiarArchivo, onRemoveFile: alQuitarArchivo }) {
  const archivos = Array.isArray(archivosProp) ? archivosProp : [];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6">
      <div className="flex items-center gap-2 text-slate-200 font-semibold mb-4">
        <Upload size={18} />
        Archivos externos (Imágenes / PDF)
      </div>

      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer text-sm transition-colors">
        <Upload size={16} />
        Subir archivos
        <input type="file" accept="image/*,.pdf" multiple onChange={alCambiarArchivo} className="hidden" />
      </label>

      <div className="mt-4 space-y-2">
        {archivos.length === 0 && <p className="text-slate-500 text-sm">No hay archivos cargados.</p>}
        {archivos.map((archivo, indice) => <FilaArchivoRutina key={`${archivo.name}-${indice}`} archivo={archivo}
          indice={indice} alQuitar={alQuitarArchivo} />)}
      </div>
    </div>
  );
}

export default SeccionArchivosRutina;
