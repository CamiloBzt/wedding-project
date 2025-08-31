import Image from "next/image";
import { useState } from "react";

export const QRPhotoSection: React.FC<{
  driveUrl: string;
  hashtag: string;
}> = ({ driveUrl, hashtag }) => {
  const [qrGenerated, setQrGenerated] = useState(false);

  // Función para generar QR usando una API gratuita
  const generateQRUrl = (url: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      url
    )}`;
  };

  const handleQRLoad = () => {
    setQrGenerated(true);
  };

  return (
    <div className="mt-6 p-6 bg-wedding-cream/50 rounded-lg text-center">
      <h4 className="text-xl font-serif text-wedding-olive mb-4">
        📸 ¡Comparte tus fotos con nosotros!
      </h4>

      {/* Código QR */}
      <div className="mb-6">
        <div className="inline-block p-4 bg-white rounded-lg shadow-lg">
          <Image
            src={generateQRUrl(driveUrl)}
            alt="QR Code para subir fotos"
            className={`w-48 h-48 mx-auto transition-opacity duration-500 ${
              qrGenerated ? "opacity-100" : "opacity-50"
            }`}
            onLoad={handleQRLoad}
            width={100}
            height={100}
          />
        </div>
        <p className="text-sm text-wedding-olive/70 mt-2">
          Escanea con tu cámara del celular
        </p>
      </div>

      {/* Instrucciones */}
      <div className="space-y-4 text-left max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-wedding-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
            1
          </span>
          <p className="text-sm text-wedding-olive">
            Escanea el código QR con la cámara de tu celular
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-wedding-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
            2
          </span>
          <p className="text-sm text-wedding-olive">
            Se abrirá Google Drive automáticamente
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 w-6 h-6 bg-wedding-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
            3
          </span>
          <p className="text-sm text-wedding-olive">
            Toca el botón &quot;+&quot; y sube tus fotos/videos
          </p>
        </div>
      </div>

      {/* Alternativa con hashtag */}
      <div className="mt-6 p-4 bg-wedding-olive/10 rounded-lg">
        <h5 className="font-semibold text-wedding-olive mb-2">
          ¿Prefieres redes sociales?
        </h5>
        <p className="text-wedding-olive font-semibold text-lg mb-1">
          {hashtag}
        </p>
        <p className="text-sm text-wedding-olive/70">
          Usa este hashtag en Instagram, Facebook o Twitter
        </p>
      </div>

      {/* Botón para abrir directamente */}
      <button
        onClick={() => window.open(driveUrl, "_blank")}
        className="mt-4 px-6 py-2 bg-wedding-accent text-white rounded-lg hover:bg-wedding-accent/90 transition-colors duration-200"
      >
        📁 Abrir carpeta directamente
      </button>
    </div>
  );
};
