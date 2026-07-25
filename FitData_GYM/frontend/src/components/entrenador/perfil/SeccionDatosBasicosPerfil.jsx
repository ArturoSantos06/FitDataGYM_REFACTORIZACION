import CampoDatosBasicosPerfil from './seccion-datos-basicos/CampoDatosBasicosPerfil';

import {
  crearCamposDatosBasicos,
} from './seccion-datos-basicos/camposDatosBasicosPerfil';

function SeccionDatosBasicosPerfil({
  form = {},
  trainerCode = '',
  inputClass = '',
  labelClass = '',
  onChange,
}) {
  const campos = crearCamposDatosBasicos({
    form,
    trainerCode,
  });

  return (
    <section
      aria-label="Datos básicos del entrenador"
      className="grid gap-6 md:grid-cols-2"
    >
      {campos.map((campo) => (
        <CampoDatosBasicosPerfil
          key={campo.id}
          campo={campo}
          inputClass={inputClass}
          labelClass={labelClass}
          onChange={onChange}
        />
      ))}
    </section>
  );
}

export default SeccionDatosBasicosPerfil;