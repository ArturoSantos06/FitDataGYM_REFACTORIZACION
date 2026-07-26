import { memo } from 'react';

function TarjetaMiembro({ miembro }) {
  const mostrarAvatarFallback = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.innerHTML = `<div class="w-full h-full bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-3xl font-bold text-white">${miembro.avatar}</div>`;
  };

  return (
    <div className="group">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all duration-300">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.4)] group-hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all border-4 border-cyan-500">
          <img src={miembro.image} alt={miembro.name} className="w-full h-full object-cover scale-110" onError={mostrarAvatarFallback} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{miembro.name}</h3>
        <p className="text-gray-400 text-sm">{miembro.role}</p>
      </div>
    </div>
  );
}

export default memo(TarjetaMiembro);
