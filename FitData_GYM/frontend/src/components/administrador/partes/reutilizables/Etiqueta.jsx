import { memo } from 'react';

function Etiqueta({ children, ...props }) {
  return (
    <label className="block text-gray-300" {...props}>
      {children}
    </label>
  );
}

export default memo(Etiqueta);
