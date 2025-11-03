import React, { useState, useEffect } from "react";
import Back from "../components/Back";
import avebutton1 from "../assets/Color/avebutton1.png";
import avebutton2 from "../assets/Color/avebutton2.png";
import tutorialVideo from "../assets/videos/ColorsMediumTutorial.mp4";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import backgroundMusic from "../assets/Sounds/background.mp3";
import useSound from "use-sound";
import clickSfx from "../assets/Sounds/button_click.mp3";

function ColorMedium() {
  const [showTutorial, setShowTutorial] = useState(true);
  const handleVideoEnd = () => {
    setShowTutorial(false);
  };

  // 🎵 Sound setup
  const [playClick] = useSound(clickSfx, { volume: 0.5 });

  useEffect(() => {
    const bgSound = new Audio(backgroundMusic);
    bgSound.loop = true;
    bgSound.volume = 0.2;

    bgSound.play().catch((err) => {
      console.log("Autoplay blocked. User must interact to enable sound.", err);
    });

    return () => {
      bgSound.pause();
      bgSound.currentTime = 0;
    };
  }, []);

  return (
    <div className="relative w-full h-screen bg-green-100 overflow-hidden">
      <AnimatePresence mode="wait">
        {showTutorial ? (
          // 🎬 Tutorial video first
          <motion.div
            key="tutorial"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center items-center w-full h-full"
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
          // 🎨 Medium Color Menu
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full"
          >
            <div className="hidden w-full md:inline md:absolute h-auto">
              <Back />
              <img
                src="/Bg/Color/averagecolorbg.webp"
                alt="Medium game background"
                className="w-full"
              />

              <Link to="/color/medium/level1" onClick={playClick}>
                <img
                  src={avebutton1}
                  alt="Button for Level 1 Color"
                  className="absolute left-[40%] top-[30%] w-auto cursor-pointer h-auto"
                />
              </Link>

              <Link to="/color/medium/level2" onClick={playClick}>
                <img
                  src={avebutton2}
                  alt="Button for Level 2 Color"
                  className="absolute left-[60%] top-[50%] w-auto cursor-pointer h-auto"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ColorMedium;
