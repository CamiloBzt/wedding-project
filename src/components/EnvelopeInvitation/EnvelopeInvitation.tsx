"use client";

import { useInvitation } from "@/contexts/InvitationContext";
import { useMusic } from "@/contexts/MusicContext";
import React, { useEffect, useState } from "react";
import styles from "./EnvelopeInvitation.module.css";

const EnvelopeInvitation: React.FC = () => {
  const { weddingDetails, setEnvelopeOpen } = useInvitation();
  const { toggleMusic } = useMusic();
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animación de entrada
    setTimeout(() => {
      toggleMusic();
      setIsVisible(true);
    }, 100);
  }, []);

  const handleContinue = () => {
    // Marcar sobre como abierto para la transición
    setEnvelopeOpen(true);
  };

  return (
    <div className="invitation-container">
      <div
        className={`relative ${isVisible ? "animate-fade-in" : "opacity-0"}`}
      >
        {/* Sobre abierto con carta visible */}
        <div className={styles.envelopeOpen}>
          {/* Parte trasera del sobre (base) */}
          <div className={styles.envelopeBackOpen}>
            {/* Solapa abierta */}
            <div className={styles.envelopeFlapOpen}></div>
          </div>

          {/* Carta visible (fuera del sobre) */}
          <div className={styles.letterVisible}>
            <div className="bg-[#fdf6f0] p-8 rounded-lg shadow-2xl">
              {/* Decoración superior */}
              <div className="text-center mb-6">
                <div className="w-16 h-0.5 bg-[#d4a574] mx-auto mb-4"></div>
                <h2 className="text-4xl font-script text-[#7c9070] mb-2">
                  {weddingDetails.brideName}
                </h2>
                <span className="text-2xl font-script text-[#7c9070]">&</span>
                <h2 className="text-4xl font-script text-[#7c9070] mt-2">
                  {weddingDetails.groomName}
                </h2>
                <div className="w-16 h-0.5 bg-[#d4a574] mx-auto mt-4"></div>
              </div>

              {/* Mensaje principal */}
              <div className="space-y-4 mb-8">
                <p className="text-center text-[#333333] font-sans text-base leading-relaxed">
                  Después de tantas aventuras juntos,
                </p>
                <p className="text-center text-[#333333] font-sans text-base leading-relaxed">
                  hemos decidido dar el{" "}
                  <span className="font-semibold text-[#7c9070]">
                    &quot;sí&quot;
                  </span>{" "}
                  definitivo
                </p>

                <div className="py-4">
                  <p className="text-center text-[#333333] font-sans text-sm">
                    Nos encantaría contar con ustedes
                  </p>
                  <p className="text-center text-[#333333] font-sans text-sm">
                    para celebrar este día tan especial
                  </p>
                </div>
              </div>

              {/* Fecha destacada */}
              <div className="text-center mb-8">
                <p className="text-[#7c9070] font-sans text-xs uppercase tracking-widest mb-1">
                  Save the Date
                </p>
                <p className="text-[#7c9070] font-serif text-xl font-bold">
                  {weddingDetails.date}
                </p>
              </div>

              {/* Botón principal */}
              <button
                onClick={handleContinue}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`${styles.mainButton} ${
                  isHovered ? styles.buttonHovered : ""
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="#fdf6f0"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  <span className="text-[#fdf6f0] font-sans font-semibold">
                    Abrir Invitación
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Parte frontal del sobre (decorativa) */}
          <div className={styles.envelopeFrontOpen}>
            <div className="h-full flex items-end justify-center pb-4">
              <div className="text-center">
                <p className="font-script text-2xl text-[#7c9070]/50">
                  Para: Nuestros queridos invitados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sombras decorativas */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-4/5 h-12 bg-black/10 blur-2xl rounded-full"></div>
      </div>

      {/* Decoración flotante */}
      <div className={styles.floatingElements}>
        <div
          className={styles.floatingHeart}
          style={{ left: "10%", animationDelay: "0s" }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="#d4a574"
            opacity="0.2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div
          className={styles.floatingHeart}
          style={{ left: "85%", animationDelay: "2s" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="#d4a574"
            opacity="0.15"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeInvitation;
