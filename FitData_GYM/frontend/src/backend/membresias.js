import { getUsers, getMembershipTypes, assignMembership } from '../firebase';

export const listarClientes = getUsers;
export const listarTiposMembresia = getMembershipTypes;
export const asignarMembresia = assignMembership;
