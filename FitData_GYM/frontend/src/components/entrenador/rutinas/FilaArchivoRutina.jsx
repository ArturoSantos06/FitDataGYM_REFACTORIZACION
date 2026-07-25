import { FileText, Image as ImageIcon } from 'lucide-react';

function FilaArchivoRutina({ archivo, indice, alQuitar }) {
  const IconoArchivo = archivo.type === 'application/pdf' ? FileText : ImageIcon;

  return <div className="flex items-center justify-between bg-slate-950 border border-slate-800 rounded-lg p-3">
    <div className="flex items-center gap-2 text-slate-300"><IconoArchivo size={16} /><span className="text-sm">{archivo.name}</span></div>
    <button type="button" onClick={() => alQuitar(indice)} className="text-red-400 hover:text-red-300 text-sm">Quitar</button>
  </div>;
}

export default FilaArchivoRutina;
