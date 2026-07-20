function TarjetaEstado({
  titulo,
  activo,
  textoActivo = 'SÍ',
  textoInactivo = 'NO',
  colorActivo = 'red',
}) {
  const estilosActivos = {
    red: 'border-red-500 bg-red-900/30',
    orange: 'border-orange-800 bg-orange-900/20',
    yellow: 'border-yellow-800 bg-yellow-900/20',
  };

  return (
    <div
      className={`rounded-lg border p-3 ${
        activo
          ? estilosActivos[colorActivo]
          : 'border-transparent bg-slate-800'
      }`}
    >
      <p className="text-xs text-slate-400">{titulo}</p>

      <p
        className={`text-lg font-bold ${
          activo && colorActivo === 'red'
            ? 'text-red-400'
            : 'text-white'
        }`}
      >
        {activo ? textoActivo : textoInactivo}
      </p>
    </div>
  );
}

function ModalPerfilCliente({ perfil, onCerrar }) {
  if (!perfil) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-xl rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <button
          type="button"
          onClick={onCerrar}
          aria-label="Cerrar ficha"
          className="absolute right-3 top-3 text-xl text-slate-400 hover:text-white"
        >
          ✕
        </button>

        <div className="mb-6 border-b border-slate-700 pb-2">
          <h2 className="text-xl font-bold text-white">
            Cliente: {perfil.memberName || 'Sin nombre'}
          </h2>

          {perfil.userIdDisplay && (
            <p className="mt-1 font-mono text-xs text-cyan-400">
              Expediente ID: {perfil.userIdDisplay}
            </p>
          )}
        </div>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <TarjetaEstado
              titulo="Lesiones Recientes"
              activo={perfil.recent_injuries}
            />

            <TarjetaEstado
              titulo="Condición Cardíaca"
              activo={perfil.heart_condition}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-slate-800 p-3">
              <p className="text-xs text-slate-400">Edad</p>
              <p className="text-lg font-semibold text-white">
                {perfil.age ?? perfil.edad ?? '—'}
              </p>
            </div>

            <TarjetaEstado
              titulo="Presión Alta"
              activo={perfil.high_blood_pressure}
              textoActivo="Sí"
              textoInactivo="No"
              colorActivo="orange"
            />

            <TarjetaEstado
              titulo="Medicado"
              activo={perfil.medications}
              textoActivo="Sí"
              textoInactivo="No"
              colorActivo="yellow"
            />
          </div>

          <div>
            <p className="mb-2 text-xs text-slate-400">
              Notas del Cliente
            </p>

            <div className="min-h-20 whitespace-pre-wrap rounded-lg border border-purple-800/40 bg-purple-950/30 p-3 text-purple-100">
              {perfil.additional_info ||
                'Sin observaciones adicionales.'}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-[10px] italic text-slate-500">
            Última sincronización:{' '}
            {new Date().toLocaleTimeString('es-MX')}
          </span>

          <button
            type="button"
            onClick={onCerrar}
            className="rounded-lg bg-slate-700 px-6 py-2 text-sm font-bold text-white transition-colors hover:bg-slate-600"
          >
            Cerrar ficha
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPerfilCliente;