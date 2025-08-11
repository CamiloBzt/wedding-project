"use client";

import React, { useState } from "react";
import { useMusic } from "@/contexts/MusicContext";

const MusicControlButton: React.FC = () => {
  const { isPlaying, volume, toggleMusic, setVolume } = useMusic();
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Slider de volumen */}
        {showVolumeSlider && (
          <div
            onMouseLeave={() =>
              setTimeout(() => setShowVolumeSlider(false), 500)
            }
            className="absolute bottom-full mb-2 right-0 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
          >
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={(e) => setVolume(Number(e.target.value) / 100)}
              className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #d4a574 0%, #d4a574 ${
                  volume * 100
                }%, #e5e5e5 ${volume * 100}%, #e5e5e5 100%)`,
              }}
            />
            <p className="text-xs text-gray-600 mt-1 text-center">
              {Math.round(volume * 100)}%
            </p>
          </div>
        )}

        {/* Botón principal */}
        <button
          onClick={toggleMusic}
          onMouseEnter={() => setShowVolumeSlider(true)}
          className="group relative w-14 h-14 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {/* Ícono de música */}
          {isPlaying ? (
            <svg
              className="w-6 h-6 text-[#7c9070] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
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

          {/* Ondas de sonido animadas */}
          {isPlaying && (
            <>
              <span className="absolute inset-0 rounded-full bg-[#7c9070]/20 animate-ping"></span>
              <span className="absolute inset-0 rounded-full bg-[#7c9070]/10 animate-ping animation-delay-200"></span>
            </>
          )}
        </button>

        {/* Tooltip */}
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div
            className={`bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap transition-opacity duration-200 ${
              showVolumeSlider
                ? "opacity-0"
                : "opacity-0 group-hover:opacity-100"
            }`}
          >
            {isPlaying ? "Pausar música" : "Reproducir música"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicControlButton;
