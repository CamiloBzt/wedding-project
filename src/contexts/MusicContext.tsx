"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
} from "react";

interface MusicContextType {
  isPlaying: boolean;
  volume: number;
  isReady: boolean;
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
  playSound: (soundUrl: string) => void;
  initializeMusic: () => Promise<void>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const [isReady, setIsReady] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectRef = useRef<HTMLAudioElement | null>(null);
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      backgroundMusicRef.current = new Audio("/sounds/wedding-bg.mp3");
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = volume;
      backgroundMusicRef.current.preload = "auto";

      backgroundMusicRef.current.addEventListener("canplaythrough", () => {
        setIsReady(true);

        if (!hasTriedAutoplay.current) {
          hasTriedAutoplay.current = true;
          tryAutoplay();
        }
      });

      backgroundMusicRef.current.addEventListener("play", () => {
        setIsPlaying(true);
      });

      backgroundMusicRef.current.addEventListener("pause", () => {
        setIsPlaying(false);
      });

      const handleUserInteraction = async () => {
        if (!isPlaying && isReady) {
          await initializeMusic();
        }

        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
      };

      document.addEventListener("click", handleUserInteraction);
      document.addEventListener("touchstart", handleUserInteraction);
      document.addEventListener("keydown", handleUserInteraction);

      return () => {
        document.removeEventListener("click", handleUserInteraction);
        document.removeEventListener("touchstart", handleUserInteraction);
        document.removeEventListener("keydown", handleUserInteraction);
      };
    }

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  const tryAutoplay = async () => {
    if (!backgroundMusicRef.current || !isReady) return;

    try {
      await backgroundMusicRef.current.play();
      console.log("Música iniciada automáticamente");
    } catch (error) {
      console.log(
        "Autoplay bloqueado, esperando interacción del usuario",
        error
      );
    }
  };

  const initializeMusic = async (): Promise<void> => {
    if (!backgroundMusicRef.current || !isReady) return;

    try {
      if (backgroundMusicRef.current.paused) {
        await backgroundMusicRef.current.play();
        console.log("Música iniciada");
      }
    } catch (error) {
      console.log("Error al inicializar música:", error);
    }
  };

  const toggleMusic = async () => {
    if (!backgroundMusicRef.current || !isReady) return;

    try {
      if (isPlaying) {
        backgroundMusicRef.current.pause();
      } else {
        await backgroundMusicRef.current.play();
      }
    } catch (error) {
      console.log("Error al cambiar estado de música:", error);
    }
  };

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolumeState(clampedVolume);

    if (backgroundMusicRef.current) {
      backgroundMusicRef.current.volume = clampedVolume;
    }
  };

  const playSound = (soundUrl: string) => {
    if (typeof window !== "undefined") {
      soundEffectRef.current = new Audio(soundUrl);
      soundEffectRef.current.volume = volume;
      soundEffectRef.current.play().catch((error) => {
        console.log("Error al reproducir sonido:", error);
      });
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        volume,
        isReady,
        toggleMusic,
        setVolume,
        playSound,
        initializeMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic debe ser usado dentro de MusicProvider");
  }
  return context;
};
