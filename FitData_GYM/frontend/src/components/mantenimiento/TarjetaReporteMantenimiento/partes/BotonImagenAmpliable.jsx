import { memo } from 'react';

function BotonImagenAmpliable({ src, alt, className, onAmpliar }) {
  return (
    <button type="button" onClick={onAmpliar} className={className}>
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </button>
  );
}

export default memo(BotonImagenAmpliable);
