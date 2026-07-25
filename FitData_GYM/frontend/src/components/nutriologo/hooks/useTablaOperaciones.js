import { useMemo } from 'react';
import {
  crearFilasOperaciones,
  formatearFecha,
  formatearMoneda,
} from '../utils/finanzas';

export default function useTablaOperaciones(ventasPlanes = []) {
  const filas = useMemo(
    () => crearFilasOperaciones(ventasPlanes),
    [ventasPlanes],
  );

  return {
    filas,
    formatearMoneda,
    formatearFecha,
  };
}
