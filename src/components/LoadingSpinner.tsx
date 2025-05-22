import React from "react";

const LoadingSpinner: React.FC<{ message?: string }> = ({
  message = "Loading park details...",
}) => {
  const bars = Array.from({ length: 4 });

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[200px] text-[rgb(var(--copy-secondary))]"
      style={{ fontSmooth: "always" }}
    >
      {/* Animated bars */}
      <div className="flex space-x-2 mb-6 h-5">
        {bars.map((_, i) => (
          <span
            key={i}
            style={{
              width: "6px",
              height: "100%",
              borderRadius: "9999px",
              backgroundColor: "rgb(var(--cta))",
              animation: "bounce 1s ease-in-out infinite",
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      {/* Animated message */}
      <div
        className="text-sm font-mono tracking-wider flex flex-wrap justify-center"
        style={{ lineHeight: "1.75" }}
      >
        {message.split("").map((char, idx) => (
          <span
            key={idx}
            style={{
              display: "inline-block",
              opacity: 0,
              animation: "fadeInUp 0.5s forwards",
              animationDelay: `${idx * 0.03}s`,
              marginRight: char === " " ? "0.4ch" : "0.05ch",
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* Keyframe styles */}
      <style>
        {`
          @keyframes bounce {
            0%, 100% { transform: scaleY(0.6); opacity: 0.6; }
            50% { transform: scaleY(1.4); opacity: 1; }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(0.5em); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
