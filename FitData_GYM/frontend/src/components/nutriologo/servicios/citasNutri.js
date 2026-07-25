import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase/config';

export const actualizarNotaCita = (idCita, nota) =>
  updateDoc(doc(db, 'citas', idCita), { nota });

export const eliminarCitaNutriologo = (idCita) =>
  deleteDoc(doc(db, 'citas', idCita));
