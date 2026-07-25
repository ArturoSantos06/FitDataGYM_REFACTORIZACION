import { useState } from 'react';
import { Activity, ChevronRight, Edit2, Lock, User } from 'lucide-react';

const AVATAR_COLORS = [
  { id: 'azul', value: '#1D4ED8' },
  { id: 'morado', value: '#6D28D9' },
  { id: 'verde', value: '#059669' },
  { id: 'amarillo', value: '#D97706' },
  { id: 'rojo', value: '#DC2626' },
  { id: 'rosa', value: '#DB2777' },
];

const ACTION_COLORS = {
  blue: 'bg-blue-500/10 text-blue-400 group-hover:text-blue-300 group-hover:text-blue-400',
  purple: 'bg-purple-500/10 text-purple-400 group-hover:text-purple-300 group-hover:text-purple-400',
  emerald: 'bg-emerald-500/10 text-emerald-400 group-hover:text-emerald-300 group-hover:text-emerald-400',
};

const ProfileAction = ({ icon, color, label, onClick }) => (
  <button type="button" onClick={onClick} className="w-full bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-xl p-4 flex items-center justify-between group transition-all">
    <span className="flex items-center gap-4">
      <span className={`p-2 rounded-lg ${ACTION_COLORS[color]}`}>{icon}</span>
      <span className="text-slate-200 font-medium group-hover:text-white">{label}</span>
    </span>
    <ChevronRight className="text-slate-500 transition-transform group-hover:translate-x-1" size={20} />
  </button>
);

export default function EncabezadoPerfil({ user, onNavigate }) {
  const initial = (user.nombre || user.username || 'U').charAt(0).toUpperCase();
  const storageKey = `avatar_bg_color_${user.id}`;
  const [showColors, setShowColors] = useState(false);
  const [bgColor, setBgColor] = useState(() => localStorage.getItem(storageKey) || '#1D4ED8');

  const handleColor = (color) => {
    setBgColor(color);
    localStorage.setItem(storageKey, color);
    setShowColors(false);
  };

  return (
    <section className="w-full max-w-2xl bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
      <div className="h-32 bg-linear-to-r from-blue-900 via-indigo-900 to-slate-900" />
      <div className="px-8 pb-8 text-center relative">
        <div className="relative -mt-16 mb-4 inline-block">
          <div className="w-32 h-32 rounded-full border-4 border-slate-900 flex items-center justify-center overflow-hidden shadow-lg relative" style={{ backgroundColor: bgColor }}>
            <span className="text-white text-5xl font-bold select-none">{initial}</span>
            <button type="button" aria-label="Cambiar color del avatar" onClick={() => setShowColors((visible) => !visible)} className="absolute bottom-1 right-1 p-2 rounded-full bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white shadow">
              <Edit2 size={16} />
            </button>
          </div>
          {showColors && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-[18rem] z-20 bg-slate-900 border border-slate-700 rounded-xl p-4 shadow-2xl">
              <p className="text-xs text-slate-400 mb-3">Color de fondo:</p>
              <div className="grid grid-cols-6 gap-3">
                {AVATAR_COLORS.map(({ id, value }) => (
                  <button key={id} type="button" aria-label={`Color ${id}`} onClick={() => handleColor(value)} className={`w-10 h-10 rounded-full border ${bgColor === value ? 'border-white' : 'border-slate-600 hover:border-slate-400'}`} style={{ backgroundColor: value }} />
                ))}
              </div>
              <button type="button" onClick={() => setShowColors(false)} className="mt-4 w-full text-xs font-semibold text-slate-300 py-2 rounded-lg bg-slate-800 border border-slate-700">Cerrar</button>
            </div>
          )}
        </div>
        <h2 className="text-3xl font-bold text-white mb-1">{user.nombre}</h2>
        <p className="text-blue-400 font-medium mb-4">{user.email}</p>
        <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/30 rounded-full px-4 py-2 mb-2">
          <span className="text-yellow-400 font-bold text-lg">{user.gymPoints || 0}</span>
          <span className="text-yellow-500/70 font-medium tracking-wide">GYM-Points</span>
        </div>
        <div className="mt-8 space-y-3 text-left">
          <ProfileAction icon={<User size={20} />} color="blue" label="Editar Datos Personales" onClick={() => onNavigate('edit-personal')} />
          <ProfileAction icon={<Activity size={20} />} color="purple" label="Actualizar Ficha Médica" onClick={() => onNavigate('health-form')} />
          <ProfileAction icon={<Lock size={20} />} color="emerald" label="Cambiar Contraseña" onClick={() => onNavigate('change-password')} />
        </div>
      </div>
    </section>
  );
}
