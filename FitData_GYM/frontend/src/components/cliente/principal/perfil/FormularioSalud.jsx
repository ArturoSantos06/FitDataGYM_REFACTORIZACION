import { useEffect, useState } from 'react';
import { Activity, Calendar, CheckCircle, Heart, Phone, Send } from 'lucide-react';
import ModalExito from '../../../modales/ModalExito';
import { createHealthProfile, getCurrentUser, getHealthProfileByMemberId } from '../../../../firebase';
import { getDisplayName, resolveMemberByCandidates, resolveUserFromAuth } from './serviciosPerfil';

const INITIAL_FORM = { nombre: '', edad: '', telefono: '', condicionCorazon: false, presionAlta: false, lesionesRecientes: false, medicamentos: false, comentarios: '', aceptaWaiver: false };
const QUESTIONS = [
  ['condicionCorazon', '¿Padece alguna condición del corazón?'],
  ['presionAlta', '¿Sufre presión arterial alta?'],
  ['lesionesRecientes', '¿Ha tenido lesiones físicas recientes?'],
  ['medicamentos', '¿Toma medicamentos regularmente?'],
];

export default function FormularioSalud() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const authUser = getCurrentUser();
        const userResult = await resolveUserFromAuth(authUser);
        if (!userResult.success) return;
        const memberResult = await resolveMemberByCandidates([authUser.uid, userResult.data.id]);
        const member = memberResult.success ? memberResult.data : null;
        const healthResult = member?.id ? await getHealthProfileByMemberId(member.id) : null;
        const health = healthResult?.success ? healthResult.data : null;
        if (active) setForm((current) => ({ ...current, nombre: getDisplayName(userResult.data, authUser), telefono: member?.telefono || userResult.data.phone || '', edad: health?.age ?? health?.edad ?? '', condicionCorazon: health?.heart_condition ?? false, presionAlta: health?.high_blood_pressure ?? false, lesionesRecientes: health?.recent_injuries ?? false, medicamentos: health?.medications ?? false, comentarios: health?.additional_info ?? '' }));
      } catch (error) { if (active) console.error('Error cargando ficha médica:', error); }
    };
    load();
    return () => { active = false; };
  }, []);

  const handleChange = ({ target: { name, value, type, checked } }) => setForm((current) => ({ ...current, [name]: type === 'radio' ? value === 'si' : type === 'checkbox' ? checked : value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.nombre || !/^\d{10}$/.test(form.telefono) || !form.edad) return showError('Completa Nombre, Edad y un teléfono válido de 10 dígitos.');
    if (!form.aceptaWaiver) return showError('Debes leer y aceptar el descargo de responsabilidad.');
    setStatus('loading');
    try {
      const authUser = getCurrentUser();
      if (!authUser) throw new Error('No hay sesión activa');
      const userResult = await resolveUserFromAuth(authUser);
      const memberResult = userResult.success ? await resolveMemberByCandidates([authUser.uid, userResult.data.id]) : null;
      const member = memberResult?.success ? memberResult.data : null;
      const memberName = member?.nombre || member?.miembro_nombre || (userResult.success ? getDisplayName(userResult.data, authUser) : form.nombre);
      const result = await createHealthProfile({ userId: authUser.uid, memberId: member?.id || null, memberName, userIdDisplay: member?.id || authUser.uid, age: Number(form.edad), heart_condition: form.condicionCorazon, high_blood_pressure: form.presionAlta, recent_injuries: form.lesionesRecientes, medications: form.medicamentos, additional_info: form.comentarios });
      if (!result.success) throw new Error(result.error || 'Error guardando ficha');
      setMessage(result.updated ? 'Ficha médica actualizada correctamente' : 'Ficha médica creada correctamente'); setShowModal(true); setStatus('success');
    } catch (error) { showError(error.message || 'No se pudo guardar la ficha médica.'); }
  };

  const showError = (error) => { setMessage(error); setStatus('error'); };
  if (status === 'error') return <div className="p-6 space-y-4"><p className="text-sm text-red-300 bg-red-900/20 border border-red-700 rounded-lg p-3">{message}</p><button type="button" onClick={() => setStatus('idle')} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">Volver al formulario</button></div>;
  if (status === 'success') return <><ModalExito isOpen={showModal} onClose={() => setShowModal(false)} title="Ficha médica" message={message} /><div className="p-6 space-y-6"><div className="flex items-center gap-3"><CheckCircle size={28} className="text-green-400" /><div><h2 className="text-xl font-bold text-white">Ficha Médica Guardada</h2><p className="text-slate-400 text-sm">Puedes revisar tus respuestas o editar si algo cambió.</p></div></div><Summary form={form} /><button type="button" onClick={() => setStatus('idle')} className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold">Editar Ficha</button></div></>;

  const inputClass = 'w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none';
  return <div className="w-full"><ModalExito isOpen={showModal} onClose={() => setShowModal(false)} title="Ficha médica" message={message} /><div className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-center rounded-t-2xl"><h2 className="text-2xl font-bold text-white flex justify-center items-center gap-2"><Activity className="text-blue-200" /> Cuestionario de Salud</h2></div><form onSubmit={handleSubmit} className="p-6 bg-slate-800/50 rounded-b-2xl border border-slate-700 border-t-0 space-y-6"><div className="grid md:grid-cols-2 gap-4"><Input label="Nombre Completo (Automático)" name="nombre" value={form.nombre} disabled className={`${inputClass} opacity-60`} /><Input label={<><Calendar size={16} /> Edad</>} name="edad" type="number" min="1" max="120" value={form.edad} onChange={handleChange} required className={inputClass} /><Input label={<><Phone size={16} /> Teléfono (Registrado)</>} name="telefono" value={form.telefono} disabled className={`${inputClass} opacity-60`} /></div><h3 className="text-md font-semibold text-purple-400 border-b border-slate-700 pb-2 flex items-center gap-2"><Heart size={18} /> Historial Médico</h3><div className="space-y-4">{QUESTIONS.map(([name, label]) => <BooleanQuestion key={name} name={name} label={label} value={form[name]} onChange={handleChange} />)}<label className="text-purple-300 text-sm">Información adicional<textarea name="comentarios" value={form.comentarios} onChange={handleChange} className={`${inputClass} mt-1 min-h-20 resize-y`} /></label></div><label className="flex items-start gap-3 text-slate-300 text-sm"><input type="checkbox" name="aceptaWaiver" checked={form.aceptaWaiver} onChange={handleChange} required className="mt-1 accent-yellow-500 w-5 h-5" />Declaro que la información es verdadera y libero al gimnasio de responsabilidad por lesiones.</label><button type="submit" disabled={status === 'loading'} className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl flex justify-center gap-2">{status === 'loading' ? 'Enviando...' : <><Send size={18} /> ENVIAR DATOS</>}</button></form></div>;
}

function Input({ label, ...props }) { return <label className="block text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">{label}<input {...props} /></label>; }
function BooleanQuestion({ name, label, value, onChange }) { return <fieldset className="bg-slate-800/50 p-3 rounded-lg flex justify-between items-center border border-slate-700/50"><legend className="sr-only">{label}</legend><span className="text-slate-300 text-sm">{label}</span><span className="flex gap-4"><label className="flex items-center gap-2"><input type="radio" name={name} value="si" checked={value === true} onChange={onChange} />Sí</label><label className="flex items-center gap-2"><input type="radio" name={name} value="no" checked={value === false} onChange={onChange} />No</label></span></fieldset>; }
function Summary({ form }) { return <div className="grid md:grid-cols-2 gap-4">{[['Edad', form.edad], ['Condición del corazón', form.condicionCorazon ? 'Sí' : 'No'], ['Presión arterial alta', form.presionAlta ? 'Sí' : 'No'], ['Lesiones recientes', form.lesionesRecientes ? 'Sí' : 'No'], ['Medicamentos', form.medicamentos ? 'Sí' : 'No'], ['Comentarios', form.comentarios || '—']].map(([label, value]) => <div key={label} className="bg-slate-800/60 border border-slate-700 rounded-lg p-4"><p className="text-xs text-slate-400">{label}</p><p className="text-white font-semibold whitespace-pre-wrap">{value}</p></div>)}</div>; }
