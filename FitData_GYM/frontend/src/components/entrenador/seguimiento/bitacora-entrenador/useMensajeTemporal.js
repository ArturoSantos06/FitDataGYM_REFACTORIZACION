import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

function useMensajeTemporal() {
  const [mensaje, setMensaje] = useState({
    tipo: '',
    texto: '',
  });

  const temporizador = useRef(null);

  const limpiarMensaje = useCallback(() => {
    if (temporizador.current) {
      clearTimeout(temporizador.current);
      temporizador.current = null;
    }

    setMensaje({
      tipo: '',
      texto: '',
    });
  }, []);

  const mostrarMensaje = useCallback(
    (tipo, texto) => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }

      setMensaje({
        tipo,
        texto,
      });

      temporizador.current = setTimeout(() => {
        setMensaje({
          tipo: '',
          texto: '',
        });

        temporizador.current = null;
      }, 3000);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

  return {
    mensaje,
    mostrarMensaje,
    limpiarMensaje,
  };
}

export default useMensajeTemporal;