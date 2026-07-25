function ResumenGestionEntrenadores({ estadisticas }) {
  const tarjetas = [
    {
      label: 'Clientes con Servicio',
      value: estadisticas.totalClients,
      classes: 'from-blue-900/50 to-blue-800/30 border-blue-700/50 text-blue-300',
    },
    {
      label: 'Servicios Activos',
      value: estadisticas.activeServices,
      classes: 'from-green-900/50 to-green-800/30 border-green-700/50 text-green-300',
    },
    {
      label: 'Total Entrenadores',
      value: estadisticas.totalTrainers,
      classes: 'from-purple-900/50 to-purple-800/30 border-purple-700/50 text-purple-300',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tarjetas.map(({ label, value, classes }) => (
        <div
          key={label}
          className={`bg-linear-to-br ${classes.split(' ').slice(0, 2).join(' ')} p-6 rounded-xl border ${classes.split(' ')[2]} shadow-xl`}
        >
          <p className={`${classes.split(' ')[3]} text-sm font-medium mb-1`}>{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      ))}
    </div>
  );
}

export default ResumenGestionEntrenadores;
