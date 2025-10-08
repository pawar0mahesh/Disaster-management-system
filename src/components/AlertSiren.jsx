import React, { useRef, useState } from "react";
import { FaBell } from "react-icons/fa";

const AlertSiren = () => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  const toggleSiren = () => {
    if (!audioRef.current) return;

    audioRef.current.volume = 1; // max volume
    audioRef.current.loop = true;

    if (playing) {
      // STOP the siren
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setPlaying(false);
    } else {
      // PLAY the siren
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((err) => {
          console.error("Audio failed to play:", err);
          alert(
            "Browser blocked audio. Please click the siren to enable sound!"
          );
        });
    }
  };

  return (
    <div
      onClick={toggleSiren}
      style={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        backgroundColor: playing ? "rgba(255,0,0,0.15)" : "transparent",
        borderRadius: "8px",
        padding: "6px 10px",
        transition: "all 0.3s ease-in-out",
        width: "fit-content",
      }}
      title={playing ? "Stop Alert Siren" : "Play Alert Siren"}
    >
      <FaBell
        size={24}
        color={playing ? "red" : "white"}
        style={{
          filter: playing
            ? "drop-shadow(0 0 8px red)"
            : "drop-shadow(0 0 2px rgba(255,255,255,0.5))",
          animation: playing ? "pulse 1s infinite" : "none",
          transition: "all 0.3s ease-in-out",
        }}
      />
      <span
        style={{
          color: "white",
          marginLeft: "8px",
          fontWeight: "500",
          fontSize: "14px",
          userSelect: "none",
        }}
      >
        {playing ? "Siren ON" : "Siren"}
      </span>

      <audio ref={audioRef} src="/sounds/siren.mp3" loop preload="auto" />

      <style>
        {`
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default AlertSiren;
