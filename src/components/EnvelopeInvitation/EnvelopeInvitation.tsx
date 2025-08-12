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
      <div className={`${isVisible ? "animate-fade-in" : "opacity-0"}`}>
        {/* Sobre realista */}
        <div className={styles.envelopeContainer}>
          {/* Base del sobre */}
          <div className={styles.envelopeBase}>
            {/* Solapa frontal abierta */}
            <div className={styles.envelopeFrontFlap}></div>

            {/* Carta saliendo del sobre */}
            <div className={styles.letterPeeking}>
              <div className="bg-wedding-cream p-6 md:p-8 rounded-lg shadow-xl border border-wedding-gold/20">
                {/* Decoración superior */}
                <div className="text-center mb-6">
                  <div className="w-12 h-0.5 bg-wedding-gold mx-auto mb-3"></div>
                  <h2 className="text-3xl md:text-4xl font-script text-wedding-olive mb-2">
                    {weddingDetails.brideName}
                  </h2>
                  <span className="text-xl font-script text-wedding-olive">
                    &
                  </span>
                  <h2 className="text-3xl md:text-4xl font-script text-wedding-olive mt-1">
                    {weddingDetails.groomName}
                  </h2>
                  <div className="w-12 h-0.5 bg-wedding-gold mx-auto mt-3"></div>
                </div>

                {/* Mensaje principal */}
                <div className="space-y-3 mb-6">
                  <p className="text-center text-gray-700 font-sans text-sm md:text-base leading-relaxed">
                    Después de tantas aventuras juntos,
                  </p>
                  <p className="text-center text-gray-700 font-sans text-sm md:text-base leading-relaxed">
                    hemos decidido dar el{" "}
                    <span className="font-semibold text-wedding-olive">
                      &quot;sí&quot;
                    </span>{" "}
                    definitivo
                  </p>

                  <div className="py-2">
                    <p className="text-center text-gray-600 font-sans text-xs md:text-sm">
                      Nos encantaría contar con ustedes
                    </p>
                    <p className="text-center text-gray-600 font-sans text-xs md:text-sm">
                      para celebrar este día tan especial
                    </p>
                  </div>
                </div>

                {/* Fecha destacada */}
                <div className="text-center mb-6">
                  <p className="text-wedding-olive font-serif text-lg md:text-xl font-bold">
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
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-wedding-cream"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span className="text-wedding-cream font-sans font-semibold text-sm md:text-base">
                      Abrir Invitación
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sombra del sobre */}
          <div className={styles.envelopeShadow}></div>
        </div>
      </div>

      {/* Decoración flotante sutil */}
      <div className={styles.floatingElements}>
        <div
          className={styles.floatingHeart}
          style={{ left: "15%", animationDelay: "0s" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-wedding-gold opacity-20"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
        <div
          className={styles.floatingHeart}
          style={{ left: "85%", animationDelay: "3s" }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-wedding-gold opacity-15"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeInvitation;
