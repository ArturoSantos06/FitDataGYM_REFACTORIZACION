import React from 'react';
import TarjetaResultadosMacros from './TarjetaResultadosMacros';
import { nutritionFormulaInfo } from './utils/nutritionCalculations';
import { useFormularioMacros } from './hooks/useFormularioMacros';

function FormularioMacros() {
  const {
    form,
    result,
    error,
    activityOptions,
    goalOptions,
    handleChange,
    handleSubmit
  } = useFormularioMacros();

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl"
      >
        <h2 className="text-xl font-bold text-white">Datos del paciente</h2>
        <p className="mt-1 text-sm text-slate-400">{nutritionFormulaInfo.formula}</p>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          
          <label className="text-sm text-slate-300">
            Sexo
            <select
              name="sex"
              value={form.sex}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 outline-none transition-all"
            >
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
            </select>
          </label>

          <label className="text-sm text-slate-300">
            Edad
            <input
              name="age"
              value={form.age}
              onChange={handleChange}
              type="number"
              min="10"
              max="100"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 outline-none transition-all"
              placeholder="Ej. 32"
              required
            />
          </label>

          <label className="text-sm text-slate-300">
            Peso (kg)
            <input
              name="weightKg"
              value={form.weightKg}
              onChange={handleChange}
              type="number"
              min="30"
              max="250"
              step="0.1"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 outline-none transition-all"
              placeholder="Ej. 78.5"
              required
            />
          </label>

          <label className="text-sm text-slate-300">
            Altura (cm)
            <input
              name="heightCm"
              value={form.heightCm}
              onChange={handleChange}
              type="number"
              min="120"
              max="240"
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 outline-none transition-all"
              placeholder="Ej. 175"
              required
            />
          </label>

          <label className="text-sm text-slate-300 sm:col-span-2">
            Nivel de actividad
            <select
              name="activityLevel"
              value={form.activityLevel}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 outline-none transition-all"
            >
              {activityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-slate-300 sm:col-span-2">
            Objetivo nutricional
            <select
              name="goal"
              value={form.goal}
              onChange={handleChange}
              className="mt-2 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-white focus:border-cyan-500 outline-none transition-all"
            >
              {goalOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500 bg-red-900/20 p-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="mt-6 w-full rounded-xl bg-cyan-600 py-3 font-bold text-white transition-colors hover:bg-cyan-500"
        >
          Ejecutar algoritmo de macronutrientes
        </button>
      </form>

      {/* Componente que refactorizamos previamente */}
      <TarjetaResultadosMacros result={result} />
    </div>
  );
}

export default FormularioMacros;