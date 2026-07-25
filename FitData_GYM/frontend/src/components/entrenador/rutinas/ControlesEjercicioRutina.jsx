import { Trash2 } from 'lucide-react';

function ControlesEjercicioRutina({ ejercicio, diaActivo, diasActivos, alMover, alEliminar }) {
  const otrosDias = diasActivos.filter((dia) => dia !== diaActivo);
  const moverEjercicio = (evento) => {
    if (!evento.target.value) return;
    alMover(diaActivo, ejercicio.id, evento.target.value);
    evento.target.value = '';
  };

  return <div className="flex items-center gap-1.5 shrink-0">
    {otrosDias.length > 0 && <select defaultValue="" onChange={moverEjercicio}
      className="text-xs bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-2 py-1 outline-none cursor-pointer">
      <option value="" disabled>Mover a…</option>
      {otrosDias.map((dia) => <option key={dia} value={dia}>{dia}</option>)}
    </select>}
    <button type="button" onClick={() => alEliminar(diaActivo, ejercicio.id)}
      className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-950 rounded-lg transition-colors" title="Eliminar ejercicio">
      <Trash2 size={14} />
    </button>
  </div>;
}

export default ControlesEjercicioRutina;
