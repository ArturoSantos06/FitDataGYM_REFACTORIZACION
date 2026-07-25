import {
  Building2,
  DollarSign,
  Hash,
  Mail,
  Phone,
  User,
} from 'lucide-react';

import {
  OPCIONES_CONTRATO,
} from '../../../../backend/perfilEntrenadorUtilidades';

export function crearCamposDatosBasicos({
  form = {},
  trainerCode = '',
}) {
  return [
    {
      id: 'codigo-entrenador',
      label: 'Código de Entrenador',
      Icono: Hash,
      type: 'text',
      value: `#${trainerCode || '---'}`,
      disabled: true,
      claseIcono: 'text-slate-500',
    },
    {
      id: 'correo-entrenador',
      label: 'Correo Electrónico',
      Icono: Mail,
      type: 'email',
      name: 'email',
      value: form.email ?? '',
      autoComplete: 'email',
      claseEtiqueta:
        'font-semibold text-cyan-400',
      claseIcono: 'text-cyan-400',
      claseCampo:
        'border-cyan-500/30 bg-cyan-900/10 text-white focus:border-cyan-500',
    },
    {
      id: 'usuario-entrenador',
      label: 'Usuario',
      Icono: User,
      type: 'text',
      name: 'username',
      value: form.username ?? '',
      autoComplete: 'username',
      claseEtiqueta:
        'font-semibold text-indigo-400',
      claseIcono: 'text-indigo-400',
      claseCampo:
        'border-indigo-500/30 bg-indigo-900/10 text-white focus:border-indigo-500',
    },
    {
      id: 'telefono-entrenador',
      label: 'Teléfono',
      Icono: Phone,
      type: 'tel',
      name: 'telefono',
      value: form.telefono ?? '',
      placeholder: '10 dígitos',
      autoComplete: 'tel',
      inputMode: 'numeric',
      maxLength: 10,
      claseEtiqueta:
        'font-semibold text-blue-400',
      claseIcono: 'text-blue-400',
      claseCampo:
        'border-blue-500/30 bg-blue-900/10 text-white focus:border-blue-500',
    },
    {
      id: 'nombres-entrenador',
      label: 'Nombre(s)',
      Icono: User,
      type: 'text',
      name: 'firstName',
      value: form.firstName ?? '',
      placeholder: 'Nombre(s)',
      autoComplete: 'given-name',
      claseEtiqueta:
        'font-semibold text-slate-300',
      claseIcono: 'text-slate-500',
    },
    {
      id: 'apellidos-entrenador',
      label: 'Apellidos',
      Icono: User,
      type: 'text',
      name: 'lastName',
      value: form.lastName ?? '',
      placeholder: 'Apellidos',
      autoComplete: 'family-name',
      claseEtiqueta:
        'font-semibold text-slate-300',
      claseIcono: 'text-slate-500',
    },
    {
      id: 'tipo-contrato-entrenador',
      label: 'Tipo de Contrato',
      Icono: Building2,
      type: 'select',
      name: 'contractType',
      value: form.contractType ?? '',
      options: OPCIONES_CONTRATO,
      claseEtiqueta:
        'font-semibold text-amber-300',
      claseIcono: 'text-amber-400',
      claseCampo:
        'border-amber-500/30 bg-amber-900/10 text-white focus:border-amber-500',
    },
    {
      id: 'precio-personal-entrenador',
      label:
        'Costo del Servicio Personal (MXN)',
      Icono: DollarSign,
      type: 'number',
      name: 'personalServicePrice',
      value:
        form.personalServicePrice ?? '',
      placeholder: 'Ej: 499',
      disabled:
        !form.offersPersonalService,
      min: '0',
      step: '0.01',
      inputMode: 'decimal',
      claseEtiqueta:
        'font-semibold text-cyan-300',
      claseIcono: 'text-cyan-400',
      claseCampo:
        'border-cyan-500/30 bg-cyan-900/10 text-white focus:border-cyan-500',
    },
    {
      id: 'precio-grupal-entrenador',
      label:
        'Costo del Servicio Grupal (MXN)',
      Icono: DollarSign,
      type: 'number',
      name: 'groupServicePrice',
      value:
        form.groupServicePrice ?? '',
      placeholder: 'Ej: 299',
      disabled:
        !form.offersGroupService,
      min: '0',
      step: '0.01',
      inputMode: 'decimal',
      claseEtiqueta:
        'font-semibold text-emerald-300',
      claseIcono: 'text-emerald-400',
      claseCampo:
        'border-emerald-500/30 bg-emerald-900/10 text-white focus:border-emerald-500',
    },
  ];
}