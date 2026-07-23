export const DIRECCION_GYM = 'Av. Resurgimiento 611, Bosques de Campeche, 24030 San Francisco de Campeche, Camp.';

export const NAV_ITEMS = [
  { name: 'INICIO', href: '#home' },
  { name: 'NOSOTROS', href: '#about' },
  { name: 'SERVICIOS', href: '#services' },
  { name: 'NOTICIAS', href: '#news' },
  { name: 'CONTACTO', href: '#contact' },
];

export const PERFILES_SELECCION = [
  { label: 'Administrador', descripcion: 'Gestión del sistema', icono: '🛡️', ruta: '/admin', hoverBorde: 'hover:border-purple-500', hoverTexto: 'group-hover:text-purple-400', limpiarToken: true },
  { label: 'Entrenador', descripcion: 'Gestión de rutinas', icono: '🏋️', ruta: '/entrenador', hoverBorde: 'hover:border-blue-500', hoverTexto: 'group-hover:text-blue-400' },
  { label: 'Nutriólogo', descripcion: 'Gestión nutricional y macros', icono: '🥗', ruta: '/nutriologo', hoverBorde: 'hover:border-emerald-500', hoverTexto: 'group-hover:text-emerald-400' },
  { label: 'Cliente', descripcion: '', icono: '💪', ruta: '/cliente', hoverBorde: 'hover:border-cyan-500', hoverTexto: 'group-hover:text-cyan-400' },
];

export const SERVICIOS = [
  {
    title: 'Musculación',
    icon: 'M3 8h3v8H3zM18 8h3v8h-3zM7 12h10',
    color: 'group-hover:text-cyan-400',
    description:
      'Zona completa de peso libre con mancuernas, barras y discos. Máquinas de última generación para trabajar todos los grupos musculares de forma efectiva y segura.',
  },
  {
    title: 'Cardio',
    icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    color: 'group-hover:text-purple-400',
    description:
      'Equipos cardiovasculares de alta tecnología: caminadoras, bicicletas estáticas, elípticas y remos. Monitorea tu ritmo cardíaco y quema calorías eficientemente.',
  },
  {
    title: 'Seguridad',
    icon: 'M12 3l7 4v5c0 5-3.5 8.5-7 9-3.5-.5-7-4-7-9V7l7-4zM9 12l2 2 4-4',
    color: 'group-hover:text-blue-400',
    description:
      'Contamos con cámaras de vigilancia 24/7 y guardia de seguridad en el establecimiento para garantizar un entorno seguro mientras te concentras en tu entrenamiento.',
  },
  {
    title: 'Membresías',
    icon: 'M3 5h18v14H3V5zM3 9h18M6 12h6v4H6v-4z',
    color: 'group-hover:text-cyan-400',
    esLista: true,
    description: [
      { destacado: 'FullData:', texto: 'Acceso los 365 días del año.' },
      { destacado: 'FitData Flex:', texto: 'Acceso por 30 días.' },
      { destacado: 'FitData Study:', texto: 'Acceso por 30 días para estudiantes.' },
      { destacado: 'FitData Day Pass:', texto: 'Acceso todo el día.' },
    ],
  },
  {
    title: 'Duchas',
    icon: 'M12 3v2M12 8v1M8 12h8M9 16l.5 1.5M15 16l-.5 1.5M10 10v2M14 10v2M12 6c-2 0-3 1-3 2h6c0-1-1-2-3-2z',
    color: 'group-hover:text-purple-400',
    description:
      'Regaderas privadas completamente equipadas con agua caliente. Incluye área de vestidores amplios y seguros para tu comodidad después del entrenamiento.',
  },
  {
    title: 'Wifi Gratis',
    icon: 'M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0',
    color: 'group-hover:text-blue-400',
    description:
      'Internet de alta velocidad gratuito en todas nuestras instalaciones. Mantente conectado, escucha tu música favorita o sigue tus rutinas en línea mientras entrenas.',
  },
  {
    title: 'Lockers',
    icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
    color: 'group-hover:text-cyan-400',
    description:
      'Casilleros de seguridad para guardar tus pertenencias mientras entrenas. Sistema de candado personal para tu tranquilidad y la protección de tus objetos de valor.',
  },
  {
    title: 'Horario',
    icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    color: 'group-hover:text-purple-400',
    description:
      'Entrena de Lunes a Viernes de 6:00 AM a 10:00 PM y Sábados de 6:00 AM a 2:00 PM. Domingos nos tomamos un descanso para recargar energías.',
  },
];

export const AVISOS_IMPORTANTES = [
  'Sorteo navideño por gran apertura: 18 de Diciembre, 2025.',
  'Participa para ganar 3 membresías FitData Flex en nuestras redes.',
  'Próximamente: Entrenadores personales en Abril de 2026.',
  'Nuevo descuento del 50% para estudiantes (FitData Study).',
  'Seguridad garantizada: Cámaras y guardia 24/7.',
  'Aviso de horario: Lunes a Sábado (Domingos cerrado).',
];

export const COLORES_EVENTO = {
  cyan: {
    blur: 'bg-cyan-500',
    borde: 'group-hover:border-cyan-400',
    texto: 'group-hover:text-cyan-400',
    fechaTexto: 'text-cyan-400',
  },
  purple: {
    blur: 'bg-purple-400',
    borde: 'group-hover:border-purple-400',
    texto: 'group-hover:text-purple-400',
    fechaTexto: 'text-purple-400',
  },
  blue: {
    blur: 'bg-blue-500',
    borde: 'group-hover:border-blue-400',
    texto: 'group-hover:text-blue-400',
    fechaTexto: 'text-blue-400',
  },
};

export const EVENTOS = [
  {
    imagen: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000',
    alt: 'Inauguración',
    titulo: 'Gran Inauguración FitData',
    fecha: 'Jueves 4 de Diciembre, 2025',
    color: 'cyan',
    descripcion:
      '¡El día ha llegado! Acompáñanos en el corte de listón oficial. Tendremos DJ en vivo, bocadillos saludables, retos flash con premios y acceso gratuito a todas las instalaciones durante el evento. ¡No faltes!',
    invertido: false,
  },
  {
    imagen: 'https://images.unsplash.com/photo-1512909006721-3d6018887383?q=80&w=1000',
    alt: 'Sorteo Navideño',
    titulo: 'Sorteo navideño por apertura',
    fecha: 'Jueves 18 de diciembre, 2025',
    color: 'purple',
    descripcion:
      'Por gran apertura, FitData GYM sorteará 3 membresías FitData Flex, siguiéndonos en nuestras redes sociales y compartiendo la publicación de gran inauguración.',
    invertido: true,
  },
  {
    imagen: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000',
    alt: 'Entrenador Personal',
    titulo: 'Próximamente entrenadores personales',
    fecha: '28 de Febrero, 2026',
    color: 'blue',
    descripcion:
      'En Abril del 2026 implementaremos entrenadores certificados para sesiones personalizadas o grupales. ¡Prepárate para llevar tu entrenamiento al siguiente nivel con la guía experta de nuestros profesionales!',
    invertido: false,
  },
];

export const FOOTER_NAV_ITEMS = [
  { label: 'Inicio', href: '#home' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Noticias', href: '#news' },
  { label: 'Clases', href: '#classes' },
  { label: 'Contacto', href: '#contact' },
];

export const FORM_CONTACTO_INICIAL = {
  nombre: '',
  apellidos: '',
  telefono: '',
  email: '',
  mensaje: '',
};
