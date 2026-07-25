import { useState } from 'react';
import { ArrowLeft, Hash, Mail, Phone, User } from 'lucide-react';

export default function DatosPersonales({ user, onSave, onBack }) {
  const [form, setForm] = useState({ ...user });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    const nextValue = name === 'telefono' ? value.replace(/\D/g, '').slice(0, 10) : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    if (!/^\d{10}$/.test(form.telefono)) {
      setError('El teléfono debe contener exactamente 10 dígitos.');
      return;
    }
    setSaving(true);
    try { await onSave(form); } catch (err) { setError(err.message || 'No se pudieron actualizar los datos.'); } finally { setSaving(false); }
  };

  const inputClass = 'w-full bg-slate-950 border border-slate-700 rounded-lg p-3 pl-10 text-slate-300 focus:ring-2 focus:ring-blue-500 outline-none disabled:opacity-50';
  return (
    <section className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-4 mb-8 border-b border-slate-800 pb-4">
        <button type="button" onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white"><ArrowLeft size={24} /></button>
        <h2 className="text-2xl font-bold text-white">Datos Personales</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Field label="ID de Usuario" icon={<Hash size={18} />}><input value={form.id} disabled className={inputClass} /></Field>
          <Field label="Correo Electrónico" icon={<Mail size={18} />}><input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} /></Field>
          <Field label="Usuario" icon={<User size={18} />}><input type="text" name="username" value={form.username} onChange={handleChange} required className={inputClass} /></Field>
          <Field label="Nombre Completo" icon={<User size={18} />}><input value={form.nombre} disabled readOnly className={inputClass} /></Field>
          <div className="md:col-span-2"><Field label="Teléfono" icon={<Phone size={18} />}><input type="tel" name="telefono" value={form.telefono} onChange={handleChange} required maxLength={10} className={inputClass} /></Field></div>
        </div>
        {error && <p className="text-sm text-red-400 bg-red-900/20 border border-red-700 rounded-lg p-3">{error}</p>}
        <button disabled={saving} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-3 px-6 rounded-xl">{saving ? 'Guardando...' : 'Guardar Cambios'}</button>
      </form>
    </section>
  );
}

function Field({ label, icon, children }) {
  return <label className="block text-sm font-medium text-slate-400">{label}<span className="relative mt-1 block"><span className="absolute left-3 top-3.5 text-slate-500">{icon}</span>{children}</span></label>;
}
