export const FIELD_CLASS =
  'w-full bg-slate-950/70 border border-slate-600/80 rounded-lg px-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 focus:border-cyan-400/50 transition-all';

export const LABEL_CLASS = 'block text-xs tracking-wide uppercase font-semibold text-slate-300 mb-1.5';

export const CARD_CLASS = 'rounded-xl bg-slate-900/30 p-4 md:p-5 border-b border-slate-700/40';

export const TIPOS_REGISTRO = [
  { value: 'cliente', label: 'Cliente' },
  { value: 'entrenador', label: 'Entrenador' },
  { value: 'nutriologo', label: 'Nutriólogo' },
];

export const SUBTITULOS_REGISTRO = {
  cliente: 'Crea una nueva cuenta en FitData GYM',
  entrenador: 'Crea una nueva cuenta de entrenador en FitData GYM',
  nutriologo: 'Crea una nueva cuenta de nutriólogo en FitData GYM',
};

export const SEXO_OPTIONS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
];

export const PAYMENT_METHOD_OPTIONS = [
  { value: 'EFECTIVO', label: 'Efectivo' },
  { value: 'TARJETA', label: 'Tarjeta' },
  { value: 'TRANSFERENCIA', label: 'Transferencia' },
];

export const CONTRACT_TYPE_OPTIONS = ['Asimilados a Salarios', 'Honorarios (Persona Fisica)', 'Comisiones'];

export const TRAINER_SPECIALTY_OPTIONS = [
  'Entrenamiento Funcional',
  'Fuerza e Hipertrofia',
  'Pérdida de Grasa',
  'Rehabilitación y Movilidad',
  'Alto Rendimiento',
  'Preparación Física General',
  'Otro',
];

export const FORM_CLIENTE_INICIAL = {
  username: '',
  email: '',
  phone: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
  sexo: '',
  membership_id: '',
  payment_method: 'EFECTIVO',
};

export const FORM_ENTRENADOR_INICIAL = {
  username: '',
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
  contract_type: '',
  trainer_specialty: '',
  trainer_specialty_other: '',
};

export const FORM_NUTRIOLOGO_INICIAL = {
  email: '',
  password: '',
  confirm_password: '',
  first_name: '',
  last_name: '',
  especialidad: 'Nutrición Deportiva',
};
