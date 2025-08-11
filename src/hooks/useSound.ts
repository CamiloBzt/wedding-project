import { useEffect, useRef, useCallback } from "react";

interface UseSoundOptions {
  volume?: number;
  loop?: boolean;
  autoplay?: boolean;
}

export const useSound = (url: string, options: UseSoundOptions = {}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { volume = 1, loop = false, autoplay = false } = options;

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(url);
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;

      if (autoplay) {
        audioRef.current.play().catch(() => {
          console.log("Autoplay prevented by browser");
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [url, volume, loop, autoplay]);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      return audioRef.current.play().catch((error) => {
        console.error("Error playing sound:", error);
      });
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = Math.max(0, Math.min(1, newVolume));
    }
  }, []);

  return { play, pause, stop, setVolume };
};
