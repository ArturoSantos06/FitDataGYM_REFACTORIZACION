import { useState } from 'react';
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from 'firebase/auth';
import { ArrowLeft, Lock } from 'lucide-react';
import { getCurrentUser } from '../../../../firebase';

export default function CambiarContraseña({ onBack }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); setError(''); setSuccess('');
    if (!currentPassword || !newPassword) return setError('Completa los campos requeridos');
    if (newPassword.length < 6) return setError('La nueva contraseña debe tener al menos 6 caracteres');
    if (newPassword !== confirmation) return setError('La confirmación no coincide');
    try {
      setLoading(true);
      const user = getCurrentUser();
      if (!user?.email) throw new Error('No hay una cuenta de correo disponible');
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
      await updatePassword(user, newPassword);
      setSuccess('Contraseña actualizada correctamente'); setCurrentPassword(''); setNewPassword(''); setConfirmation('');
    } catch (err) { setError(err.code === 'auth/invalid-credential' ? 'La contraseña actual no es correcta.' : err.message || 'Error al cambiar contraseña'); }
    finally { setLoading(false); }
  };

  const inputClass = 'w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-slate-200 focus:border-emerald-500 outline-none';
  return <section className="w-full max-w-md bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-300">
    <div className="flex items-center gap-4 mb-6"><button type="button" onClick={onBack} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400"><ArrowLeft size={22} /></button><h2 className="text-xl font-bold text-white flex items-center gap-2"><Lock size={18} className="text-emerald-400" /> Cambiar Contraseña</h2></div>
    {error && <p className="mb-4 text-sm text-red-400 bg-red-900/20 border border-red-700 rounded-lg p-3">{error}</p>}
    {success && <p className="mb-4 text-sm text-emerald-400 bg-emerald-900/20 border border-emerald-700 rounded-lg p-3">{success}</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <PasswordField label="Contraseña actual" value={currentPassword} onChange={setCurrentPassword} autoComplete="current-password" className={inputClass} />
      <PasswordField label="Nueva contraseña" value={newPassword} onChange={setNewPassword} autoComplete="new-password" className={inputClass} />
      <PasswordField label="Confirmar nueva contraseña" value={confirmation} onChange={setConfirmation} autoComplete="new-password" className={inputClass} />
      <button disabled={loading} type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl">{loading ? 'Actualizando...' : 'Guardar contraseña'}</button>
    </form>
  </section>;
}

function PasswordField({ label, value, onChange, ...props }) { return <label className="text-sm text-slate-400 mb-1 block">{label}<input type="password" value={value} onChange={(event) => onChange(event.target.value)} required className="mt-1" {...props} /></label>; }
