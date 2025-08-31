"use client";

import React from "react";

interface FloralDecorationProps {
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  size?: "small" | "medium" | "large";
  color?: string;
  opacity?: number;
}

const FloralDecoration: React.FC<FloralDecorationProps> = ({
  position = "top-left",
  size = "medium",
  color = "#4b5d73",
  opacity = 0.3,
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-16 h-16";
      case "large":
        return "w-32 h-32";
      default:
        return "w-24 h-24";
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case "top-right":
        return "absolute top-4 right-4";
      case "bottom-left":
        return "absolute bottom-4 left-4";
      case "bottom-right":
        return "absolute bottom-4 right-4";
      case "bottom-center":
        return "absolute bottom-4 left-1/2 transform -translate-x-1/2";
      default:
        return "absolute top-4 left-4";
    }
  };

  return (
    <div
      className={`${getPositionClasses()} ${getSizeClasses()} pointer-events-none`}
      style={{ opacity }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <g className="animate-pulse">
          <circle cx="50" cy="50" r="8" fill={color} opacity="0.6" />

          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <ellipse
              key={i}
              cx="50"
              cy="35"
              rx="6"
              ry="12"
              fill={color}
              opacity="0.4"
              transform={`rotate(${angle} 50 50)`}
            />
          ))}
        </g>

        <path
          d="M30 60 Q20 55, 25 45 T35 40"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />
        <path
          d="M70 60 Q80 55, 75 45 T65 40"
          stroke={color}
          strokeWidth="2"
          fill="none"
          opacity="0.5"
        />

        {[
          [20, 30],
          [80, 30],
          [15, 70],
          [85, 70],
          [35, 20],
          [65, 20],
          [30, 80],
          [70, 80],
        ].map(([x, y], i) => (
          <circle
            key={`dot-${i}`}
            cx={x}
            cy={y}
            r="2"
            fill={color}
            opacity="0.3"
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </svg>
    </div>
  );
};

export default FloralDecoration;
