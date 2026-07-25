import { DollarSign } from 'lucide-react';
import SelectorPeriodo from './SelectorPeriodo';
import { formatearFecha, formatearMoneda, obtenerFechaPago, obtenerMetodoPago, obtenerMontoPago, obtenerNombreEntrenador, obtenerTipoContrato } from './utilidadesEntrenadoresYPagos';

function TablaHistorialPagos({ pagos, filtroMes, setFiltroMes, filtroAnio, setFiltroAnio, anios }) {
  const pagosFiltrados = pagos.filter((payment) => {
    const date = obtenerFechaPago(payment);
    return date && date.getFullYear() === Number(filtroAnio) && date.getMonth() + 1 === Number(filtroMes);
  });

  return (
    <section className="bg-gray-800/40 rounded-xl border border-gray-700 shadow-xl overflow-hidden mt-6">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2"><DollarSign size={22} className="text-emerald-400" />Historial de Pagos a Entrenadores ({pagosFiltrados.length})</h2>
        <div className="mt-4"><SelectorPeriodo mes={filtroMes} anio={filtroAnio} onMesChange={setFiltroMes} onAnioChange={setFiltroAnio} anios={anios} /></div>
      </div>
      <div className="overflow-x-auto"><table className="w-full"><thead className="bg-gray-900/80"><tr>{['Fecha', 'Folio', 'Entrenador', 'Contrato', 'Método', 'Monto'].map((heading) => <th key={heading} className="text-left py-4 px-6 text-gray-300 font-semibold text-sm">{heading}</th>)}</tr></thead><tbody className="divide-y divide-gray-700">
        {pagosFiltrados.length === 0 ? <tr><td colSpan={6} className="text-center py-8 text-gray-400">Aún no hay pagos registrados para el período seleccionado.</td></tr> : pagosFiltrados.map((payment) => <tr key={`trainer_payment_${payment.id}`} className="hover:bg-gray-700/20 transition-colors"><td className="py-4 px-6 text-gray-300 text-sm">{formatearFecha(obtenerFechaPago(payment))}</td><td className="py-4 px-6 text-cyan-300 font-mono text-sm">{payment.folio || 'N/D'}</td><td className="py-4 px-6"><p className="text-white font-semibold">{obtenerNombreEntrenador(payment)}</p><p className="text-gray-400 text-xs">{payment.trainerEmail || payment.trainer_email || ''}</p></td><td className="py-4 px-6 text-yellow-300 text-sm">{obtenerTipoContrato(payment)}</td><td className="py-4 px-6 text-gray-300 text-sm">{obtenerMetodoPago(payment)}</td><td className="py-4 px-6 text-emerald-400 font-bold">{formatearMoneda(obtenerMontoPago(payment))}</td></tr>)}
      </tbody></table></div>
    </section>
  );
}

export default TablaHistorialPagos;
