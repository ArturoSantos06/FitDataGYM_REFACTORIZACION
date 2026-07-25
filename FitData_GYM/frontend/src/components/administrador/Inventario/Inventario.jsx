import { useCallback, useEffect, useState } from 'react';
import ErrorModal from '../../modales/ErrorModal';
import ModalExito from '../../modales/ModalExito';
import TablaHistorialEntradas from './TablaHistorialEntradas';
import TablaProductosInventario from './TablaProductosInventario';
import ModalAgregarStock from './ModalAgregarStock';
import {
  createInventoryEntry,
  getCurrentUser,
  getInventoryEntries,
  getProducts,
  getUser,
} from '../../../firebase';

function Inventario() {
  const [productos, setProductos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cantidadAgregar, setCantidadAgregar] = useState('');

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [currentUserName, setCurrentUserName] = useState('Sistema');

  const cargarDatos = useCallback(async () => {
    setIsLoading(true);

    try {
      const [productsResult, entriesResult] = await Promise.all([
        getProducts(),
        getInventoryEntries(),
      ]);

      if (!productsResult.success) {
        throw new Error(productsResult.error || 'No se pudieron cargar los productos');
      }

      if (!entriesResult.success) {
        throw new Error(entriesResult.error || 'No se pudo cargar el historial');
      }

      setProductos(productsResult.data || []);
      setHistorial(entriesResult.data || []);
      setErrorMessage('');
    } catch (error) {
      console.error('Error al cargar el inventario:', error);
      setErrorMessage(error.message || 'No se pudo cargar el inventario');
      setShowError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void cargarDatos();

    const loadUser = async () => {
      const user = getCurrentUser();
      if (!user) return;

      const userResult = await getUser(user.uid);
      if (userResult.success) {
        const userData = userResult.data;
        setCurrentUserName(userData.username || userData.email || 'Sistema');
      }
    };

    void loadUser();
  }, [cargarDatos]);

  const abrirModal = (product) => {
    setSelectedProduct(product);
    setCantidadAgregar('');
    setShowModal(true);
  };

  const cerrarModal = useCallback(({ force = false } = {}) => {
    if (isSaving && !force) return;

    setShowModal(false);
    setSelectedProduct(null);
    setCantidadAgregar('');
  }, [isSaving]);

  const mostrarError = (message) => {
    setErrorMessage(message);
    setShowError(true);
  };

  const guardarEntrada = async (event) => {
    event.preventDefault();

    const cantidad = Number(cantidadAgregar);
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      mostrarError('Ingresa una cantidad entera mayor que cero.');
      return;
    }

    if (!selectedProduct?.id) {
      mostrarError('Selecciona un producto válido antes de guardar.');
      return;
    }

    setIsSaving(true);

    try {
      const result = await createInventoryEntry({
        productoId: selectedProduct.id,
        cantidad,
        usuarioNombre: currentUserName,
      });

      if (!result.success) {
        throw new Error(result.error || 'Error al registrar entrada');
      }

      setSuccessMessage(`¡Stock actualizado! Se agregaron ${cantidad} unidades.`);
      setShowSuccess(true);
      cerrarModal({ force: true });
      await cargarDatos();
    } catch (error) {
      console.error('Error al registrar entrada:', error);
      mostrarError(error.message || 'Error al registrar entrada');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 bg-slate-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-indigo-600">
        Control de Inventario
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <TablaProductosInventario
          productos={productos}
          isLoading={isLoading}
          onAgregar={abrirModal}
        />
        <TablaHistorialEntradas historial={historial} isLoading={isLoading} />
      </div>

      {showModal && selectedProduct && (
        <ModalAgregarStock
          product={selectedProduct}
          quantity={cantidadAgregar}
          isSaving={isSaving}
          onChange={(event) => setCantidadAgregar(event.target.value)}
          onClose={cerrarModal}
          onSubmit={guardarEntrada}
        />
      )}

      <ModalExito
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="¡Actualizado!"
        message={successMessage}
      />
      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title="Error en inventario"
        message={errorMessage}
      />
    </div>
  );
}

export default Inventario;