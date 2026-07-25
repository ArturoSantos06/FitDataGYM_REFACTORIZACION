import React from 'react';
import { ChefHat, X, Loader2, Save } from 'lucide-react';
import useAsistenteNutricional from './hooks/useAsistenteNutricional';
import ResumenNutricionalDiario from './ui/ResumenNutricionalDiario';
import TarjetaComidaSugerida from './ui/TarjetaComidaSugerida';

export default function AsistenteNutricional() {
  const {
    abierto, setAbierto,
    caloriasObjetivo, setCaloriasObjetivo,
    comidasSugeridas,
    nutrientesDiarios,
    cargando, error,
    pacientes,
    idPacienteSeleccionado,
    cargandoPacientes,
    guardandoCalorias,
    mensajeGuardado,
    manejarCambioPaciente,
    guardarCaloriasPaciente,
    obtenerSugerencias
  } = useAsistenteNutricional();

  return (
    <>
      {/* Panel Flotante */}
      {abierto && (
        <div className="fixed bottom-20 right-4 z-50 w-80 sm:w-96 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl flex flex-col max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 p-4">
            <div className="flex items-center gap-2">
              <ChefHat className="text-cyan-400" size={20} />
              <h3 className="font-bold text-white">Asistente de Menú</h3>
            </div>
            <button
              onClick={() => setAbierto(false)}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-700 text-sm">
            
            {/* Seleccionar Paciente */}
            <div className="mb-4">
              <label className="block text-xs text-slate-400 mb-1">Paciente (Opcional)</label>
              <div className="relative">
                <select
                  value={idPacienteSeleccionado}
                  onChange={manejarCambioPaciente}
                  disabled={cargandoPacientes}
                  className="w-full appearance-none rounded-lg border border-slate-700 bg-slate-800 p-2 pr-8 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 disabled:opacity-50"
                >
                  <option value="">-- Seleccionar paciente --</option>
                  {pacientes.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.fullName || `${p.nombre || ''} ${p.apellido || ''}`.trim() || p.email}
                    </option>
                  ))}
                </select>
                {cargandoPacientes && (
                  <div className="absolute right-2 top-2 text-slate-400">
                    <Loader2 size={16} className="animate-spin" />
                  </div>
                )}
              </div>
            </div>

            {/* Input Calorias */}
            <div className="mb-4">
              <label className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Objetivo Calórico (kcal)</span>
                {idPacienteSeleccionado && (
                  <button
                    onClick={guardarCaloriasPaciente}
                    disabled={guardandoCalorias}
                    className="flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 disabled:opacity-50 transition-colors"
                  >
                    {guardandoCalorias ? <Loader2 size={10} className="animate-spin" /> : <Save size={10} />}
                    {mensajeGuardado || 'Guardar en perfil'}
                  </button>
                )}
              </label>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={caloriasObjetivo}
                  onChange={(e) => setCaloriasObjetivo(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 p-2 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  onClick={obtenerSugerencias}
                  disabled={cargando}
                  className="whitespace-nowrap rounded-lg bg-cyan-600 px-4 py-2 font-medium text-white hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-400 transition-colors flex items-center justify-center min-w-[100px]"
                >
                  {cargando ? <Loader2 size={16} className="animate-spin" /> : 'Generar'}
                </button>
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-red-400 text-xs">
                {error}
              </div>
            )}

            {/* Componentes Atómicos Extraídos */}
            {nutrientesDiarios && (
              <ResumenNutricionalDiario 
                calorias={nutrientesDiarios.calories}
                proteina={nutrientesDiarios.protein}
                carbohidratos={nutrientesDiarios.carbohydrates}
                grasas={nutrientesDiarios.fat}
              />
            )}

            {comidasSugeridas.length > 0 ? (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Comidas Sugeridas
                </h4>
                {comidasSugeridas.map((comida, index) => (
                  <TarjetaComidaSugerida
                    key={comida.id}
                    tipo={comida.type || `Comida ${index + 1}`}
                    titulo={comida.title}
                    minutos={comida.readyInMinutes}
                    porciones={comida.servings}
                  />
                ))}
              </div>
            ) : (
              !cargando && (
                <div className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-slate-400">
                  <ChefHat size={32} className="mx-auto mb-2 opacity-50" />
                  <p className="text-xs">Ingresa las calorías objetivo y genera un menú al instante para tu paciente.</p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Burbuja Flotante */}
      <button
        type="button"
        onClick={() => setAbierto((prev) => !prev)}
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-600 text-white shadow-[0_10px_30px_rgba(6,182,212,0.4)] transition-transform hover:scale-105"
        aria-label="Abrir asistente de menú"
      >
        {abierto ? <X size={24} /> : <ChefHat size={24} />}
      </button>
    </>
  );
}