import { useState } from 'react';

export const useModalExpediente = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [viewingCita, setViewingCita] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [notaPrevia, setNotaPrevia] = useState('');
  const [showPastDateModal, setShowPastDateModal] = useState(false);

  const handleDateClick = (arg) => {
    const date = new Date(arg.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Bloquear fechas pasadas
    if (date < today) {
      setShowPastDateModal(true);
      return;
    }

    // Bloquear domingos (día 0)
    if (date.getDay() === 0) {
      return;
    }
    
    setSelectedDate(arg.dateStr);
  };

  return {
    selectedDate, setSelectedDate,
    viewingCita, setViewingCita,
    dialog, setDialog,
    notaPrevia, setNotaPrevia,
    showPastDateModal, setShowPastDateModal,
    handleDateClick
  };
};