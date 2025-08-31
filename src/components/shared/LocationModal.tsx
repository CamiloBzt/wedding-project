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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-lg w-full max-w-xl shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          aria-label="Cerrar"
        >
          ✕
        </button>
        <div className="p-4">
          <iframe
            src={`https://www.google.com/maps?q=${encodedAddress}&output=embed`}
            width="100%"
            height="300"
            loading="lazy"
            allowFullScreen
            style={{ border: 0 }}
          ></iframe>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-blue-600 text-white text-center text-sm"
            >
              Abrir en Waze
            </a>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-green-600 text-white text-center text-sm"
            >
              Google Maps
            </a>
            <a
              href={uberUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded bg-black text-white text-center text-sm"
            >
              Uber
            </a>
            <button
              onClick={copyAddress}
              className="px-4 py-2 rounded bg-gray-200 text-sm"
            >
              Copiar dirección
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;

