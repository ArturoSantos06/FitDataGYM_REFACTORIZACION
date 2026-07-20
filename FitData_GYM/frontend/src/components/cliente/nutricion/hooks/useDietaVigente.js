import { useState, useEffect, useMemo } from 'react';
import {
  auth,
  getDietFilesByMember,
  getMemberByAuthUid,
  getMemberByUserId,
  getUser,
  getUserByAuthUid,
  descargarDocumentoDieta,
} from '../../../../firebase';

export const useDietaVigente = () => {
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dietFiles, setDietFiles] = useState([]);
  const [error, setError] = useState('');

  const refrescar = () => setRefreshKey((curr) => curr + 1);

  useEffect(() => {
    let isMounted = true;

    const loadDietFiles = async (firebaseUser) => {
      if (!isMounted) return;

      if (!firebaseUser) {
        setDietFiles([]);
        setError('Inicia sesión para consultar tu dieta vigente.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      let resolvedMember = null;
      const byAuthUid = await getMemberByAuthUid(firebaseUser.uid);
      
      if (byAuthUid.success) {
        resolvedMember = byAuthUid.data;
      } else {
        let internalUserId = firebaseUser.uid;
        const byDocId = await getUser(firebaseUser.uid);
        
        if (byDocId.success) {
          internalUserId = byDocId.data.id;
        } else {
          const byAuthUser = await getUserByAuthUid(firebaseUser.uid);
          if (byAuthUser.success) internalUserId = byAuthUser.data.id;
        }

        const memberByUser = await getMemberByUserId(internalUserId);
        if (memberByUser.success) resolvedMember = memberByUser.data;
      }

      if (!isMounted) return;

      if (!resolvedMember?.id) {
        setDietFiles([]);
        setError('No encontramos tu perfil de miembro para mostrar tu dieta.');
        setLoading(false);
        return;
      }

      const filesResult = await getDietFilesByMember(resolvedMember.id);
      if (!isMounted) return;

      if (!filesResult.success) {
        setDietFiles([]);
        setError(filesResult.error || 'No se pudo cargar tu dieta vigente.');
        setLoading(false);
        return;
      }

      setDietFiles(filesResult.data || []);
      setLoading(false);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoading(true);
      loadDietFiles(user);
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [refreshKey]);

  const latestDietFile = useMemo(() => {
    if (!Array.isArray(dietFiles) || dietFiles.length === 0) return null;
    return dietFiles[0];
  }, [dietFiles]);

  const handleOpenDocument = () => {
    if (!latestDietFile?.downloadURL) {
      setError('No se encontró una URL para abrir la dieta en el visor web.');
      return;
    }
    window.open(latestDietFile.downloadURL, '_blank', 'noopener,noreferrer');
  };

  const handleDownloadDocument = async () => {
    if (!latestDietFile) return;
    setDownloading(true);
    setError('');

    const result = await descargarDocumentoDieta(
      latestDietFile.storagePath,
      latestDietFile.originalFileName || latestDietFile.title || 'dieta_vigente',
      latestDietFile.downloadURL || ''
    );

    if (!result.success) {
      setError(result.error || 'No se pudo descargar la dieta vigente.');
    }
    setDownloading(false);
  };

  return {
    loading,
    downloading,
    error,
    latestDietFile,
    refrescar,
    handleOpenDocument,
    handleDownloadDocument
  };
};