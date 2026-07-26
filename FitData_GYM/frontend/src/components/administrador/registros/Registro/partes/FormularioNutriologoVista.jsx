import { memo } from 'react';
import CampoFormulario from '../../../partes/reutilizables/CampoFormulario';
import BotonEnviarRegistro from './BotonEnviarRegistro';
import { FIELD_CLASS, LABEL_CLASS, CARD_CLASS } from '../contenido';

function FormularioNutriologoVista({ formData, onCambio, cargando, onEnviar }) {
  return (
    <form onSubmit={onEnviar} className="grid grid-cols-12 gap-4 md:gap-5">
      <section className={`${CARD_CLASS} col-span-12`}>
        <h3 className="text-sm font-bold text-slate-200 mb-3">Datos personales</h3>
        <div className="grid grid-cols-12 gap-4">
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
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Especialidad"
            type="text"
            name="especialidad"
            value={formData.especialidad}
            onChange={onCambio}
            placeholder="Ej: Nutrición Deportiva"
            required
          />
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
        <BotonEnviarRegistro cargando={cargando} textoCargando="Procesando..." texto="Registrar Nutriólogo" />
      </div>
    </form>
  );
}

export default memo(FormularioNutriologoVista);
