// Información de la boda
export const WEDDING_INFO = {
  groomName: "Enrique",
  brideName: "Johanna",
  date: "25 de Octubre, 2025",
  time: "5:00 PM",
  venue: "Jardín Los Robles",
  address: "Calle Principal #123, Bogotá",
  hashtag: "#JohannaYEnrique2025",
  phoneContact: "+57 300 123 4567",
  email: "johanna.enrique.2025@gmail.com",
};

// Duración de animaciones (en ms)
export const ANIMATION_DURATIONS = {
  loading: 3000,
  envelopeOpen: 1500,
  fadeIn: 1000,
  slideUp: 800,
  heartBeat: 1500,
  pageTransition: 600,
};

// Breakpoints para responsive
export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

// Colores del tema (sincronizados con Tailwind)
export const COLORS = {
  wedding: {
    navy: "#1a3a52",
    gold: "#d4a574",
    cream: "#fdf6f0",
    white: "#ffffff",
    gray: {
      light: "#f5f5f5",
      medium: "#e5e5e5",
      dark: "#333333",
    },
  },
};

// URLs de recursos
export const ASSET_URLS = {
  sounds: {
    envelopeOpen: "/sounds/envelope-open.mp3",
    backgroundMusic: "/sounds/wedding-bg.mp3",
    click: "/sounds/click.mp3",
  },
  images: {
    envelopeTexture: "/images/envelope-texture.png",
    paperTexture: "/images/paper-texture.jpg",
    floralPattern: "/images/floral-pattern.svg",
    couplePhoto: "/images/couple-photo.jpg",
  },
};

// Mensajes y textos
export const MESSAGES = {
  loading: "Preparando tu invitación...",
  welcome:
    'Después de tantas aventuras juntos, hemos decidido dar el "sí" definitivo',
  invitation:
    "Nos encantaría contar con ustedes para celebrar este día tan especial",
  saveTheDate: "NOS CASAMOS!",
  confirmAttendance: "Confirmar Asistencia",
  viewDetails: "Ver Detalles de la Invitación",
  thankYou: "Gracias por compartir este momento con nosotros",
};

// Configuración de la cuenta regresiva
export const COUNTDOWN_CONFIG = {
  targetDate: "2025-10-25T17:00:00",
  updateInterval: 60000, // Actualizar cada minuto
  showSeconds: false,
};

// Secciones del timeline
export const TIMELINE_EVENTS = [
  { time: "4:30 PM", event: "Llegada de invitados" },
  { time: "5:00 PM", event: "Ceremonia religiosa" },
  { time: "6:30 PM", event: "Cocktail de bienvenida" },
  { time: "7:00 PM", event: "Recepción y cena" },
  { time: "9:00 PM", event: "Primer baile" },
  { time: "10:00 PM", event: "Fiesta" },
  { time: "2:00 AM", event: "Fin del evento" },
];

// Información de las secciones
export const INVITATION_SECTIONS = [
  {
    id: "ceremony",
    title: "Ceremonia",
    icon: "💒",
    details: {
      time: "5:00 PM",
      location: "Iglesia San José",
      address: "Calle 100 #15-20, Bogotá",
      note: "Por favor llegar 15 minutos antes",
    },
  },
  {
    id: "reception",
    title: "Recepción",
    icon: "🥂",
    details: {
      time: "7:00 PM",
      location: WEDDING_INFO.venue,
      address: WEDDING_INFO.address,
      note: "Cocktail de bienvenida a las 6:30 PM",
    },
  },
  {
    id: "dress-code",
    title: "Dress Code",
    icon: "👗",
    details: {
      style: "Formal Elegante",
      colors: "Evitar blanco y negro completo",
      suggestion: "Colores pasteles bienvenidos",
      note: "Black tie opcional",
    },
  },
  {
    id: "gifts",
    title: "Regalos",
    icon: "🎁",
    details: {
      message: "Tu presencia es nuestro mejor regalo",
      option1: "Luna de miel",
      option2: "Lluvia de sobres",
      note: "Lista de regalos disponible en Falabella",
    },
  },
];
