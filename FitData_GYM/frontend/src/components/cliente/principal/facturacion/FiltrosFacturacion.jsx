import React from 'react';
import { MONTHS } from './facturacionUtils';

function FiltrosFacturacion({ mes, anio, onMesChange, onAnioChange }) {
  return (
    <div className="bg-blue-900/30 border border-blue-800 rounded-xl p-5 space-y-4 overflow-visible max-w-full">
      <div className="space-y-3">
        <div className="space-y-2 min-w-0">
          <label className="block text-sm font-medium text-slate-300" htmlFor="filtro-mes">
            Mes
          </label>
          <select
            id="filtro-mes"
            value={mes}
            onChange={(event) => onMesChange(event.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="all">Todos los meses</option>
            {MONTHS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2 min-w-0">
          <label className="block text-sm font-medium text-slate-300" htmlFor="filtro-anio">
            Año
          </label>
          <select
            id="filtro-anio"
            value={anio}
            onChange={(event) => onAnioChange(event.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="all">Todos los años</option>
            {[2024, 2025, 2026, 2027].map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="rounded-xl bg-slate-950/60 border border-slate-800 p-4 text-sm text-slate-400 min-w-0 whitespace-normal break-all">
        <p className="mb-2">Si no ves facturas, prueba a seleccionar "Todos los meses" o cambiar el año.</p>
        <p>El botón de <span className="text-cyan-300">Generar</span> aparece cuando tienes compras sin factura, y <span className="text-emerald-300">Descargar</span> cuando la factura ya está disponible.</p>
      </div>
    </div>
  );
}

export default FiltrosFacturacion;
