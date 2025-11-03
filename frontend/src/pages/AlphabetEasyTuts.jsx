import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AlphabetEasyTutorial from "../assets/videos/AlphabetEasyTutorial.mp4"; // ensure path is correct

function AlphabetEasyTuts() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = () => {
      navigate("/alphabeteasy", { replace: true }); // 👈 prevent going back
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, [navigate]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      {/* Skip Button */}
      <button
        onClick={() => navigate("/alphabeteasy", { replace: true })} // 👈 same here
        className="absolute top-6 right-6 z-10 bg-white hover:bg-white/80 text-black font-semibold px-6 py-2 rounded-xl shadow-lg transition-all duration-200"
      >
        Skip
      </button>

      {/* Video */}
      <video
        ref={videoRef}
        src={AlphabetEasyTutorial}
        className="w-full h-full object-cover"
        autoPlay
        controls={false}
      />
    </div>
  );
}

export default AlphabetEasyTuts;
