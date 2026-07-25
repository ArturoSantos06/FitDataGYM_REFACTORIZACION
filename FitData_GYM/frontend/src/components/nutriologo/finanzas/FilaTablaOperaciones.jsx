export default function FilaTablaOperaciones({ tipo, concepto, fechaFormateada, montoFormateado }) {
  return (
    <tr className="border-b border-slate-800/60 text-sm text-slate-200">
      <td className="py-3">
        <span className="rounded-full bg-indigo-500/20 px-2 py-1 text-[11px] font-bold text-indigo-300">
          {tipo}
        </span>
      </td>
      <td className="py-3">{concepto}</td>
      <td className="py-3 text-slate-400">{fechaFormateada}</td>
      <td className="py-3 text-right font-semibold text-emerald-300">
        {montoFormateado}
      </td>
    </tr>
  );
}
