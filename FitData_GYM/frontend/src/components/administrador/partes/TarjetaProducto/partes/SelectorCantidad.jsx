import { memo } from 'react';

function SelectorCantidad({ cantidad, onDecrementar, onIncrementar }) {
  return (
    <div className="flex items-center border border-slate-600 rounded-lg bg-slate-900 h-9 md:h-10 shadow-inner w-fit">
      <button onClick={onDecrementar} className="px-2 md:px-3 h-full text-base md:text-xl text-slate-400 hover:text-white hover:bg-slate-800 rounded-l-lg">
        -
      </button>
      <span className="w-6 md:w-8 text-center font-bold text-white text-xs md:text-sm">{cantidad}</span>
      <button onClick={onIncrementar} className="px-2 md:px-3 h-full text-base md:text-xl text-slate-400 hover:text-white hover:bg-slate-800 rounded-r-lg">
        +
      </button>
    </div>
  );
}

export default memo(SelectorCantidad);
