import { useState } from 'react';
import { db } from "../../../firebase/config"; // Ajusta la ruta a tu config de Firebase
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';

export const useModalDetalleNutri = (cita, onClose) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(cita.nota || '');
  const [dialogConfig, setDialogConfig] = useState(null);

  const handleUpdate = async () => {
    try {
      const citaRef = doc(db, "citas", cita.id);
      await updateDoc(citaRef, { nota: editContent });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      setDialogConfig({ 
        type: 'danger', 
        title: 'Error', 
        message: 'No se pudo actualizar la nota.', 
        onConfirm: () => setDialogConfig(null) 
      });
    }
  };

  const confirmDelete = () => {
    setDialogConfig({
      type: 'danger',
      title: 'Eliminar Cita',
      message: '¿Estás seguro de que deseas borrar este registro? Esta acción no se puede deshacer.',
      onConfirm: async () => {
        try {
            await deleteDoc(doc(db, "citas", cita.id));
            setDialogConfig(null);
            onClose();
        } catch (err) {
             console.error(err);
             setDialogConfig({ 
                 type: 'danger', 
                 title: 'Error', 
                 message: 'No se pudo eliminar la cita.', 
                 onConfirm: () => setDialogConfig(null) 
               });
        }
      },
      onCancel: () => setDialogConfig(null)
    });
  };

  return {
    isEditing,
    setIsEditing,
    editContent,
    setEditContent,
    dialogConfig,
    handleUpdate,
    confirmDelete
  };
};