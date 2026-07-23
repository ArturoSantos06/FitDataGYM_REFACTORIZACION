import { memo } from 'react';
import CampoFormulario from '../../../partes/reutilizables/CampoFormulario';
import SelectRegistro from './SelectRegistro';
import BotonEnviarRegistro from './BotonEnviarRegistro';
import { FIELD_CLASS, LABEL_CLASS, CARD_CLASS, SEXO_OPTIONS, PAYMENT_METHOD_OPTIONS } from '../contenido';

function FormularioClienteVista({
  formData,
  onCambio,
  membresias,
  montoRecibido,
  onCambioMonto,
  cambio,
  cargando,
  onEnviar,
}) {
  const registroMembresia = membresias.find((m) => m.id === formData.membership_id);
  const precioSeleccionado = registroMembresia?.price || 0;

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
          <CampoFormulario
            wrapperClassName="col-span-12 md:col-span-6"
            labelClassName={LABEL_CLASS}
            inputClassName={FIELD_CLASS}
            etiqueta="Teléfono (10 dígitos)"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onCambio}
            pattern="[0-9]{10}"
            maxLength={10}
            required
          />
          <SelectRegistro
            className="col-span-12 md:col-span-6"
            etiqueta="Sexo"
            name="sexo"
            value={formData.sexo}
            onChange={onCambio}
            placeholder="-- Selecciona --"
            opciones={SEXO_OPTIONS}
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
            etiqueta="Contraseña Temporal"
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

      <section className={`${CARD_CLASS} col-span-12 border-cyan-500/30 bg-cyan-950/15`}>
        <h3 className="text-lg font-black tracking-tight text-cyan-300 mb-3">Asignación Inicial</h3>

        <div className="grid grid-cols-12 gap-4">
          <SelectRegistro
            className="col-span-12 md:col-span-6"
            etiqueta="Membresía"
            name="membership_id"
            value={formData.membership_id}
            onChange={onCambio}
            placeholder="-- Selecciona --"
            opciones={membresias.map((m) => ({ value: m.id, label: `${m.name} - $${m.price}` }))}
            required
          />
          <SelectRegistro
            className="col-span-12 md:col-span-6"
            etiqueta="Método de Pago"
            name="payment_method"
            value={formData.payment_method}
            onChange={onCambio}
            opciones={PAYMENT_METHOD_OPTIONS}
          />
        </div>

        {formData.membership_id && (
          <div className="mt-4 rounded-lg bg-slate-950/40 p-4 border-b border-slate-600/40">
            <div className="grid grid-cols-12 items-center gap-3 mb-3">
              <span className="col-span-12 md:col-span-4 text-gray-400 text-xs uppercase font-bold tracking-wider">
                Total a Cobrar
              </span>
              <span className="col-span-8 md:col-span-4 text-2xl font-black text-emerald-400">
                ${precioSeleccionado.toFixed(2)}
              </span>
              <span className="col-span-4 md:col-span-4 text-right text-xs text-slate-500">IVA incluido</span>
            </div>

            {formData.payment_method === 'EFECTIVO' && (
              <div className="border-t border-slate-700 pt-3 animate-fade-in">
                <div className="grid grid-cols-12 gap-3 items-center mb-2">
                  <label className="col-span-12 md:col-span-4 text-sm font-semibold text-slate-300">Dinero Recibido</label>
                  <input
                    type="number"
                    value={montoRecibido}
                    onChange={onCambioMonto}
                    className="col-span-12 md:col-span-8 bg-slate-900 border border-slate-500 rounded-lg px-4 py-2.5 text-white text-right font-mono text-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex justify-between items-center rounded-lg bg-black/25 px-3 py-2">
                  <span className="text-sm font-bold text-slate-400">Cambio</span>
                  <span className={`text-xl font-black font-mono ${cambio < 0 ? 'text-red-400' : 'text-yellow-300'}`}>
                    ${cambio.toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <div className="col-span-12 mt-1">
        <BotonEnviarRegistro cargando={cargando} textoCargando="Procesando..." texto="Registrar y Asignar" />
      </div>
    </form>
  );
}

export default memo(FormularioClienteVista);
