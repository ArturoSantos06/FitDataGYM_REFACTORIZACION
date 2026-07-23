import { memo } from 'react';
import CampoFormulario from '../../../partes/reutilizables/CampoFormulario';
import SelectRegistro from './SelectRegistro';
import BotonEnviarRegistro from './BotonEnviarRegistro';
import { FIELD_CLASS, LABEL_CLASS, CARD_CLASS, CONTRACT_TYPE_OPTIONS, TRAINER_SPECIALTY_OPTIONS } from '../contenido';

function FormularioEntrenadorVista({ formData, onCambio, cargando, onEnviar }) {
  return (
    <form onSubmit={onEnviar} className="grid grid-cols-12 gap-4 md:gap-5">
      <section className={`${CARD_CLASS} col-span-12`}>
        <h3 className="text-sm font-bold text-slate-200 mb-3">Datos personales</h3>
        <div className="grid grid-cols-12 gap-4">
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Nombre de Usuario"
            type="text"
            name="username"
            value={formData.username}
            onChange={onCambio}
            required
          />
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Correo Electrónico"
            type="email"
            name="email"
            value={formData.email}
            onChange={onCambio}
            required
          />
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Nombre(s)"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={onCambio}
            required
          />
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Apellidos"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={onCambio}
            required
          />
          <SelectRegistro
            className="col-span-12 md:col-span-6"
            etiqueta="Tipo de Contrato"
            name="contract_type"
            value={formData.contract_type}
            onChange={onCambio}
            placeholder="-- Selecciona --"
            opciones={CONTRACT_TYPE_OPTIONS}
            required
          />
          <SelectRegistro
            className="col-span-12 md:col-span-6"
            etiqueta="Especialidad"
            name="trainer_specialty"
            value={formData.trainer_specialty}
            onChange={onCambio}
            placeholder="-- Selecciona --"
            opciones={TRAINER_SPECIALTY_OPTIONS}
            required
          />
          {formData.trainer_specialty === 'Otro' && (
            <CampoFormulario
              wrapperClassName="col-span-12"
              labelClassName={LABEL_CLASS}
              inputClassName={FIELD_CLASS}
              etiqueta="Especifica la Especialidad"
              type="text"
              name="trainer_specialty_other"
              value={formData.trainer_specialty_other}
              onChange={onCambio}
              placeholder="Ej: Entrenamiento prenatal"
              required
            />
          )}
        </div>
      </section>

      <section className={`${CARD_CLASS} col-span-12`}>
        <h3 className="text-sm font-bold text-slate-200 mb-3">Acceso</h3>
        <div className="grid grid-cols-12 gap-4">
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={onCambio}
            required
          />
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Confirmar Contraseña"
            type="password"
            name="confirm_password"
            value={formData.confirm_password}
            onChange={onCambio}
            required
          />
        </div>
      </section>

      <div className="col-span-12 mt-1">
        <BotonEnviarRegistro cargando={cargando} textoCargando="Procesando..." texto="Registrar Entrenador" />
      </div>
    </form>
  );
}

export default memo(FormularioEntrenadorVista);
