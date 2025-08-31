"use client";

import AnimatedText from "@/components/shared/AnimatedText";
import FloralDecoration from "@/components/shared/FloralDecoration";
import HeartIcon from "@/components/shared/HeartIcon";
import { useWeddingDetails } from "@/contexts/InvitationContext";
import React, { useEffect, useState } from "react";
import { QRPhotoSection } from "../GenerateQRUrl/GenerateQRUrl";
import MusicControlButton from "../shared/MusicControlButton";
import styles from "./InvitationDetails.module.css";

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
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex justify-center gap-8 mb-16">
      <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-wedding-accent drop-shadow-lg mb-2">
          {timeLeft.days}
        </p>
        <p className="text-base uppercase text-wedding-cream/80 font-semibold tracking-wider drop-shadow-sm">
          Días
        </p>
      </div>
      <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-wedding-accent drop-shadow-lg mb-2">
          {timeLeft.hours}
        </p>
        <p className="text-base uppercase text-wedding-cream/80 font-semibold tracking-wider drop-shadow-sm">
          Horas
        </p>
      </div>
      <div className="text-center">
        <p className="text-5xl md:text-6xl font-bold text-wedding-accent drop-shadow-lg mb-2">
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

  const sections = [
    {
      id: "ceremony",
      title: "Ceremonia",
      icon: "💒",
      content: {
        time: "5:00 PM",
        location: "Iglesia San José",
        address: "Calle 100 #15-20, Bogotá",
        note: "Por favor llegar 15 minutos antes",
      },
    },
    {
      id: "reception",
      title: "Recepción",
      icon: "🥂",
      content: {
        time: "7:00 PM",
        location: weddingDetails.venue,
        address: weddingDetails.address,
        note: "Cocktail de bienvenida a las 6:30 PM",
      },
    },
    {
      id: "dress-code",
      title: "Dress Code",
      icon: "👗",
      content: {
        style: "Formal Elegante",
        colors: "Evitar blanco y negro completo",
        suggestion: "Colores pasteles bienvenidos",
        note: "Black tie opcional",
      },
    },
    {
      id: "tips",
      title: "Tips y Notas",
      icon: "📋",
      content: {
        puntualidad: "¡Por favor ser puntuales!",
        adultos: "Evento solo para adultos",
        confirmación: "Confirmar asistencia antes del 10 de Octubre",
        clima: "Llevar abrigo para espacios exteriores",
        extras: "Olvidarse de todo y a disfrutar!!!",
      },
    },
    {
      id: "gifts",
      title: "Regalos",
      icon: "🎁",
      content: {
        mensaje: "Tu presencia es nuestro mejor regalo",
        opción: "Lluvia de sobres disponible",
        banco: "Depósito bancario: XXXX XXXX XXXX XXXX",
        paypal: "PayPal: correopaypal@gmail.com",
      },
    },
    {
      id: "photos-qr",
      title: "Comparte tus fotos",
      icon: "📸",
      content: {
        instruccion: "Escanea el código QR para subir tus fotos y videos",
        drive_url:
          "https://drive.google.com/drive/folders/1VtRG4Yc1egkPu831W4r62eauCiirY_3d?usp=sharing",
        hashtag: weddingDetails.hashtag || "#JohannaYEnrique2025",
        nota: "También puedes usar nuestro hashtag en redes sociales",
      },
    },
  ];

  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLSf2CQ63prRAj9YSw4sOdV0rITH2H_wXlAB0rPX33XUWXj-EOA/viewform";

  const handleConfirmAttendance = () => {
    window.open(googleFormUrl, "_blank");
  };

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 60000);
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

      <header className="sticky top-0 z-50 bg-wedding-olive/95 backdrop-blur-sm border-b border-wedding-accent/20 py-3">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2">
            <HeartIcon size={18} className="text-wedding-accent" animated />
            <span className="font-script text-wedding-accent text-lg">
              {weddingDetails.hashtag}
            </span>
          </div>
        </div>
      </header>

      <div className="relative py-20 text-center overflow-hidden z-10">
        <div className="absolute inset-0 flex items-center justify-center opacity-8">
          <h1 className="text-[8rem] md:text-[12rem] font-bold text-wedding-accent tracking-widest transform -rotate-12 select-none">
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
            className="text-6xl md:text-7xl font-script text-wedding-accent mb-8 drop-shadow-lg"
            delay={0}
          />

          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px bg-wedding-accent/50 w-24"></div>
            <HeartIcon
              className="text-wedding-accent drop-shadow-md"
              size={32}
              animated
            />
            <div className="h-px bg-wedding-accent/50 w-24"></div>
          </div>

          <AnimatedText
            text={weddingDetails.date}
            className="text-2xl font-serif text-wedding-accent/90 mb-12 drop-shadow-sm"
            delay={200}
          />

          <CountdownTimer targetDate="2025-10-25" />
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

            <div className={styles.sectionContent}>
              {Object.entries(sections[activeSection].content).map(
                ([key, value]) => (
                  <div key={key} className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      {key.charAt(0).toUpperCase() + key.slice(1)}:
                    </span>
                    <span className={styles.infoValue}>{value}</span>
                  </div>
                )
              )}
            </div>

            {activeSection === 3 && (
              <div className="mt-6 p-4 bg-wedding-olive/10 rounded-lg">
                <h4 className="text-lg font-serif text-wedding-olive mb-3">
                  Consejos importantes:
                </h4>
                <ul className="space-y-2 text-sm text-wedding-olive/80">
                  <li>
                    • Queremos que disfrutes al máximo, por eso es solo para
                    adultos
                  </li>
                  <li>• Confirma tu asistencia lo antes posible</li>
                  <li>• Lleva abrigo para los espacios exteriores</li>
                  <li>• ¡Olvídate de todo y disfruta con nosotros!</li>
                </ul>
              </div>
            )}

            {activeSection === 4 && (
              <div className="mt-6 p-4 bg-wedding-accent/10 rounded-lg">
                <h4 className="text-lg font-serif text-wedding-olive mb-3">
                  Opciones para regalos:
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-wedding-cream rounded border-l-3 border-wedding-accent">
                    <p className="font-semibold text-wedding-olive">
                      Sobres en la recepción
                    </p>
                    <p className="text-wedding-olive/70">
                      Tendremos un cofre especial disponible
                    </p>
                  </div>
                  <div className="p-3 bg-wedding-cream rounded border-l-3 border-wedding-accent">
                    <p className="font-semibold text-wedding-olive">
                      Transferencia bancaria
                    </p>
                    <p className="text-wedding-olive/70">
                      Cuenta disponible por mensaje privado
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 5 && (
              <QRPhotoSection
                driveUrl={sections[activeSection].content.drive_url ?? ""}
                hashtag={sections[activeSection].content.hashtag ?? ""}
              />
            )}
          </div>
        </div>

        <div className={`${styles.timeline} relative`}>
          <div className="absolute -top-4 -left-4 z-5">
            <FloralDecoration size="small" opacity={0.15} />
          </div>
          <div className="absolute -bottom-4 -right-4 z-5">
            <FloralDecoration size="medium" opacity={0.12} />
          </div>

          <h3 className="text-2xl font-serif text-wedding-olive mb-6 text-center">
            Itinerario del Día
          </h3>
          <div className={styles.timelineItems}>
            <TimelineItem time="4:30 PM" event="Llegada de invitados" />
            <TimelineItem time="5:00 PM" event="Ceremonia religiosa" />
            <TimelineItem time="6:30 PM" event="Cocktail de bienvenida" />
            <TimelineItem time="7:00 PM" event="Recepción y cena" />
            <TimelineItem time="9:00 PM" event="Primer baile" />
            <TimelineItem time="10:00 PM" event="Fiesta" />
            <TimelineItem time="2:00 AM" event="Fin del evento" />
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
          <button className={styles.mapButton}>📍 Ver Ubicación</button>
        </div>

        <div className={styles.footer}>
          <FloralDecoration position="bottom-center" opacity={0.2} />
        </div>
      </div>

      <footer className="relative bg-wedding-olive border-t border-wedding-accent/20 py-8 z-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <AnimatedText
            text="Con amor, Johanna & Enrique"
            className="font-script text-3xl text-wedding-accent mb-4"
            delay={100}
          />
          <p className="text-wedding-cream/60 text-sm">
            © 2025 - Todos los derechos reservados
          </p>
        </div>
      </footer>
      <MusicControlButton />
    </div>
  );
};

const TimelineItem: React.FC<{ time: string; event: string }> = ({
  time,
  event,
}) => (
  <div className={styles.timelineItem}>
    <div className={styles.timelineDot}></div>
    <div className={styles.timelineContent}>
      <span className={styles.timelineTime}>{time}</span>
      <span className={styles.timelineEvent}>{event}</span>
    </div>
  </div>
);

export default InvitationDetails;
