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
  toggleMusic: () => void;
  setVolume: (volume: number) => void;
  playSound: (soundUrl: string) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.3);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const soundEffectRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Inicializar música de fondo
    if (typeof window !== "undefined") {
      backgroundMusicRef.current = new Audio("/sounds/wedding-bg.mp3");
      backgroundMusicRef.current.loop = true;
      backgroundMusicRef.current.volume = volume;
    }

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!backgroundMusicRef.current) return;

    if (isPlaying) {
      backgroundMusicRef.current.pause();
      setIsPlaying(false);
    } else {
      backgroundMusicRef.current.play().catch((error) => {
        console.log("Error al reproducir música:", error);
        // Intentar reproducir después de interacción del usuario
      });
      setIsPlaying(true);
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
        toggleMusic,
        setVolume,
        playSound,
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
