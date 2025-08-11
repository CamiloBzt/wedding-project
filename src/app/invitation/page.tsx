"use client";

import React from "react";
import InvitationDetails from "@/components/InvitationDetails/InvitationDetails";
import { useInvitation } from "@/contexts/InvitationContext";
import { useRouter } from "next/navigation";
import AnimatedText from "@/components/shared/AnimatedText";
import HeartIcon from "@/components/shared/HeartIcon";

export default function InvitationPage() {
  const { weddingDetails } = useInvitation();
  const router = useRouter();

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-wedding-olive to-wedding-olive/90">
      {/* Header con botón de regreso */}
      <header className="sticky top-0 z-40 bg-wedding-olive/95 backdrop-blur-sm border-b border-wedding-gold/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-wedding-cream hover:text-wedding-gold transition-colors cursor-pointer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              <span className="font-sans text-sm">Volver</span>
            </button>

            <div className="flex items-center gap-2">
              <HeartIcon size={20} className="text-wedding-gold" animated />
              <span className="font-script text-wedding-gold text-xl">
                {weddingDetails.hashtag}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <InvitationDetails />

      {/* Footer */}
      <footer className="bg-wedding-olive/95 border-t border-wedding-gold/20 py-8 mt-12">
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
    </div>
  );
}
