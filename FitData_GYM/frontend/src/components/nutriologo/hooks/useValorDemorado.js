import { useEffect, useState } from 'react';

export default function useValorDemorado(valor, demora = 250) {
  const [valorDemorado, setValorDemorado] = useState(valor);

  useEffect(() => {
    const temporizador = setTimeout(() => {
      setValorDemorado(valor);
    }, demora);

    return () => clearTimeout(temporizador);
  }, [demora, valor]);

  return valorDemorado;
}
