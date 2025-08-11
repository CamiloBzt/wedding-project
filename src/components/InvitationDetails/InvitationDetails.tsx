"use client";

import React, { useState, useEffect } from "react";
import { useWeddingDetails } from "@/contexts/InvitationContext";
import AnimatedText from "@/components/shared/AnimatedText";
import FloralDecoration from "@/components/shared/FloralDecoration";
import HeartIcon from "@/components/shared/HeartIcon";
import styles from "./InvitationDetails.module.css";

const InvitationDetails: React.FC = () => {
  const weddingDetails = useWeddingDetails();
  const [activeSection, setActiveSection] = useState(0);
  const [showModal, setShowModal] = useState<string | null>(null);

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
      hasModal: true,
      content: {
        puntualidad: "¡Por favor ser puntuales!",
        adultos: "Evento solo para adultos",
        confirmación: "Confirmar asistencia antes del 10 de Octubre",
        clima: "Llevar abrigo para espacios exteriores",
      },
    },
    {
      id: "gifts",
      title: "Regalos",
      icon: "🎁",
      hasModal: true,
      content: {
        mensaje: "Tu presencia es nuestro mejor regalo",
        opción: "Lluvia de sobres disponible",
        banco: "Datos bancarios disponibles",
        paypal: "Opción PayPal habilitada",
      },
    },
    {
      id: "photos",
      title: "Fotos",
      icon: "📸",
      hasModal: true,
      content: {
        compartir: "Comparte tus fotos y videos",
        hashtag: weddingDetails.hashtag || "#JohannaYEnrique2025",
        qr: "Escanea el QR para subir",
        galería: "Galería disponible después del evento",
      },
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % sections.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sections.length]);

  const handleSectionClick = (section: (typeof sections)[0]) => {
    if (section.hasModal) {
      setShowModal(section.id);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header con decoración */}
      <div className={styles.header}>
        <FloralDecoration position="top-left" />
        <FloralDecoration position="top-right" />

        <AnimatedText
          text={`${weddingDetails.brideName} & ${weddingDetails.groomName}`}
          className="text-5xl font-script text-[#d4a574] mb-4"
          delay={0}
        />

        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px bg-[#d4a574]/30 w-20"></div>
          <HeartIcon className="text-[#d4a574]" size={24} animated />
          <div className="h-px bg-[#d4a574]/30 w-20"></div>
        </div>

        <AnimatedText
          text={weddingDetails.date}
          className="text-xl font-sans text-[#fdf6f0]/80"
          delay={200}
        />
      </div>

      {/* Navegación de secciones */}
      <div className={styles.navigation}>
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSection(index);
              handleSectionClick(section);
            }}
            className={`${styles.navButton} ${
              activeSection === index ? styles.active : ""
            }`}
          >
            <span className="text-2xl mb-1">{section.icon}</span>
            <span className="text-xs">{section.title}</span>
          </button>
        ))}
      </div>

      {/* Contenido de la sección activa */}
      <div className={styles.content}>
        <div className={styles.sectionCard}>
          <h2 className="text-3xl font-serif text-[#5a6b50] mb-6">
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

          {sections[activeSection].hasModal && (
            <button
              onClick={() => setShowModal(sections[activeSection].id)}
              className={styles.viewMoreButton}
            >
              Ver más detalles
            </button>
          )}
        </div>
      </div>

      {/* Timeline del día */}
      <div className={styles.timeline}>
        <h3 className="text-2xl font-serif text-[#5a6b50] mb-6 text-center">
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

      {/* Botones de acción */}
      <div className={styles.actions}>
        <button className={styles.confirmButton}>
          <HeartIcon size={20} className="mr-2" />
          Confirmar Asistencia
        </button>
        <button className={styles.mapButton}>📍 Ver Ubicación</button>
      </div>

      {/* Modales */}
      {showModal === "tips" && <TipsModal onClose={() => setShowModal(null)} />}
      {showModal === "gifts" && (
        <GiftsModal onClose={() => setShowModal(null)} />
      )}
      {showModal === "photos" && (
        <PhotosModal onClose={() => setShowModal(null)} />
      )}

      {/* Footer decorativo */}
      <div className={styles.footer}>
        <p>{weddingDetails.hashtag || "Con amor, Johanna & Enrique"}</p>
        <p className={styles.copyright}>
          © 2025 - Todos los derechos reservados
        </p>
        <FloralDecoration position="bottom-center" />
      </div>
    </div>
  );
};

// Modal de Tips y Notas
const TipsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>

      <div className={styles.modalHeader}>
        <span className="text-3xl mb-2">📋</span>
        <h2 className="text-2xl font-serif text-[#fdf6f0]">Tips y Notas</h2>
      </div>

      <div className={styles.modalBody}>
        <ul className={styles.tipsList}>
          <li>• ¡Por favor ser puntuales!</li>
          <li>
            • Queremos que disfrutes de esta fiesta al máximo, por eso decidimos
            que sea un evento sólo para adultos.
          </li>
          <li>
            • Confirmar asistencia a la brevedad, antes del 10 de Octubre!
          </li>
          <li>• Llevar abrigo para disfrutar de los espacios exteriores.</li>
          <li>• Olvidarse de todo y a disfrutar!!!</li>
        </ul>
      </div>
    </div>
  </div>
);

// Modal de Regalos
const GiftsModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>

      <div className={styles.modalHeader}>
        <span className="text-3xl mb-2">🎁</span>
        <h2 className="text-2xl font-serif text-[#fdf6f0]">Regalos</h2>
      </div>

      <div className={styles.modalBody}>
        <p className="mb-4 text-center">
          Para quienes deseen hacer un regalo en efectivo, contaremos con sobres
          disponibles para depositar en el cofre. También pueden contribuir
          mediante:
        </p>

        <div className={styles.giftOptions}>
          <div className={styles.giftOption}>
            <h4>• Depósito bancario:</h4>
            <p>Cuenta: XXXX XXXX XXXX XXXX</p>
          </div>

          <div className={styles.giftOption}>
            <h4>• PayPal:</h4>
            <p>Correo electrónico:</p>
            <p>correopaypal@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Modal de Fotos
const PhotosModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className={styles.modalOverlay} onClick={onClose}>
    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>

      <div className={styles.modalHeader}>
        <h2 className="text-2xl font-serif text-[#d4a574] mb-2">
          Comparte tus fotos y videos
        </h2>
        <p className="text-[#fdf6f0]/80 text-sm">
          No queremos perdernos ningún momento de este hermoso día
        </p>
      </div>

      <div className={styles.modalBody}>
        <div className={styles.qrContainer}>
          {/* QR Code Placeholder */}
          <div className={styles.qrCode}>
            <div className="w-48 h-48 bg-white rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs">QR Code</span>
            </div>
          </div>

          <button className={styles.uploadButton}>Subir fotos</button>
        </div>
      </div>
    </div>
  </div>
);

// Componente para items del timeline
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
