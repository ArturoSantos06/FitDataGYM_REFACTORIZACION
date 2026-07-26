import { useState } from 'react';

export default function useTarjetasVolteadas() {
  const [flippedCards, setFlippedCards] = useState([]);

  const toggleFlip = (index) => {
    setFlippedCards((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  };

  return { flippedCards, toggleFlip };
}
