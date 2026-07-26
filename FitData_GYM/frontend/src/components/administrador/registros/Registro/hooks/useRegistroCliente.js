import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../../../../firebase/config';
import { registerClientByAdmin, createMembershipSale } from '../../../../../firebase';
import useEstadoRegistro from './useEstadoRegistro';
import { SOLO_LETRAS_REGEX, LETRAS_CON_ESPACIOS_REGEX, EMAIL_VALIDO_REGEX } from './validadores';
import { FORM_CLIENTE_INICIAL } from '../contenido';

function validarRegistroCliente(formData) {
  const username = formData.username.trim();
  const firstName = formData.first_name.trim();
  const lastName = formData.last_name.trim();
  const email = formData.email.trim();
  const phone = formData.phone.trim();

  if (!username || username.length < 3) return 'El nombre de usuario debe tener al menos 3 caracteres.';
  if (!SOLO_LETRAS_REGEX.test(username)) return 'El nombre de usuario solo puede contener letras.';
  if (!firstName || !LETRAS_CON_ESPACIOS_REGEX.test(firstName)) return 'El nombre debe contener solo letras.';
  if (!lastName || !LETRAS_CON_ESPACIOS_REGEX.test(lastName)) return 'Los apellidos deben contener solo letras.';
  if (!email || !EMAIL_VALIDO_REGEX.test(email)) return 'Por favor ingresa un correo electrónico válido.';
  if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) return 'El teléfono debe tener exactamente 10 dígitos.';
  if (!formData.sexo) return 'Por favor selecciona un género.';
  if (formData.password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (formData.password !== formData.confirm_password) return 'Las contraseñas no coinciden.';
  if (!formData.membership_id) return 'Por favor selecciona una membresía.';

  return null;
}

export default function useRegistroCliente(onUserRegistered) {
  const estado = useEstadoRegistro();
  const [formData, setFormData] = useState(FORM_CLIENTE_INICIAL);
  const [membresias, setMembresias] = useState([]);
  const [montoRecibido, setMontoRecibido] = useState('');
  const [cambio, setCambio] = useState(0);
  const [mostrarFormularioSalud, setMostrarFormularioSalud] = useState(false);
  const [emailReciente, setEmailReciente] = useState('');

  useEffect(() => {
    const obtenerMembresias = async () => {
      try {
        const q = query(collection(db, 'membershipTypes'));
        const querySnapshot = await getDocs(q);
        setMembresias(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error('Error cargando membresías:', err);
      }
    };
    obtenerMembresias();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'membership_id' && formData.payment_method === 'EFECTIVO') {
      const monto = parseFloat(montoRecibido) || 0;
      const membresia = membresias.find((m) => m.id === value);
      setCambio(monto - (membresia?.price || 0));
    }
  };

  const manejarCambioMonto = (e) => {
    const monto = parseFloat(e.target.value) || 0;
    setMontoRecibido(e.target.value);
    const membresia = membresias.find((m) => m.id === formData.membership_id);
    setCambio(monto - (membresia?.price || 0));
  };

  const cerrarModalExito = () => {
    estado.cerrarExito();
    setMostrarFormularioSalud(false);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const errorValidacion = validarRegistroCliente(formData);
    if (errorValidacion) {
      estado.mostrarError('Validación', errorValidacion);
      return;
    }

    estado.setCargando(true);

    try {
      const result = await registerClientByAdmin({
        email: formData.email.trim(),
        password: formData.password,
        username: formData.username.trim(),
        firstName: formData.first_name.trim(),
        lastName: formData.last_name.trim(),
        phone: formData.phone.trim(),
        membershipTypeId: formData.membership_id,
        paymentMethod: formData.payment_method,
        montoRecibido: parseFloat(montoRecibido) || 0,
        sexo: formData.sexo,
      });

      if (!result?.success) {
        throw new Error(result?.error || 'No se pudo registrar el cliente.');
      }

      const registroMembresia = membresias.find((m) => m.id === formData.membership_id);

      // Compatibilidad: si backend nuevo ya devolvió folio, se usa; si no, se crea venta en cliente.
      const saleResult = result?.data?.saleFolio
        ? { folio: result.data.saleFolio }
        : await createMembershipSale({
            email: formData.email.trim(),
            membership_id: formData.membership_id,
            payment_method: formData.payment_method,
            monto_recibido: parseFloat(montoRecibido) || 0,
            cambio,
          });

      if (!saleResult?.folio) {
        throw new Error('Cliente registrado, pero no se pudo generar folio de venta.');
      }

      setEmailReciente(formData.email.trim());
      estado.mostrarExito(
        `Cliente ${formData.first_name} registrado exitosamente.`,
        `Membresía: ${registroMembresia?.name} | Folio: ${saleResult.folio}`
      );
      setMostrarFormularioSalud(true);
      setFormData(FORM_CLIENTE_INICIAL);
      setMontoRecibido('');
      setCambio(0);
    } catch (err) {
      console.error('Error registrando cliente:', err);
      estado.mostrarError('Error en Registro', err.message || 'No se pudo registrar el cliente. Intenta de nuevo.');
    } finally {
      estado.setCargando(false);
    }
  };

  return {
    estado,
    formData,
    membresias,
    montoRecibido,
    cambio,
    mostrarFormularioSalud,
    emailReciente,
    manejarCambio,
    manejarCambioMonto,
    manejarEnvio,
    cerrarModalExito,
    onFichaSaludGuardada: () => onUserRegistered?.(),
    onFichaSaludCerrar: () => setMostrarFormularioSalud(false),
  };
}
