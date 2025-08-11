// Información de la boda
export interface WeddingDetails {
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  hashtag?: string;
  phoneContact?: string;
  email?: string;
}

// Estado del sobre
export interface EnvelopeState {
  isOpen: boolean;
  isAnimating: boolean;
}

// Estado de carga
export interface LoadingState {
  isLoading: boolean;
  progress: number;
  error?: Error | null;
}

// Información del invitado
export interface GuestInfo {
  name: string;
  email?: string;
  phone?: string;
  tableNumber?: number;
  confirmedAssistance?: boolean;
  numberOfGuests?: number;
  dietaryRestrictions?: string;
  message?: string;
}

// Evento del timeline
export interface TimelineEvent {
  time: string;
  event: string;
  description?: string;
  icon?: string;
}

// Sección de la invitación
export interface InvitationSection {
  id: string;
  title: string;
  icon: string;
  details: Record<string, string>;
}

// Props de componentes compartidos
export interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: "fadeIn" | "slideUp" | "typewriter";
}

export interface FloralDecorationProps {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  size?: "small" | "medium" | "large";
  color?: string;
  opacity?: number;
}

export interface HeartIconProps {
  size?: number;
  color?: string;
  filled?: boolean;
  animated?: boolean;
  className?: string;
  onClick?: () => void;
}

// Configuración de sonido
export interface SoundConfig {
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

// Opciones de animación
export interface AnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

// Estado del gesto
export interface GestureState {
  isDragging: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

// Configuración de la cuenta regresiva
export interface CountdownConfig {
  targetDate: string;
  updateInterval?: number;
  showSeconds?: boolean;
}

// Tiempo restante
export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds?: number;
}

// Respuesta de confirmación
export interface ConfirmationResponse {
  success: boolean;
  message: string;
  guestInfo?: GuestInfo;
}

// Configuración del tema
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    serif: string;
    sans: string;
    script: string;
  };
}

// Props para páginas
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}

// Metadata de la página
export interface PageMetadata {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

// Estado de navegación
export interface NavigationState {
  currentSection: string;
  previousSection: string | null;
  isTransitioning: boolean;
}
