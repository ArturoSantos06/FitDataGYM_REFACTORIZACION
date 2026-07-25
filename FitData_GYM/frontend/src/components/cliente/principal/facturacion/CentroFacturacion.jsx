import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FileText, Loader, AlertCircle } from 'lucide-react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../../firebase/config';
import { getSales, getCurrentUser } from '../../../../firebase';
import { toDate } from '../tiendaUtils';
import { EMPTY_SALES } from './facturacionUtils';
import FiltrosFacturacion from './FiltrosFacturacion';
import VentaFacturaCard from './VentaFacturaCard';

function CentroFacturacion({ ventasIniciales = EMPTY_SALES }) {
  const [ventas, setVentas] = useState(ventasIniciales);
  const [loading, setLoading] = useState(!ventasIniciales?.length);
  const [generating, setGenerating] = useState({});
  const [error, setError] = useState('');
  const [filterMes, setFilterMes] = useState('all');
  const [filterAnio, setFilterAnio] = useState('all');

  const currentUser = getCurrentUser();
  const userId = currentUser?.uid || '';
  const userEmail = currentUser?.email || '';

  const refreshVentas = useCallback(async () => {
    if (!userId && !userEmail) return [];

    const filters = [
      userId ? { userId } : null,
      userEmail ? { userEmail } : null,
    ].filter(Boolean);
    const results = await Promise.allSettled(filters.map((filter) => getSales(filter)));
    const salesById = new Map();

    results.forEach((result) => {
      if (result.status !== 'fulfilled' || !result.value?.success) return;
      (result.value.data || []).forEach((sale) => {
        if (sale?.id) salesById.set(sale.id, sale);
      });
    });

    const userSales = Array.from(salesById.values());
    setVentas(userSales);
    return userSales;
  }, [userEmail, userId]);

  useEffect(() => {
    if (ventasIniciales?.length) {
      setVentas(ventasIniciales);
      setLoading(false);
      return;
    }

    const loadVentas = async () => {
      setLoading(true);
      try {
        await refreshVentas();
      } catch (err) {
        setError('Error cargando historial de compras');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userId || userEmail) {
      loadVentas();
    } else {
      setLoading(false);
    }
  }, [refreshVentas, userEmail, userId, ventasIniciales]);

  const handleGenerarFactura = async (ventaId) => {
    setGenerating(prev => ({ ...prev, [ventaId]: true }));
    setError('');

    try {
      if (!userId) {
        throw new Error('No hay sesión activa para solicitar factura');
      }

      await addDoc(collection(db, 'facturaRequests'), {
        ventaId: String(ventaId),
        requesterUid: String(userId),
        requesterEmail: String(userEmail).toLowerCase(),
        status: 'pending',
        createdAt: serverTimestamp(),
        requestedFrom: 'client-store'
      });

      let generated = false;
      for (let attempt = 0; attempt < 5; attempt += 1) {
        // Espera breve mientras la Cloud Function procesa la solicitud
        await new Promise((resolve) => setTimeout(resolve, 1800));
        const updatedSales = await refreshVentas();
        const target = updatedSales.find((sale) => String(sale.id) === String(ventaId));
        if (target?.factura_estado === 'generada' && target?.factura_url) {
          generated = true;
          break;
        }
      }

      if (!generated) {
        console.log('Solicitud de factura enviada; sigue en proceso en servidor.');
      }
    } catch (err) {
      console.error('Error generando factura:', err);
      setError(`Error generando factura: ${err.message}`);
    } finally {
      setGenerating(prev => ({ ...prev, [ventaId]: false }));
    }
  };

  const handleDescargarFactura = (factura_url) => {
    window.open(factura_url, '_blank', 'noopener,noreferrer');
  };

  const ventasFiltradas = useMemo(() => ventas.filter(venta => {
    const fecha = toDate(venta.fecha);
    const mes = fecha.getMonth() + 1;
    const anio = fecha.getFullYear();

    const mesOK = filterMes === 'all' || mes === Number(filterMes);
    const anioOK = filterAnio === 'all' || anio === Number(filterAnio);

    return mesOK && anioOK;
  }), [filterAnio, filterMes, ventas]);

  return (
    <div className="w-full space-y-6">
      {/* Encabezado */}
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <FileText size={32} className="text-cyan-400" />
          Centro de Facturación
        </h2>
        <p className="text-slate-400 mt-2">Descarga y gestiona tus facturas</p>
      </div>

      <FiltrosFacturacion
        mes={filterMes}
        anio={filterAnio}
        onMesChange={setFilterMes}
        onAnioChange={setFilterAnio}
      />

      {/* Error */}
      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="text-red-400 shrink-0 mt-1" size={20} />
          <div>
            <h3 className="font-semibold text-red-400">Error</h3>
            <p className="text-red-200 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* Listado de ventas */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="animate-spin text-cyan-400" size={32} />
        </div>
      ) : ventasFiltradas.length === 0 ? (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-8 text-center">
          <FileText className="mx-auto text-slate-600 mb-3" size={48} />
          <p className="text-slate-400 text-lg">No hay compras en este período</p>
        </div>
      ) : (
        <div className="space-y-3">
          {ventasFiltradas.map((venta) => (
            <VentaFacturaCard
              key={venta.id}
              venta={venta}
              isGenerating={generating[venta.id]}
              onGenerate={handleGenerarFactura}
              onDownload={handleDescargarFactura}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default CentroFacturacion;
