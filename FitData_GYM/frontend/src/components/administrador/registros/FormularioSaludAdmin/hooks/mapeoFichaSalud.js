export const FORM_INICIAL = {
  edad: '',
  condicionCorazon: false,
  presionAlta: false,
  lesionesRecientes: false,
  medicamentos: false,
  comentarios: '',
};

export function perfilAFormData(hp) {
  return {
    edad: hp.age ?? hp.edad ?? '',
    condicionCorazon: hp.heart_condition || false,
    presionAlta: hp.high_blood_pressure || false,
    lesionesRecientes: hp.recent_injuries || false,
    medicamentos: hp.medications || false,
    comentarios: hp.additional_info || '',
  };
}

export function formDataAPerfilPayload({ memberId, memberName, miembroEmail, formData }) {
  return {
    memberId,
    memberName: memberName || miembroEmail,
    userIdDisplay: memberId,
    age: formData.edad ? parseInt(formData.edad, 10) : null,
    heart_condition: formData.condicionCorazon,
    high_blood_pressure: formData.presionAlta,
    recent_injuries: formData.lesionesRecientes,
    medications: formData.medicamentos,
    additional_info: formData.comentarios,
  };
}
