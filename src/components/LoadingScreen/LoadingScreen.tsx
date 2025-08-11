"use client";

import React, { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#7c9070] flex flex-col items-center justify-center z-50">
      {/* Animación del corazón */}
      <div className="relative mb-8">
        <div className={styles.heartContainer}>
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            className={styles.heart}
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="#d4a574"
            />
          </svg>
          <div className={styles.pulseRing}></div>
          <div
            className={styles.pulseRing}
            style={{ animationDelay: "0.5s" }}
          ></div>
        </div>
      </div>

      {/* Nombres */}
      <h1 className="text-4xl md:text-5xl font-script text-[#fdf6f0] mb-2 animate-fade-in">
        Johanna & Enrique
      </h1>

      {/* Fecha */}
      <p className="text-[#d4a574] text-lg font-sans font-light mb-8">
        25.10.2025
      </p>

      {/* Barra de progreso */}
      <div className="w-64 h-1 bg-black/20 rounded-full overflow-hidden">
        <div
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(to right, #d4a574, #fdf6f0)",
          }}
        />
      </div>

      {/* Texto de carga */}
      <p className="text-[#fdf6f0]/60 text-sm font-sans mt-4 animate-pulse">
        Preparando tu invitación...
      </p>
    </div>
  );
};

export default LoadingScreen;
