import { useEffect, useState } from 'react';
import {
  getProducts,
  getUser,
  getUserByAuthUid,
  getUserByEmail,
  getSales,
  getCurrentUser,
} from '../../../firebase';
import { toDate } from './tiendaUtils';

const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

const uniqueValues = (values) => Array.from(new Set(values.filter(Boolean)));

const resolveUserFromAuth = async (firebaseUser) => {
  if (!firebaseUser) return null;

  const byAuthUid = await getUserByAuthUid(firebaseUser.uid);
  if (byAuthUid?.success && byAuthUid.data) return byAuthUid.data;

  const byDocId = await getUser(firebaseUser.uid);
  if (byDocId?.success && byDocId.data) return byDocId.data;

  const email = normalizeEmail(firebaseUser.email);
  if (email) {
    const byEmail = await getUserByEmail(email);
    if (byEmail?.success && byEmail.data) return byEmail.data;
  }

  return null;
};

const normalizeProduct = (product) => ({
  id: product.id,
  title: product.nombre || 'Producto',
  price: Number.parseFloat(product.precio) || 0,
  stock: Number.parseInt(product.stock, 10) || 0,
  image: product.imagen || null,
});

const buildSalesFilters = (firebaseUser, userData) => {
  const idCandidates = uniqueValues([
    String(firebaseUser?.uid || '').trim(),
    String(userData?.id || '').trim(),
  ]);

  const emailCandidates = uniqueValues([
    String(firebaseUser?.email || '').trim(),
    normalizeEmail(firebaseUser?.email),
    String(userData?.email || '').trim(),
    normalizeEmail(userData?.email),
  ]);

  const usernameCandidates = uniqueValues([
    String(userData?.username || '').trim(),
  ]);

  return [
    ...idCandidates.map((userId) => ({ userId })),
    ...emailCandidates.map((userEmail) => ({ userEmail })),
    ...usernameCandidates.map((username) => ({ username })),
  ];
};

const loadSales = async (firebaseUser, userData) => {
  if (!firebaseUser) return [];

  const results = await Promise.allSettled(
    buildSalesFilters(firebaseUser, userData).map((filters) => getSales(filters))
  );
  const salesById = new Map();

  results.forEach((result) => {
    if (result.status !== 'fulfilled') return;
    if (!result.value?.success || !Array.isArray(result.value.data)) return;

    result.value.data.forEach((sale) => {
      if (sale?.id) salesById.set(sale.id, sale);
    });
  });

  return Array.from(salesById.values()).sort(
    (a, b) => toDate(b.createdAt) - toDate(a.createdAt)
  );
};

export const useTiendaData = () => {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const [productsResult, currentUser] = await Promise.all([
          getProducts(),
          Promise.resolve(getCurrentUser()),
        ]);

        if (!productsResult?.success) {
          throw new Error(productsResult?.error || 'No se pudieron cargar los productos');
        }

        const userData = currentUser
          ? await resolveUserFromAuth(currentUser)
          : null;
        const loadedSales = await loadSales(currentUser, userData);

        if (!isMounted) return;
        setProducts((productsResult.data || []).map(normalizeProduct));
        setSales(loadedSales);
        setError('');
      } catch (loadError) {
        if (!isMounted) return;
        console.error('Error cargando datos de la tienda:', loadError);
        setError('No se pudieron cargar los datos de la tienda. Intenta nuevamente.');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, sales, loading, error };
};
