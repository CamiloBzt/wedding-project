export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export const slideUp = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const slideDown = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 20, opacity: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const slideInLeft = {
  initial: { x: -50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 50, opacity: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const slideInRight = {
  initial: { x: 50, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -50, opacity: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.3 },
};

export const rotateIn = {
  initial: { rotate: -180, opacity: 0 },
  animate: { rotate: 0, opacity: 1 },
  exit: { rotate: 180, opacity: 0 },
  transition: { duration: 0.5 },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export const staggerItem = {
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

// Animación personalizada para el sobre
export const envelopeAnimation = {
  closed: {
    rotateX: 0,
    transition: { duration: 0.5 },
  },
  opening: {
    rotateX: -180,
    transition: { duration: 1, ease: "easeInOut" },
  },
};

// Animación de corazón latiendo
export const heartBeat = {
  animate: {
    scale: [1, 1.2, 1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      repeatDelay: 0.5,
    },
  },
};

// Animación de flotación
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// Animación de brillo
export const shimmer = {
  animate: {
    x: ["0%", "100%"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

// Función helper para crear animaciones con delay
export const createDelayedAnimation = (baseAnimation: any, delay: number) => ({
  ...baseAnimation,
  transition: {
    ...baseAnimation.transition,
    delay,
  },
});

// Función para animaciones en cadena
export const chainAnimations = (animations: any[]) => {
  let totalDelay = 0;
  return animations.map((anim) => {
    const delayed = createDelayedAnimation(anim, totalDelay);
    totalDelay += anim.transition?.duration || 0.5;
    return delayed;
  });
};
