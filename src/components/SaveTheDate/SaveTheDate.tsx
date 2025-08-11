"use client";

import React, { useEffect, useState } from "react";
import { useInvitation } from "@/contexts/InvitationContext";
import { useRouter } from "next/navigation";
import styles from "./SaveTheDate.module.css";

const SaveTheDate: React.FC = () => {
  const { weddingDetails } = useInvitation();
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger entrada animation
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleViewDetails = () => {
    router.push("/invitation");
  };

  return (
    <div className="invitation-container relative overflow-hidden">
      {/* Patrón decorativo de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className={styles.floralPattern}></div>
      </div>

      {/* Contenido principal */}
      <div
        className={`relative z-10 max-w-md mx-auto ${
          isVisible ? styles.fadeInUp : "opacity-0"
        }`}
      >
        {/* Marco superior con foto (placeholder) */}
        <div className="bg-[#fdf6f0] rounded-t-2xl overflow-hidden shadow-2xl">
          <div className="h-48 bg-gradient-to-b from-[#6b7f5a]/20 to-[#4a5d3a]/10 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-[#d4a574]/20 flex items-center justify-center">
                <span className="text-5xl font-script text-[#4a5d3a]">J&E</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido de Save the Date */}
        <div className="bg-[#fdf6f0] px-8 pb-8 rounded-b-2xl shadow-2xl">
          {/* Línea divisoria */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-[#d4a574]/30 flex-1"></div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="#d4a574"
              className="mx-3"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="h-px bg-[#d4a574]/30 flex-1"></div>
          </div>

          {/* Fecha */}
          <div className="text-center mb-6">
            <p className="text-[#333333]/60 text-sm font-sans uppercase tracking-widest mb-2">
              {weddingDetails.date}
            </p>
            <h1 className="text-4xl font-serif font-bold text-[#4a5d3a] mb-2">
              {weddingDetails.brideName}
            </h1>
            <p className="text-2xl font-serif text-[#4a5d3a] mb-1">&</p>
            <h1 className="text-4xl font-serif font-bold text-[#4a5d3a]">
              {weddingDetails.groomName}
            </h1>
          </div>

          {/* SAVE THE DATE */}
          <div className="relative mb-6">
            <div className="bg-gradient-to-br from-[#4a5d3a] to-[#6b7f5a] rounded-lg p-6 text-center transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-[#d4a574] text-3xl font-bold tracking-wider mb-2">
                SAVE
              </h2>
              <p className="text-[#fdf6f0] text-sm font-sans tracking-widest mb-2">
                THE
              </p>
              <h2 className="text-[#d4a574] text-3xl font-bold tracking-wider">
                DATE
              </h2>
              <div className="w-16 h-px bg-[#d4a574]/50 mx-auto mt-4 mb-3"></div>
              <p className="text-[#fdf6f0] text-lg font-serif">NOS CASAMOS!</p>
            </div>
          </div>

          {/* Botón para ver detalles */}
          <button onClick={handleViewDetails} className={styles.detailsButton}>
            <span className="relative z-10">Ver Detalles de la Invitación</span>
            <div className={styles.buttonGlow}></div>
          </button>

          {/* Cuenta regresiva simple */}
          <div className="text-center mt-6">
            <CountdownTimer targetDate="2025-10-25" />
          </div>
        </div>
      </div>

      {/* Decoración flotante */}
      <div className={styles.floatingHearts}>
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={styles.floatingHeart}
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            ❤️
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente de cuenta regresiva
const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Actualizar cada minuto

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-4 text-[#4a5d3a]/60">
      <div className="text-center">
        <p className="text-2xl font-bold">{timeLeft.days}</p>
        <p className="text-xs uppercase">Días</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{timeLeft.hours}</p>
        <p className="text-xs uppercase">Horas</p>
      </div>
      <div className="text-center">
        <p className="text-2xl font-bold">{timeLeft.minutes}</p>
        <p className="text-xs uppercase">Min</p>
      </div>
    </div>
  );
};

export default SaveTheDate;
