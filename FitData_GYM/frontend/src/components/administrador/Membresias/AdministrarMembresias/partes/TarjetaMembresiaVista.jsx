import { memo } from 'react';

const CLASES_BOTON = {
  editar: 'px-5 py-2 bg-amber-500 text-black font-bold rounded-full hover:bg-amber-400 transition-all shadow-lg text-sm',
  borrar: 'px-5 py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-500 transition-all shadow-lg text-sm',
};

function TarjetaMembresiaVista({
  membresia,
  obtenerUrlImagen,
  activo,
  onClick,
  onEditar,
  onBorrar,
}) {
  const urlImagen = obtenerUrlImagen(membresia.image);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick(membresia.id);
      }}
      className={`group w-full aspect-video relative rounded-xl overflow-hidden shadow-2xl cursor-pointer bg-black border border-gray-800 transition-transform hover:-translate-y-1 ${activo ? 'ring-2 ring-purple-400' : ''}`}
    >
      {urlImagen ? (
        <img src={urlImagen} alt={membresia.name} className="w-full h-full object-contain" />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">Sin Imagen</div>
      )}

      <div
        className={`absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-opacity duration-300 ${
          activo ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none group-hover:opacity-100'
        }`}
      >
        <div className="text-center px-4">
          <h3 className="text-white font-bold text-lg uppercase tracking-widest mb-1">{membresia.name}</h3>
          <p className="text-cyan-400 font-bold text-xl">${membresia.price}</p>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEditar(membresia, e);
            }}
            className={CLASES_BOTON.editar}
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBorrar(membresia.id, e);
            }}
            className={CLASES_BOTON.borrar}
          >
            Borrar
          </button>
        </div>

        <p className="text-[10px] text-gray-500 mt-2 hidden md:block">(Clic de nuevo para cerrar)</p>
      </div>
    </div>
  );
}

export default memo(TarjetaMembresiaVista);