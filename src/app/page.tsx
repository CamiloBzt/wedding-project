"use client";

import EnvelopeInvitation from "@/components/EnvelopeInvitation/EnvelopeInvitation";
import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import InvitationDetails from "@/components/InvitationDetails/InvitationDetails";
import { useInvitation } from "@/contexts/InvitationContext";
import { useLoadingState } from "@/hooks/useLoadingState";
import { useEffect, useState } from "react";

export default function Home() {
  const { isLoading } = useLoadingState(3000);
  const { envelopeState } = useInvitation();
  const [showInvitationDetails, setShowInvitationDetails] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (envelopeState.isOpen && !envelopeState.isAnimating) {
      // Iniciar fade out
      setFadeOut(true);
      setTimeout(() => {
        setShowInvitationDetails(true);
      }, 300);
    }
  }, [envelopeState]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (showInvitationDetails) {
    return <InvitationDetails />;
  }

  return (
    <div
      className={`transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <EnvelopeInvitation />
    </div>
  );
}
