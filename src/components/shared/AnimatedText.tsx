"use client";

import React, { useEffect, useState } from "react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  animationType?: "fadeIn" | "slideUp" | "typewriter";
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  delay = 0,
  duration = 1000,
  animationType = "fadeIn",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);

      if (animationType === "typewriter") {
        let currentIndex = 0;
        const interval = setInterval(() => {
          if (currentIndex <= text.length) {
            setDisplayText(text.slice(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(interval);
          }
        }, duration / text.length);

        return () => clearInterval(interval);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, duration, animationType]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";

    switch (animationType) {
      case "slideUp":
        return "animate-slide-up";
      case "typewriter":
        return "";
      default:
        return "animate-fade-in";
    }
  };

  return (
    <div
      className={`${className} ${getAnimationClass()}`}
      style={{
        transition: `all ${duration}ms ease-out`,
        ...(isVisible && animationType !== "typewriter" ? { opacity: 1 } : {}),
      }}
    >
      {animationType === "typewriter" ? displayText : text}
    </div>
  );
};

export default AnimatedText;
