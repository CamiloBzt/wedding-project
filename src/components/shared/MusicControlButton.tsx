"use client";

import { useMusic } from "@/contexts/MusicContext";
import React, { useEffect, useRef, useState } from "react";

const MusicControlButton: React.FC = () => {
  const { isPlaying, toggleMusic } = useMusic();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowVolumeSlider(false);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowVolumeSlider(false);
      }
    };

    if (showVolumeSlider) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showVolumeSlider]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowVolumeSlider(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={containerRef}>
      <div className="relative">
        <button
          onClick={toggleMusic}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="group relative w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-[#a9c4dd] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
              <line x1="3" y1="3" x2="21" y2="21" className="text-red-400" />
            </svg>
          )}

          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#a9c4dd]/20 animate-ping"></span>
              <span className="absolute inset-0 rounded-full bg-[#a9c4dd]/10 animate-ping animation-delay-200"></span>
            </>
          )}
        </button>

        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div
            className={`bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity duration-200 ${
              showVolumeSlider
                ? "opacity-0"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {isPlaying ? "Pausar música" : "Reproducir música"}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 -mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicControlButton;
