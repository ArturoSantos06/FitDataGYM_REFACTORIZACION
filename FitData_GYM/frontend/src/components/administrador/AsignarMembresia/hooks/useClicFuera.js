import { useEffect } from 'react';

export function useClicFuera(ref, alHacerClicFuera) {
  useEffect(() => {
    const manejarClic = (evento) => {
      if (ref.current && !ref.current.contains(evento.target)) {
        alHacerClicFuera();
      }
    };
    document.addEventListener('mousedown', manejarClic);
    return () => document.removeEventListener('mousedown', manejarClic);
  }, [ref, alHacerClicFuera]);
}
