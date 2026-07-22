import { getUsers, getMembershipTypes, createMembershipType, updateMembershipType, deleteMembershipType, assignMembership, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

export const listarClientes = getUsers;
export const listarTiposMembresia = getMembershipTypes;
export const crearTipoMembresia = createMembershipType;
export const actualizarTipoMembresia = updateMembershipType;
export const eliminarTipoMembresia = deleteMembershipType;
export const asignarMembresia = assignMembership;

export const listarTodasAsignaciones = async () => {
  const snap = await getDocs(collection(db, 'memberships'));
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
