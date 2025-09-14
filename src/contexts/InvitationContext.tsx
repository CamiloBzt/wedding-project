"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

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

const WEDDING_INFO: WeddingDetails = {
  groomName: "Enrique",
  brideName: "Johanna",
  date: "25 de Octubre, 2025",
  time: "3:00 PM",
  venue: "Casa Quinta Serendipia",
  address: "Carrera 90 # 152A - 25, Bogotá",
  hashtag: "#JohannaYEnrique2025",
};

const InvitationContext = createContext<InvitationContextType | undefined>(
  undefined
);

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

export const useInvitation = () => {
  const context = useContext(InvitationContext);
  if (!context) {
    throw new Error(
      "useInvitation debe ser usado dentro de InvitationProvider"
    );
  }
  return context;
};

export const useWeddingDetails = () => {
  const { weddingDetails } = useInvitation();
  return weddingDetails;
};

export const useEnvelope = () => {
  const { envelopeState, setEnvelopeOpen } = useInvitation();
  return { ...envelopeState, setOpen: setEnvelopeOpen };
};

export const useGuest = () => {
  const { guestInfo, setGuestInfo, updateConfirmation } = useInvitation();
  return { guestInfo, setGuestInfo, updateConfirmation };
};
