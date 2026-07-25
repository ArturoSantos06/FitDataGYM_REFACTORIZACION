import { useState } from 'react';
import { PLACEHOLDER_IMAGEN } from '../contenido';

function resolverUrlImagen(imageUrl) {
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') return PLACEHOLDER_IMAGEN;
  return imageUrl;
}

export default function useTarjetaProducto(producto) {
  const [cantidad, setCantidad] = useState(1);
  const [imgSrc, setImgSrc] = useState(resolverUrlImagen(producto.imagen || producto.image));

  const incrementar = () => {
    if (cantidad < producto.stock) setCantidad(cantidad + 1);
  };
  const decrementar = () => {
    if (cantidad > 1) setCantidad(cantidad - 1);
  };
  const handleImageError = () => setImgSrc(PLACEHOLDER_IMAGEN);

  return { cantidad, imgSrc, incrementar, decrementar, handleImageError };
}
