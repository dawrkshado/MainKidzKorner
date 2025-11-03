import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";


import Back from "../components/Back";

import easycolorl1 from "../assets/Color/easycolorl1.png";
import easycolorl2 from "../assets/Color/easycolorl2.png";
import easycolorl3 from "../assets/Color/easycolorl3.png";
import tutorialVideo from "../assets/videos/ColordEasyTutorial.mp4";

import backgroundMusic from "../assets/Sounds/background.mp3";
import useSound from "use-sound";
import clickSfx from "../assets/Sounds/button_click_sound.mp3";

function ColorEasy() {
  const [showTutorial, setShowTutorial] = useState(true);
  const [playClick] = useSound(clickSfx, { volume: 0.5 });

  const handleVideoEnd = () => {
    setShowTutorial(false);
  };

  useEffect(() => {
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.2;

    const enableSound = () => {
      bgSound.play().catch((err) =>
        console.log("Autoplay blocked until user interaction:", err)
      );
      window.removeEventListener("click", enableSound);
    };

    window.addEventListener("click", enableSound);

    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
      window.removeEventListener("click", enableSound);
    };
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {showTutorial ? (
        
          <motion.div
            key="tutorial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center w-full h-full bg-black"
          >
            <div className="relative w-[80%]">
              <video
                src={tutorialVideo}
                autoPlay
                onEnded={handleVideoEnd}
                className="rounded-2xl shadow-lg w-full border-4 border-gray-200"
              />
              <button
                onClick={handleVideoEnd}
                className="absolute top-4 right-4 bg-white/80 text-black font-semibold px-4 py-1 rounded-lg shadow hover:bg-white transition"
              >
                Skip
              </button>
            </div>
          </motion.div>
        ) : (
         
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <div className="hidden md:inline absolute w-full h-auto">
              <Back />
              <img
                src="/Bg/Color/easycolor.webp"
                alt="Easy game background"
                className="w-full"
              />

              <Link to="/color/easy/level1" onClick={playClick}>
                <img
                  src={easycolorl1}
                  alt="Button for Level 1 Color"
                  className="absolute left-[30%] top-[30%] w-auto cursor-pointer h-auto"
                />
              </Link>

              <Link to="/color/easy/level2" onClick={playClick}>
                <img
                  src={easycolorl2}
                  alt="Button for Level 2 Color"
                  className="absolute left-[50%] top-[50%] w-auto cursor-pointer h-auto"
                />
              </Link>

              <Link to="/color/easy/level3" onClick={playClick}>
                <img
                  src={easycolorl3}
                  alt="Button for Level 3 Color"
                  className="absolute left-[70%] top-[30%] w-auto cursor-pointer h-auto"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ColorEasy;
