export const NAV_DESKTOP = [
  { tipo: 'enlace', to: '/admin', label: 'Inicio' },
  { tipo: 'enlace', to: '/admin/registrar', label: 'Registro' },
  { tipo: 'enlace', to: '/admin/asignar', label: 'Renovar Membresías' },
  { tipo: 'enlace', to: '/admin/configuracion', label: 'Creación de Membresía' },
  {
    tipo: 'grupo',
    label: 'Ventas',
    enlaces: [
      { to: '/admin/ventas', label: 'Punto de Venta' },
      { to: '/admin/inventario', label: 'Inventario' },
      { to: '/admin/reportes-facturas', label: 'Reportes de Facturación' },
    ],
  },
  { tipo: 'enlace', to: '/admin/fichas-medicas', label: 'Fichas Médicas' },
  { tipo: 'enlace', to: '/admin/check-in-out', label: 'Check In/Out' },
  {
    tipo: 'grupo',
    label: 'Gestión Servicios',
    enlaces: [
      { to: '/admin/gestion-entrenadores', label: 'Gestión Entrenadores' },
      { to: '/admin/gestion-nutriologos', label: 'Gestión Nutriólogos' },
    ],
  },
  { tipo: 'enlace', to: '/admin/mantenimiento', label: 'Mantenimiento' },
  { tipo: 'enlace', to: '/admin/chatbot', label: 'Chat Bot' },
];

export const NAV_MOVIL = [
  { tipo: 'enlace', to: '/admin', label: 'Inicio' },
  { tipo: 'enlace', to: '/admin/registrar', label: 'Registro' },
  { tipo: 'enlace', to: '/admin/asignar', label: 'Asignar Membresías' },
  { tipo: 'enlace', to: '/admin/configuracion', label: 'Configurar Tipos' },
  {
    tipo: 'grupo',
    id: 'ventas',
    label: 'Ventas',
    emoji: '💰',
    enlaces: [
      { to: '/admin/ventas', label: 'Punto de Venta' },
      { to: '/admin/inventario', label: 'Inventario' },
      { to: '/admin/reportes-facturas', label: 'Reportes de Facturación' },
    ],
  },
  { tipo: 'enlace', to: '/admin/check-in-out', label: 'Check In/Out', emoji: '📱' },
  { tipo: 'enlace', to: '/admin/fichas-medicas', label: 'Fichas Médicas', emoji: '🩺' },
  {
    tipo: 'grupo',
    id: 'servicios',
    label: 'Gestión Servicios',
    emoji: '👥',
    enlaces: [
      { to: '/admin/gestion-entrenadores', label: 'Gestión Entrenadores' },
      { to: '/admin/gestion-nutriologos', label: 'Gestión Nutriólogos' },
    ],
  },
  { tipo: 'enlace', to: '/admin/mantenimiento', label: 'Mantenimiento', emoji: '🛠️' },
  { tipo: 'enlace', to: '/admin/chatbot', label: 'Chat Bot', emoji: '🤖' },
];
