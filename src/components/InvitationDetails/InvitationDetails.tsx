"use client";

import AnimatedText from "@/components/shared/AnimatedText";
import FloralDecoration from "@/components/shared/FloralDecoration";
import HeartIcon from "@/components/shared/HeartIcon";
import { useWeddingDetails } from "@/contexts/InvitationContext";
import React, { useEffect, useState } from "react";
import DressCodePoster from "../DressCodePoster/DressCodePoster";
import { QRPhotoSection } from "../GenerateQRUrl/GenerateQRUrl";
import LocationModal from "../shared/LocationModal";
import MusicControlButton from "../shared/MusicControlButton";
import styles from "./InvitationDetails.module.css";

const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const getTarget = () => {
      if (targetDate.includes("T")) return new Date(targetDate);
      const [y, m, d] = targetDate.split("-").map(Number);
      return new Date(y, (m ?? 1) - 1, d ?? 1, 0, 0, 0, 0);
    };

    const target = getTarget();

    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      const totalMinutes = Math.floor(diff / 60000);
      const days = Math.floor(totalMinutes / (60 * 24));
      const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
      const minutes = totalMinutes % 60;
      setTimeLeft({ days, hours, minutes });
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-8 mb-16">
      <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-wedding-gold drop-shadow-lg mb-2">
          {timeLeft.days}
        </p>
        <p className="text-base uppercase text-wedding-cream/80 font-semibold tracking-wider drop-shadow-sm">
          Días
        </p>
      </div>
      <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-wedding-gold drop-shadow-lg mb-2">
          {timeLeft.hours}
        </p>
        <p className="text-base uppercase text-wedding-cream/80 font-semibold tracking-wider drop-shadow-sm">
          Horas
        </p>
      </div>
      <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-wedding-gold drop-shadow-lg mb-2">
          {timeLeft.minutes}
        </p>
        <p className="text-base uppercase text-wedding-cream/80 font-semibold tracking-wider drop-shadow-sm">
          Minutos
        </p>
      </div>
    </div>
  );
};

const InvitationDetails: React.FC = () => {
  const weddingDetails = useWeddingDetails();
  const [activeSection, setActiveSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const sections = [
    {
      id: "ceremony-reception",
      title: "Ceremonia & Recepción",
      icon: "💒🥂",
      content: {
        hora: "¡Te esperamos a las 3:00 PM para celebrar juntos este gran día!",
        lugar: `La cita es en: ${weddingDetails.venue}`,
        dirección: weddingDetails.address,
        parqueadero:
          "Contamos con parqueadero disponible dentro del lugar para tu comodidad.",
      },
    },
    {
      id: "dress-code",
      title: "Código de Vestimenta",
      icon: "🤵🏻👰🏻",
      content: {
        estilo:
          "¡Vístete para brillar! Elige un look formal elegante y acompáñanos con tu mejor sonrisa.",
        bridesmaids: {
          bullets: [
            "Vestido formal largo o corto, elige el que más te guste.",
            "Zapato formal para bailar toda la noche.",
          ],
        },
        groomsmen: {
          bullets: [
            "Traje formal (evita el azul, por favor).",
            "Camisa blanca, clásica y elegante.",
            "Corbata (cualquier color menos azul).",
            "Zapato formal, ¡prepárate para la pista!",
          ],
        },
        nota: "Reservamos los colores blanco, nude y azul en todos sus tonos para los novios.",
      },
    },
    {
      id: "tips",
      title: "Tips y Notas",
      icon: "📋",
      content: {
        puntualidad:
          "¡No llegues tarde! Comenzamos puntuales a las 3:00 PM para que no te pierdas ningún momento especial.",
        invitados:
          "Queremos que disfrutes al máximo, por eso nuestra celebración será solo para adultos.",
        confirmación:
          "La fiesta no será la misma sin ti 🎶💃. Confírmanos tu asistencia antes del 10 de Octubre de 2025, para reservar tu lugar en la pista de baile.",
        clima:
          "El clima puede refrescar en la noche, ¡no olvides llevar un abrigo para los espacios exteriores!",
      },
    },
    {
      id: "gifts",
      title: "Regalos",
      icon: "🎁",
      content: {
        nota: "✨El mejor regalo será compartir contigo este día tan especial. Pero si quieres tener un detalle con nosotros… que sea lluvia de sobres 💌😉. Prometemos transformarlos en viajes, recuerdos y mucha felicidad.✨",
      },
    },
    {
      id: "photos-qr",
      title: "Comparte tus fotos",
      icon: "📸",
      content: {
        instrucción:
          "¡Queremos revivir cada momento! Escanea el código QR para subir tus fotos y videos de la fiesta.",
        drive_url:
          "https://drive.google.com/drive/folders/1VtRG4Yc1egkPu831W4r62eauCiirY_3d?usp=sharing",
        hashtag: weddingDetails.hashtag || "#JohannaYEnrique2025",
        nota: "No olvides usar nuestro hashtag en redes sociales para compartir tus recuerdos.",
      },
    },
  ];

  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSf2CQ63prRAj9YSw4sOdV0rITH2H_wXlAB0rPX33XUWXj-EOA/viewform";

  const handleConfirmAttendance = () => {
    window.open(googleFormUrl, "_blank");
  };

  const handleOpenMap = () => setIsMapOpen(true);
  const handleCloseMap = () => setIsMapOpen(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 300000);
    return () => clearInterval(interval);
  }, [sections.length]);

  return (
    <div className="min-h-screen bg-wedding-olive relative overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <FloralDecoration position="top-left" size="large" opacity={0.15} />
        <FloralDecoration position="top-right" size="large" opacity={0.12} />

        <div className="absolute top-32 left-1/4 transform -translate-x-1/2">
          <FloralDecoration size="medium" opacity={0.08} />
        </div>
        <div className="absolute top-40 right-1/3 transform translate-x-1/2">
          <FloralDecoration size="small" opacity={0.1} />
        </div>

        <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
          <FloralDecoration size="medium" opacity={0.06} />
        </div>
        <div className="absolute top-1/2 right-12 transform -translate-y-1/2">
          <FloralDecoration size="small" opacity={0.08} />
        </div>

        <div className="absolute top-2/3 left-1/6">
          <FloralDecoration size="small" opacity={0.07} />
        </div>
        <div className="absolute top-2/3 right-1/5">
          <FloralDecoration size="medium" opacity={0.09} />
        </div>

        <div className="absolute bottom-1/3 left-1/3">
          <FloralDecoration size="small" opacity={0.06} />
        </div>
        <div className="absolute bottom-1/4 right-1/4">
          <FloralDecoration size="medium" opacity={0.08} />
        </div>

        <FloralDecoration position="bottom-left" size="medium" opacity={0.1} />
        <FloralDecoration position="bottom-right" size="large" opacity={0.12} />

        <div className="absolute top-1/4 left-12">
          <FloralDecoration size="small" opacity={0.05} />
        </div>
        <div className="absolute top-3/4 right-16">
          <FloralDecoration size="small" opacity={0.07} />
        </div>
        <div className="absolute top-1/3 right-1/6">
          <FloralDecoration size="small" opacity={0.06} />
        </div>
        <div className="absolute bottom-1/2 left-1/5">
          <FloralDecoration size="small" opacity={0.05} />
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-wedding-olive/95 backdrop-blur-sm border-b border-wedding-gold/20 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <HeartIcon size={18} className="text-wedding-gold" animated />
            <span className="font-script text-wedding-gold text-lg">
              {weddingDetails.hashtag}
            </span>
          </div>
        </div>
      </header>

      <div className="relative py-20 text-center overflow-hidden z-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-8">
          <h1 className="text-[8rem] md:text-[12rem] font-bold text-wedding-gold tracking-widest transform -rotate-12 select-none">
            SAVE THE DATE
          </h1>
        </div>

        <div className="absolute top-16 left-16 z-5">
          <FloralDecoration size="medium" opacity={0.2} />
        </div>
        <div className="absolute top-24 right-20 z-5">
          <FloralDecoration size="small" opacity={0.15} />
        </div>
        <div className="absolute bottom-16 left-1/4 z-5">
          <FloralDecoration size="small" opacity={0.18} />
        </div>
        <div className="absolute bottom-20 right-1/3 z-5">
          <FloralDecoration size="medium" opacity={0.16} />
        </div>

        <div
          className={`relative z-20 max-w-4xl mx-auto px-4 ${
            isVisible ? "animate-fade-in" : "opacity-0"
          }`}
        >
          <AnimatedText
            text={`${weddingDetails.brideName} & ${weddingDetails.groomName}`}
            className="text-6xl md:text-7xl font-script text-wedding-gold mb-8 drop-shadow-lg"
            delay={0}
          />

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-wedding-gold/50 w-24"></div>
            <HeartIcon
              className="text-wedding-gold drop-shadow-md"
              size={32}
              animated
            />
            <div className="h-px bg-wedding-gold/50 w-24"></div>
          </div>

          <AnimatedText
            text={weddingDetails.date}
            className="text-2xl font-serif text-wedding-gold/90 mb-12 drop-shadow-sm"
            delay={200}
          />

          <CountdownTimer targetDate="2025-10-25T15:00:00-05:00" />
        </div>
      </div>

      <div className={`${styles.container} relative z-10`}>
        <div className="absolute top-8 right-8 z-5">
          <FloralDecoration size="small" opacity={0.12} />
        </div>
        <div className="absolute top-32 left-12 z-5">
          <FloralDecoration size="medium" opacity={0.1} />
        </div>

        <div className={styles.navigation}>
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => setActiveSection(index)}
              className={`${styles.navButton} ${
                activeSection === index ? styles.active : ""
              }`}
            >
              <span className="text-2xl mb-1">{section.icon}</span>
              <span className="text-xs text-wedding-cream">
                {section.title}
              </span>
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.sectionCard}>
            <h2 className="text-3xl font-serif text-wedding-olive mb-6">
              {sections[activeSection].title}
            </h2>

            {activeSection === 1 ? (
              <DressCodePoster
                bridesmaids={{
                  title: "Mujeres",
                  bullets:
                    sections[activeSection].content.bridesmaids?.bullets ?? [],
                  imageSrc: "/images/womens.png",
                  imageAlt: "Vestidos sugeridos",
                }}
                groomsmen={{
                  title: "Hombres",
                  bullets:
                    sections[activeSection].content.groomsmen?.bullets ?? [],
                  imageSrc: "/images/mens.png",
                  imageAlt: "Trajes sugeridos",
                }}
                note={sections[activeSection].content.nota}
              />
            ) : activeSection === 3 ? (
              <div className="mt-6 p-6">
                <p className="text-center text-wedding-olive text-base md:text-lg leading-relaxed">
                  {sections[activeSection].content.nota}
                </p>
              </div>
            ) : (
              <div className={styles.sectionContent}>
                {Object.entries(sections[activeSection].content)
                  .filter(([key]) => !["drive_url"].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className={styles.infoItem}>
                      <span className={styles.infoLabel}>
                        {key.charAt(0).toUpperCase() + key.slice(1)}:
                      </span>
                      <span className={styles.infoValue}>{String(value)}</span>
                    </div>
                  ))}
              </div>
            )}

            {activeSection === 4 && (
              <QRPhotoSection
                driveUrl={sections[activeSection].content.drive_url ?? ""}
                hashtag={sections[activeSection].content.hashtag ?? ""}
              />
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button
            onClick={handleConfirmAttendance}
            className={styles.confirmButton}
          >
            <HeartIcon size={20} className="mr-2" />
            Confirmar Asistencia
          </button>
          <button onClick={handleOpenMap} className={styles.mapButton}>
            📍 Ver Ubicación
          </button>
        </div>

        <div className={styles.footer}>
          <FloralDecoration position="bottom-center" opacity={0.2} />
        </div>
      </div>

      <footer className="relative bg-wedding-olive border-t border-wedding-gold/20 py-8 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AnimatedText
            text="Con amor, Johanna & Enrique"
            className="font-script text-3xl text-wedding-gold mb-4"
            delay={100}
          />
          <p className="text-wedding-cream/60 text-sm">
            © 2025 - Todos los derechos reservados
          </p>
        </div>
      </footer>
      <MusicControlButton />
      <LocationModal
        isOpen={isMapOpen}
        onClose={handleCloseMap}
        address={weddingDetails.address}
      />
    </div>
  );
};

export default InvitationDetails;
