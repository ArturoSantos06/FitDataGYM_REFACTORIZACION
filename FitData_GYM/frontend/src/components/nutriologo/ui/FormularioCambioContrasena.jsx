import React, { useState } from 'react';
import { ArrowLeft, Hash, Mail, User, Phone } from 'lucide-react';

export default function FormularioDatosPersonales({ usuario, codigoNutriologo, alGuardar, alRegresar }) {
  const [formularioEdicion, setFormularioEdicion] = useState({ ...usuario });
  const [guardando, setGuardando] = useState(false);
  const [errorMsj, setErrorMsj] = useState('');

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === 'telefono') {
      const valorNumerico = value.replace(/\D/g, '').slice(0, 10);
      setFormularioEdicion((prev) => ({ ...prev, [name]: valorNumerico }));
      return;
    }
    setFormularioEdicion((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setErrorMsj('');
    setGuardando(true);
    try {
      await alGuardar(formularioEdicion);
    } catch (err) {
      setErrorMsj(err.message || 'No se pudo actualizar el perfil');
    } finally {
      setGuardando(false);
    }
  };

  const inputClass = "w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-slate-300 focus:ring-2 focus:ring-cyan-500 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-medium text-slate-400 mb-1 ml-1";

  return (
    <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-4">
        <button onClick={alRegresar} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" type="button">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-white">Datos del Nutriólogo</h2>
      </div>

      <form onSubmit={manejarEnvio} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Codigo de Nutriologo</label>
            <div className="relative">
              <Hash className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input type="text" value={`#${codigoNutriologo || '---'}`} disabled className={inputClass} />
            </div>
          </div>

          <div>
            <label className={`${labelClass} text-cyan-400 font-semibold`}>Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-cyan-400" size={18} />
              <input type="email" name="email" value={formularioEdicion.email || ''} onChange={manejarCambio} className={`${inputClass} border-cyan-500/30 focus:border-cyan-500 text-white bg-cyan-900/10`} />
            </div>
          </div>

          <div>
            <label className={`${labelClass} text-indigo-400 font-semibold`}>Usuario</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-indigo-400" size={18} />
              <input type="text" name="username" value={formularioEdicion.username || ''} onChange={manejarCambio} className={`${inputClass} border-indigo-500/30 focus:border-indigo-500 text-white bg-indigo-900/10`} />
            </div>
          </div>

          <div>
            <label className={`${labelClass} text-blue-400 font-semibold`}>Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3.5 text-blue-400" size={18} />
              <input type="tel" name="telefono" value={formularioEdicion.telefono || ''} onChange={manejarCambio} className={`${inputClass} border-blue-500/30 focus:border-blue-500 text-white bg-blue-900/10`} placeholder="10 dígitos" />
            </div>
          </div>

          <div>
            <label className={`${labelClass} text-slate-300 font-semibold`}>Nombre(s)</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input type="text" name="firstName" value={formularioEdicion.firstName || ''} onChange={manejarCambio} className={inputClass} placeholder="Nombre(s)" />
            </div>
          </div>

          <div>
            <label className={`${labelClass} text-slate-300 font-semibold`}>Apellidos</label>
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-slate-500" size={18} />
              <input type="text" name="lastName" value={formularioEdicion.lastName || ''} onChange={manejarCambio} className={inputClass} placeholder="Apellidos" />
            </div>
          </div>
        </div>

        {errorMsj && <div className="text-sm text-red-400 bg-red-900/20 border border-red-700 rounded-lg p-3">{errorMsj}</div>}

        <div className="pt-2 flex gap-3">
          <button type="button" onClick={alRegresar} className="w-1/3 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-xl transition-all">
            Cancelar
          </button>
          <button disabled={guardando} type="submit" className="w-2/3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-cyan-600/20 transition-all active:scale-95">
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  );
}