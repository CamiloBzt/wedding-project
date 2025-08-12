"use client";

import { useInvitation } from "@/contexts/InvitationContext";
import { useMusic } from "@/contexts/MusicContext";
import React, { useEffect, useState } from "react";
import styles from "./EnvelopeInvitation.module.css";

const EnvelopeInvitation: React.FC = () => {
  const { weddingDetails, setEnvelopeOpen } = useInvitation();
  const { isPlaying, isReady, initializeMusic } = useMusic();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [textAnimationStep, setTextAnimationStep] = useState(0);

  const handleContinue = async () => {
    // Asegurar que la música se inicie al hacer clic
    if (!isPlaying && isReady) {
      await initializeMusic();
    }

    // Marcar sobre como abierto para la transición
    setEnvelopeOpen(true);
  };

  useEffect(() => {
    // Animación de entrada secuencial
    const timer = setTimeout(() => {
      setIsVisible(true);

      // Intentar inicializar música si está lista
      if (isReady && !isPlaying) {
        initializeMusic().catch(console.log);
      }

      // Animar texto paso a paso
      const textTimer = setInterval(() => {
        setTextAnimationStep((prev) => {
          if (prev >= 3) {
            clearInterval(textTimer);
            return prev;
          }
          return prev + 1;
        });
      }, 800);

      return () => clearInterval(textTimer);
    }, 100);

    return () => clearTimeout(timer);
  }, [isReady, isPlaying, initializeMusic]);

  return (
    <div className="invitation-container">
      <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        <div className={styles.envelopeContainer}>
          <div className={styles.envelopeBase}>
            <div className={styles.letterPeeking}>
              <div className="bg-wedding-cream p-6 md:p-8 rounded-lg shadow-xl border border-wedding-gold/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-wedding-gold/5 via-transparent to-wedding-gold/10"></div>

                <div className="text-center mb-6 relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent"></div>
                    <div className="mx-3">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-wedding-gold"
                      >
                        <path
                          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent"></div>
                  </div>

                  <div
                    className={`transition-all duration-700 ${
                      textAnimationStep >= 1
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <h2 className="text-3xl md:text-4xl font-script text-wedding-olive mb-2 drop-shadow-sm">
                      {weddingDetails.brideName}
                    </h2>
                  </div>

                  <div
                    className={`transition-all duration-700 delay-300 ${
                      textAnimationStep >= 2
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                    }`}
                  >
                    <span className="text-2xl font-script text-wedding-olive inline-block mx-2">
                      &
                    </span>
                  </div>

                  <div
                    className={`transition-all duration-700 delay-500 ${
                      textAnimationStep >= 3
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <h2 className="text-3xl md:text-4xl font-script text-wedding-olive mt-1 drop-shadow-sm">
                      {weddingDetails.groomName}
                    </h2>
                  </div>

                  <div className="flex items-center justify-center mt-4">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent"></div>
                    <div className="mx-3">
                      <div className="w-2 h-2 bg-wedding-gold rounded-full"></div>
                    </div>
                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-wedding-gold to-transparent"></div>
                  </div>
                </div>

                <div className="space-y-4 mb-6 relative z-10">
                  <div className="text-center">
                    <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed italic">
                      &quot;Después de caminar juntos por senderos de aventuras,
                    </p>
                    <p className="text-gray-700 font-sans text-sm md:text-base leading-relaxed italic mb-3">
                      risas y sueños compartidos...&quot;
                    </p>
                  </div>

                  <div className="text-center mt-4">
                    <p className="text-gray-600 font-sans text-xs md:text-sm leading-relaxed">
                      Será un honor contar con su compañía para celebrar este
                      día tan especial.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleContinue}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`${styles.mainButton} ${
                    isHovered ? styles.buttonHovered : ""
                  } relative z-10`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-wedding-cream animate-pulse"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-wedding-cream animate-pulse delay-200 -ml-2"
                      >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </div>
                    <span className="text-wedding-cream font-sans font-semibold text-sm md:text-base">
                      Abrir Invitación
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.envelopeShadow}></div>
        </div>
      </div>

      <div className={styles.floatingElements}>
        {[
          { left: "10%", delay: "0s", size: "18" },
          { left: "25%", delay: "2s", size: "16" },
          { left: "75%", delay: "1s", size: "20" },
          { left: "90%", delay: "3s", size: "14" },
          { left: "50%", delay: "4s", size: "16" },
          { left: "65%", delay: "5s", size: "18" },
        ].map((heart, index) => (
          <div
            key={index}
            className={styles.floatingHeart}
            style={{
              left: heart.left,
              animationDelay: heart.delay,
              animationDuration: `${12 + index * 2}s`,
            }}
          >
            <svg
              width={heart.size}
              height={heart.size}
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-wedding-gold opacity-25"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        ))}

        {[...Array(8)].map((_, index) => (
          <div
            key={`particle-${index}`}
            className={styles.floatingHeart}
            style={{
              left: `${15 + index * 10}%`,
              animationDelay: `${index * 1.5}s`,
              animationDuration: "15s",
            }}
          >
            <div className="w-1 h-1 bg-wedding-gold rounded-full opacity-30"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvelopeInvitation;
