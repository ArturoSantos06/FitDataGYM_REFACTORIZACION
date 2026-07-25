import { obtenerNombreCompleto } from '../../utils/utilidadesCobros';

export default function FilaClienteCobro({ cliente, seleccionado, alSeleccionar }) {
  return (
    <tr
      onClick={() => alSeleccionar(cliente.id)}
      className={`cursor-pointer border-t border-slate-800 transition-colors ${
        seleccionado ? 'bg-cyan-500/10' : 'hover:bg-slate-800/70'
      }`}
    >
      <td className="px-2 py-2 text-cyan-300">{cliente.id}</td>
      <td className="px-2 py-2 text-slate-100">
        <p className="font-semibold">{obtenerNombreCompleto(cliente)}</p>
        <p className="text-[10px] text-slate-400">
          {cliente.userId || 'Sin identificador'}
        </p>
      </td>
      <td className="px-2 py-2 text-slate-300">{cliente.email || 'Sin correo'}</td>
    </tr>
  );
}
