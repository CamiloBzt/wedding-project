"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Tipos
export interface WeddingDetails {
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  hashtag?: string;
}

export interface EnvelopeState {
  isOpen: boolean;
  isAnimating: boolean;
}

export interface GuestInfo {
  name: string;
  tableNumber?: number;
  confirmedAssistance?: boolean;
  numberOfGuests?: number;
}

interface InvitationContextType {
  weddingDetails: WeddingDetails;
  envelopeState: EnvelopeState;
  guestInfo: GuestInfo | null;
  setEnvelopeOpen: (isOpen: boolean) => void;
  setGuestInfo: (info: GuestInfo) => void;
  updateConfirmation: (confirmed: boolean, guests: number) => void;
}

// Datos de la boda
const WEDDING_INFO: WeddingDetails = {
  groomName: "Enrique",
  brideName: "Johanna",
  date: "25 de Octubre, 2025",
  time: "5:00 PM",
  venue: "Jardín Los Robles",
  address: "Calle Principal #123, Bogotá",
  hashtag: "#JohannaYEnrique2025",
};

// Crear el contexto
const InvitationContext = createContext<InvitationContextType | undefined>(
  undefined
);

// Provider del contexto
export function InvitationProvider({ children }: { children: ReactNode }) {
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>({
    isOpen: false,
    isAnimating: false,
  });

  const [guestInfo, setGuestInfo] = useState<GuestInfo | null>(null);

  const setEnvelopeOpen = (isOpen: boolean) => {
    setEnvelopeState({
      isOpen,
      isAnimating: true,
    });

    // Resetear animación después de completarse
    setTimeout(() => {
      setEnvelopeState((prev) => ({ ...prev, isAnimating: false }));
    }, 1500);
  };

  const updateConfirmation = (confirmed: boolean, guests: number) => {
    setGuestInfo((prev) => ({
      ...prev!,
      confirmedAssistance: confirmed,
      numberOfGuests: guests,
    }));
  };

  return (
    <InvitationContext.Provider
      value={{
        weddingDetails: WEDDING_INFO,
        envelopeState,
        guestInfo,
        setEnvelopeOpen,
        setGuestInfo,
        updateConfirmation,
      }}
    >
      {children}
    </InvitationContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export const useInvitation = () => {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error(
      "useInvitation debe ser usado dentro de InvitationProvider"
    );
  }
  return context;
};

// Hook para obtener solo los detalles de la boda
export const useWeddingDetails = () => {
  const { weddingDetails } = useInvitation();
  return weddingDetails;
};

// Hook para manejar el estado del sobre
export const useEnvelope = () => {
  const { envelopeState, setEnvelopeOpen } = useInvitation();
  return { ...envelopeState, setOpen: setEnvelopeOpen };
};

// Hook para manejar información del invitado
export const useGuest = () => {
  const { guestInfo, setGuestInfo, updateConfirmation } = useInvitation();
  return { guestInfo, setGuestInfo, updateConfirmation };
};
