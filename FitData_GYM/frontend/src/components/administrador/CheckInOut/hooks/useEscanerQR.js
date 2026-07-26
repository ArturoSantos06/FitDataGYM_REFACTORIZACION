import { useState, useEffect, useRef, useCallback } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { checkInMember, checkOutMember } from '../../../../firebase';

export default function useEscanerQR(onExito) {
  const [scanning, setScanning] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const html5QrcodeRef = useRef(null);

  const procesarQR = useCallback(async (qrCode) => {
    if (!qrCode) return;

    setScanning(false);
    setError('');
    setMensaje('');

    try {
      let result = await checkInMember(qrCode);

      if (!result.success && result.hasActiveCheckIn) {
        result = await checkOutMember(qrCode);
      }

      if (result.success) {
        setMensaje(
          result.tiempo_en_gym
            ? `${result.message} - Tiempo en gym: ${result.tiempo_en_gym}`
            : result.message
        );
        onExito?.();
        setManualCode('');
      } else if (result.error?.includes('vencida') || result.error?.includes('inexistente')) {
        setError(`🚫 ${result.error} ${result.miembro ? '- ' + result.miembro : ''}`);
      } else {
        setError(result.error || 'Error procesando solicitud');
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.');
      console.error(err);
    }
  }, [onExito]);

  const stopScanner = useCallback(async () => {
    if (html5QrcodeRef.current?.isScanning) {
      try {
        await html5QrcodeRef.current.stop();
        html5QrcodeRef.current = null;
      } catch (err) {
        console.error('Error deteniendo escáner:', err);
      }
    }
    setScanning(false);
  }, []);

  useEffect(() => {
    const startScanner = async () => {
      if (scanning && !html5QrcodeRef.current) {
        try {
          html5QrcodeRef.current = new Html5Qrcode('qr-reader');

          await html5QrcodeRef.current.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              procesarQR(decodedText);
              stopScanner();
            },
            () => {}
          );
        } catch (err) {
          console.error('Error iniciando escáner:', err);
          setError('No se pudo acceder a la cámara. Verifica los permisos.');
          setScanning(false);
        }
      }
    };

    startScanner();

    return () => {
      if (html5QrcodeRef.current?.isScanning) {
        html5QrcodeRef.current.stop().catch(console.error);
      }
    };
  }, [scanning, procesarQR, stopScanner]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualCode.trim()) {
      procesarQR(manualCode.trim());
    }
  };

  return {
    scanning,
    setScanning,
    stopScanner,
    manualCode,
    setManualCode,
    handleManualSubmit,
    mensaje,
    error,
  };
}
