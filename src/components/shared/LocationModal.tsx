"use client";

import React from "react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  address,
}) => {
  if (!isOpen) return null;

  const encodedAddress = encodeURIComponent(address);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  const wazeUrl = `https://waze.com/ul?q=${encodedAddress}&navigate=yes`;
  const uberUrl =
    `https://m.uber.com/ul/?action=setPickup&dropoff[formatted_address]=${encodedAddress}`;

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      alert("Dirección copiada");
    } catch (err) {
      console.error("Error copying address", err);
    }
  };

  const buttonBase =
    "flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-transform hover:-translate-y-0.5";
  const gradientButton =
    `${buttonBase} bg-gradient-to-r from-wedding-olive-dark to-wedding-olive text-wedding-cream`;
  const copyButton =
    `${buttonBase} bg-wedding-gray-light text-wedding-gray-dark hover:bg-wedding-olive-light`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-wedding-gray-dark/60 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-wedding-gold/30 bg-wedding-cream shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-wedding-olive-dark hover:text-wedding-olive"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <iframe
          src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
          className="h-64 w-full border-0"
          loading="lazy"
          allowFullScreen
        ></iframe>
        <p className="px-6 pt-4 text-center font-medium text-wedding-olive-dark">
          {address}
        </p>
        <div className="grid grid-cols-2 gap-3 p-6">
          <a
            href={wazeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={gradientButton}
          >
            🚘 <span>Waze</span>
          </a>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={gradientButton}
          >
            🗺️ <span>Google Maps</span>
          </a>
          <a
            href={uberUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={gradientButton}
          >
            🚕 <span>Uber</span>
          </a>
          <button onClick={copyAddress} className={copyButton}>
            📋 <span>Copiar dirección</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

