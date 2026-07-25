import {
  dividirNombre,
  normalizarTipoContrato,
} from '../../../../backend/perfilEntrenadorUtilidades';

export const CLASE_INPUT =
  'w-full rounded-lg border border-slate-700 bg-slate-950 p-3 pl-10 text-slate-300 outline-none transition-all focus:ring-2 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50';

export const CLASE_LABEL =
  'mb-1 ml-1 block text-sm font-medium text-slate-400';

const CAMPOS_PRECIO = new Set([
  'trainerServicePrice',
  'personalServicePrice',
  'groupServicePrice',
]);

function obtenerPrecioBase(usuario = {}) {
  return (
    usuario.trainerServicePrice ??
    usuario.servicePrice ??
    usuario.costoServicio ??
    usuario.costo_servicio ??
    ''
  );
}

function limpiarPrecio(valor = '') {
  const valorLimpio = String(valor)
    .replace(',', '.')
    .replace(/[^0-9.]/g, '');

  const partes = valorLimpio.split('.');

  if (partes.length <= 2) {
    return valorLimpio;
  }

  const parteEntera = partes.shift();

  return `${parteEntera}.${partes.join('')}`;
}

export function crearFormularioInicial(
  usuario = {},
) {
  const nombres =
    dividirNombre(usuario) || {};

  const precioBase =
    obtenerPrecioBase(usuario);

  return {
    ...usuario,

    firstName:
      usuario.firstName ||
      nombres.firstName ||
      '',

    lastName:
      usuario.lastName ||
      nombres.lastName ||
      '',

    telefono:
      usuario.telefono ||
      usuario.phone ||
      '',

    contractType: normalizarTipoContrato(
      usuario.contractType ||
        usuario.tipoContrato ||
        usuario.contract_type ||
        usuario.tipo_contrato ||
        '',
    ),

    offersPersonalService: Boolean(
      usuario.offersPersonalService ??
        usuario.offers_personal_service ??
        false,
    ),

    offersGroupService: Boolean(
      usuario.offersGroupService ??
        usuario.offers_group_service ??
        false,
    ),

    personalServicePrice: String(
      usuario.personalServicePrice ??
        usuario.personal_service_price ??
        precioBase,
    ),

    groupServicePrice: String(
      usuario.groupServicePrice ??
        usuario.group_service_price ??
        precioBase,
    ),

    rfc:
      usuario.rfc ||
      usuario.RFC ||
      '',

    clabe:
      usuario.clabe ||
      usuario.CLABE ||
      usuario.cuentaBancaria ||
      usuario.numeroCuenta ||
      usuario.accountNumber ||
      '',
  };
}

export function obtenerValorCampo(evento) {
  const {
    name,
    value,
    type,
    checked,
  } = evento.target;

  if (type === 'checkbox') {
    return checked;
  }

  if (name === 'telefono') {
    return String(value)
      .replace(/\D/g, '')
      .slice(0, 10);
  }

  if (name === 'clabe') {
    return String(value)
      .replace(/\D/g, '')
      .slice(0, 18);
  }

  if (name === 'rfc') {
    return String(value)
      .toUpperCase()
      .replace(/[^A-Z0-9&Ñ]/g, '')
      .slice(0, 13);
  }

  if (CAMPOS_PRECIO.has(name)) {
    return limpiarPrecio(value);
  }

  return value;
}

export function validarFormularioPerfil(
  formulario = {},
) {
  const rfc = String(
    formulario.rfc ?? '',
  )
    .trim()
    .toUpperCase();

  const clabe = String(
    formulario.clabe ?? '',
  ).replace(/\D/g, '');

  const precioPersonal = Number(
    String(
      formulario.personalServicePrice ?? '',
    ).replace(',', '.'),
  );

  const precioGrupal = Number(
    String(
      formulario.groupServicePrice ?? '',
    ).replace(',', '.'),
  );

  if (
    rfc &&
    rfc.length !== 12 &&
    rfc.length !== 13
  ) {
    return 'El RFC debe tener 12 o 13 caracteres.';
  }

  if (clabe && clabe.length !== 18) {
    return 'La CLABE debe tener 18 dígitos.';
  }

  if (
    !formulario.offersPersonalService &&
    !formulario.offersGroupService
  ) {
    return 'Debes habilitar al menos un tipo de servicio.';
  }

  if (
    formulario.offersPersonalService &&
    (!Number.isFinite(precioPersonal) ||
      precioPersonal <= 0)
  ) {
    return 'Define un precio válido para el servicio personal.';
  }

  if (
    formulario.offersGroupService &&
    (!Number.isFinite(precioGrupal) ||
      precioGrupal <= 0)
  ) {
    return 'Define un precio válido para el servicio grupal.';
  }

  return '';
}

export function prepararDatosParaGuardar(
  formulario = {},
) {
  return {
    ...formulario,

    rfc: String(formulario.rfc ?? '')
      .trim()
      .toUpperCase(),

    clabe: String(formulario.clabe ?? '')
      .replace(/\D/g, '')
      .slice(0, 18),

    telefono: String(
      formulario.telefono ?? '',
    )
      .replace(/\D/g, '')
      .slice(0, 10),

    personalServicePrice: limpiarPrecio(
      formulario.personalServicePrice,
    ),

    groupServicePrice: limpiarPrecio(
      formulario.groupServicePrice,
    ),
  };
}